#for image in images/color-gel/*.jpg ; do convert "$image" "${image%.*}.avif" ; done
magick --version

for image in images/color-gel/*.jpg
do
 convert $image \
 -sampling-factor 4:2:0 \
 -strip \
 -quality 80 \
 -interlace JPEG \
 -colorspace sRGB \
 "images-out/color-gel/$(basename "$image")"

 convert "images-out/color-gel/$(basename "$image")" \
 -resize 500x700\> \
 -gaussian-blur 0.05 \
 "images-out/color-gel/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.jpg

 convert $image \
 -define heic:speed=2 \
 "images-out/color-gel/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif

convert "images-out/color-gel/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif \
 -resize 500x700\> \
 "images-out/color-gel/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.avif
done

for image in images/nudes/*.jpg
do
 convert $image \
 -sampling-factor 4:2:0 \
 -strip \
 -quality 80 \
 -interlace JPEG \
 -colorspace sRGB \
 "images-out/nudes/$(basename "$image")"

 convert "images-out/nudes/$(basename "$image")" \
 -resize 500x700\> \
 -gaussian-blur 0.05 \
 "images-out/nudes/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.jog

 convert $image \
 -define heic:speed=2 \
 "images-out/nudes/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif

 convert "images-out/nudes/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif \
 -resize 500x700\> \
 "images-out/nudes/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.avif
done

for image in images/portraits/*.jpg
do
 convert $image \
 -sampling-factor 4:2:0 \
 -strip \
 -quality 80 \
 -interlace JPEG \
 -colorspace sRGB \
 "images-out/portraits/$(basename "$image")"

 convert "images-out/portraits/$(basename "$image")" \
 -resize 500x700\> \
 -gaussian-blur 0.05 \
 "images-out/portraits/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.jpg

 convert $image \
 -define heic:speed=2 \
 "images-out/portraits/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif

 convert "images-out/portraits/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif \
 -resize 500x700\> \
 "images-out/portraits/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.avif
done

for image in images/white-blur/*.jpg
do
 convert $image \
 -sampling-factor 4:2:0 \
 -strip \
 -quality 80 \
 -interlace JPEG \
 -colorspace sRGB \
 "images-out/white-blur/$(basename "$image")"

 convert "images-out/white-blur/$(basename "$image")" \
 -resize 500x700\> \
 -gaussian-blur 0.05 \
 "images-out/white-blur/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.jpg

 convert $image \
 -define heic:speed=2 \
 "images-out/white-blur/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif

 convert "images-out/white-blur/$(basename "$image" | sed 's/\(.*\)\..*/\1/')".avif \
 -resize 500x700\> \
 "images-out/white-blur/$(basename "$image" | sed 's/\(.*\)\..*/\1/')"_thumb.avif
done