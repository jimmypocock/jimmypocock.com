# Rae's Photo Mosaic Images

Place your webp images in this directory with the naming convention:
- rae-1.webp
- rae-2.webp
- rae-3.webp
- ... and so on

## Image Requirements

### Format
- Use `.webp` format for best performance
- You can convert images using tools like:
  - Online: https://cloudconvert.com/jpg-to-webp
  - Command line: `cwebp input.jpg -o output.webp -q 80`
  - Batch convert: `for f in *.jpg; do cwebp "$f" -o "${f%.jpg}.webp" -q 80; done`

### Size Recommendations
- No need to crop! The mosaic will handle that automatically
- Recommended resolution: 1200-2000px on the longest side
- File size: Aim for 100-300KB per image after webp conversion

### Quantity
- Minimum: 20-30 images for basic variety
- Recommended: 50-100 images for a rich mosaic
- The code currently expects images numbered from 1-20, update line 59 in `/app/rae/page.tsx` to match your actual count

## How the Automatic Cropping Works
The mosaic uses `background-size: cover` and `background-position: center` which means:
- Images are scaled to cover the entire container
- The center of the image is always visible
- Edges are cropped as needed to fit the aspect ratio
- No distortion - images maintain their original aspect ratio

This means you can use any photo regardless of its original dimensions!