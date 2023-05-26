import { globbyStream } from 'globby';
import { compareDesc } from 'date-fns';
import { parseISO } from 'date-fns';
import exifr from 'exifr';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const uuid = () => crypto.randomBytes(16).toString('hex');

const parseImage = (path) =>
  exifr
    .parse(path, {
      mergeOutput: false,
      chunked: false,
      ifd0: false,
      iptc: true,
      exif: { pick: ['DateTimeOriginal'] },
    })
    .then((info) => {
      return {
        id: uuid(),
        title: `${info.iptc.Headline || ''}`,
        dateCreated: `${new Date(info.exif.DateTimeOriginal).toISOString()}`,
        keywords: info.iptc.Keywords,
      };
    });

const createIndexFile = async (folder) => {
  let data = [];
  const options = {
    expandDirectories: {
      extensions: ['jpg'],
    },
  };

  for await (const filePath of globbyStream(`images/${folder}`, options)) {
    let info = await parseImage(filePath);
    const fileExt = path.extname(filePath);

    info = {
      ...info,
      sources: {
        jpg: {
          src: `/images/${folder}/${path.basename(filePath, fileExt)}.jpg`,
          thumb: `/images/${folder}/${path.basename(
            filePath,
            fileExt
          )}_thumb.jpg`,
        },
        avif: {
          src: `/images/${folder}/${path.basename(filePath, fileExt)}.avif`,
          thumb: `/images/${folder}/${path.basename(
            filePath,
            fileExt
          )}_thumb.avif`,
        },
      },
    };
    data.push(info);
  }
  data = data.sort((a, b) =>
    compareDesc(parseISO(a.dateCreated), parseISO(b.dateCreated))
  );

  if (!fs.existsSync(`images-out/${folder}`)) {
    fs.mkdirSync(`images-out/${folder}`);
  }
  fs.writeFileSync(`images-out/${folder}/index.json`, JSON.stringify(data));
  console.log('done.');
};

(() => {
  createIndexFile('white-blur');
  createIndexFile('portrait');
})();
