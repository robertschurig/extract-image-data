import { globbyStream } from 'globby';
import { compareDesc } from 'date-fns';
import { parseISO } from 'date-fns';
import exifr from 'exifr';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const uuid = () => crypto.randomBytes(16).toString('hex');

function parseImage(path) {
  return exifr.parse(path, {
    mergeOutput: false,
    chunked: false,
    ifd0: false,
    iptc: true,
    exif: { pick: ['DateTimeOriginal'] },
  });
}

async function createIndexFile(folder) {
  let data = [];
  const options = {
    expandDirectories: {
      extensions: ['jpg'],
    },
  };

  for await (const filePath of globbyStream(`images/${folder}`, options)) {
    const imageInfo = await parseImage(filePath);
    const imageBasePath = `/images/${folder}/${path.basename(
      filePath,
      path.extname(filePath)
    )}`;

    data.push({
      id: uuid(),
      title: imageInfo.iptc.Headline || '',
      created: new Date(imageInfo.exif.DateTimeOriginal).toISOString(),
      keywords: imageInfo.iptc.Keywords,
      source: {
        jpg: `${imageBasePath}.jpg`,
        avif: `${imageBasePath}.avif`,
      },
      thumbnail: {
        jpg: `${imageBasePath}_thumb.jpg`,
        avif: `${imageBasePath}_thumb.avif`,
      },
    });
  }

  data = data.sort((a, b) =>
    compareDesc(parseISO(a.created), parseISO(b.created))
  );

  if (!fs.existsSync(`images-out/${folder}`)) {
    fs.mkdirSync(`images-out/${folder}`);
  }
  fs.writeFileSync(`images-out/${folder}/index.json`, JSON.stringify(data));
  console.log('done.');
}

function main() {
  const folders = ['color-gel', 'nudes', 'portraits', 'white-blur'];

  folders.forEach((folder) => {
    createIndexFile(folder);
  });
}

main();
