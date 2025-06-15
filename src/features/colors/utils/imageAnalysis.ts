
import { ColorPaletteData } from '../types/color.types';

// Complete Image Color Analysis Function
// Takes an image source and returns a 9-color palette (3 light, 3 mid, 3 dark)
export async function extractPaletteFromImage(imageSrc: string, numColorsToExtract = 9): Promise<ColorPaletteData> {
  // --- Core Color Conversion Functions ---
  function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  function rgbToLab({ r, g, b }: { r: number; g: number; b: number }) {
    let red = r / 255,
      green = g / 255,
      blue = b / 255;
    red = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
    green = green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92;
    blue = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;

    let x = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
    let y = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 1.0;
    let z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    return { l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
  }

  function labToRgb({ l, a, b }: { l: number; a: number; b: number }) {
    let y = (l + 16) / 116;
    let x = a / 500 + y;
    let z = y - b / 200;

    x = Math.pow(x, 3) > 0.008856 ? Math.pow(x, 3) : (x - 16 / 116) / 7.787;
    y = Math.pow(y, 3) > 0.008856 ? Math.pow(y, 3) : (y - 16 / 116) / 7.787;
    z = Math.pow(z, 3) > 0.008856 ? Math.pow(z, 3) : (z - 16 / 116) / 7.787;

    x = x * 0.95047;
    y = y * 1.0;
    z = z * 1.08883;

    let red = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let green = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let blue = x * 0.0557 + y * -0.204 + z * 1.057;

    red = red > 0.0031308 ? 1.055 * Math.pow(red, 1 / 2.4) - 0.055 : 12.92 * red;
    green = green > 0.0031308 ? 1.055 * Math.pow(green, 1 / 2.4) - 0.055 : 12.92 * green;
    blue = blue > 0.0031308 ? 1.055 * Math.pow(blue, 1 / 2.4) - 0.055 : 12.92 * blue;

    return {
      r: Math.max(0, Math.min(255, Math.round(red * 255))),
      g: Math.max(0, Math.min(255, Math.round(green * 255))),
      b: Math.max(0, Math.min(255, Math.round(blue * 255))),
    };
  }

  // --- K-Means Clustering Implementation ---
  function getDistance(p1: { l: number; a: number; b: number }, p2: { l: number; a: number; b: number }) {
    return Math.sqrt(Math.pow(p1.l - p2.l, 2) + Math.pow(p1.a - p2.a, 2) + Math.pow(p1.b - p2.b, 2));
  }

  function getRandomCentroids(points: { l: number; a: number; b: number }[], k: number) {
    const uniquePoints = Array.from(new Set(points.map((p) => JSON.stringify(p)))).map((s) => JSON.parse(s));
    const numUnique = uniquePoints.length;

    if (numUnique === 0 && k > 0) {
      console.warn("No unique points found in image. Returning default grey centroids.");
      return Array(k).fill(null).map((_, index) => ({ l: (index * 80) / (k - 1) + 10, a: 0, b: 0 }));
    }
    if (numUnique === 0 && k === 0) {
      return [];
    }

    let centroidsToReturn = [];
    if (numUnique < k) {
      centroidsToReturn = [...uniquePoints];
      for (let i = 0; i < k - numUnique; i++) {
        centroidsToReturn.push(uniquePoints[i % numUnique]);
      }
      // Add randomness by shuffling multiple times
      for (let i = 0; i < 3; i++) {
        centroidsToReturn.sort(() => 0.5 - Math.random());
      }
    } else {
      // Add randomness by shuffling and taking different slices
      for (let i = 0; i < 5; i++) {
        uniquePoints.sort(() => 0.5 - Math.random());
      }
      centroidsToReturn = uniquePoints.slice(0, k);
    }
    return centroidsToReturn;
  }

  function kMeans(points: { l: number; a: number; b: number }[], k: number, maxIterations = 10) {
    if (k === 0) return [];
    let centroids = getRandomCentroids(points, k);
    if (centroids.length === 0 && k > 0) {
      centroids = Array(k).fill(null).map((_, index) => ({ l: (index * 80) / (k - 1) + 10, a: 0, b: 0 }));
    }
    if (centroids.length < k) {
      const defaultsToPad = Array(k - centroids.length).fill(null).map((_, index) => ({ l: 50 + index, a: 0, b: 0 }));
      centroids = [...centroids, ...defaultsToPad];
    }

    let clusters = [];

    for (let i = 0; i < maxIterations; i++) {
      clusters = Array.from({ length: k }, () => []);

      for (const point of points) {
        let nearestCentroidIndex = 0;
        let minDistance = Number.POSITIVE_INFINITY;
        for (let j = 0; j < k; j++) {
          const distance = getDistance(point, centroids[j]);
          if (distance < minDistance) {
            minDistance = distance;
            nearestCentroidIndex = j;
          }
        }
        if (nearestCentroidIndex >= 0 && nearestCentroidIndex < k) {
          clusters[nearestCentroidIndex].push(point);
        }
      }

      const newCentroids = clusters.map((cluster, idx) => {
        if (cluster.length === 0) {
          return centroids[idx];
        }
        const sum = cluster.reduce((acc, p) => ({ l: acc.l + p.l, a: acc.a + p.a, b: acc.b + p.b }), { l: 0, a: 0, b: 0 });
        return { l: sum.l / cluster.length, a: sum.a / cluster.length, b: sum.b / cluster.length };
      });

      let centroidDiff = 0;
      for (let cIdx = 0; cIdx < k; cIdx++) {
        if (centroids[cIdx] && newCentroids[cIdx]) {
          centroidDiff += getDistance(centroids[cIdx], newCentroids[cIdx]);
        }
      }

      if (centroidDiff < 0.001) break;
      centroids = newCentroids;
    }

    return centroids;
  }

  // --- Palette Refinement ---
  function refinePalette(palette: any[]) {
    return palette.map((color) => {
      let { l, a, b } = color.lab;
      l = Math.max(10, Math.min(90, l));
      a *= 0.85;
      b *= 0.85;
      const refinedLab = { l, a, b };
      const refinedRgb = labToRgb(refinedLab);
      return {
        ...refinedRgb,
        hex: rgbToHex(refinedRgb),
        lab: refinedLab,
      };
    });
  }

  // --- Main Image Processing ---
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return reject(new Error("Canvas context not available"));

      const MAX_WIDTH = 100;
      const scale = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const pixels = [];
      
      // Add randomness to pixel sampling
      const skipFactor = Math.floor(Math.random() * 3) + 1; // Skip 1-3 pixels randomly
      for (let i = 0; i < imageData.length; i += 4 * skipFactor) {
        if (imageData[i + 3] > 0) {
          pixels.push({ r: imageData[i], g: imageData[i + 1], b: imageData[i + 2] });
        }
      }

      if (pixels.length === 0) {
        console.warn("No processable pixels found in image.");
        const defaultPalette = Array(numColorsToExtract).fill(null).map(() => ({ r: 128, g: 128, b: 128, hex: "#808080", lab: { l: 53, a: 0, b: 0 } }));
        const result: ColorPaletteData = {
          "light-1": defaultPalette[0]?.hex || "#808080",
          "light-2": defaultPalette[1]?.hex || "#808080",
          "light-3": defaultPalette[2]?.hex || "#808080",
          "mid-1": defaultPalette[3]?.hex || "#808080",
          "mid-2": defaultPalette[4]?.hex || "#808080",
          "mid-3": defaultPalette[5]?.hex || "#808080",
          "dark-1": defaultPalette[6]?.hex || "#808080",
          "dark-2": defaultPalette[7]?.hex || "#808080",
          "dark-3": defaultPalette[8]?.hex || "#808080"
        };
        return resolve(result);
      }

      const labPixels = pixels.map(rgbToLab);
      
      // Add randomness to k-means by varying max iterations
      const randomMaxIterations = Math.floor(Math.random() * 5) + 8; // 8-12 iterations
      const centroids = kMeans(labPixels, numColorsToExtract, randomMaxIterations);

      const initialPalette = centroids.map((lab) => {
        const rgb = labToRgb(lab);
        return { ...rgb, hex: rgbToHex(rgb), lab };
      });

      const refined = refinePalette(initialPalette);
      
      // Add randomness to sorting
      const shouldRandomizeSort = Math.random() > 0.5;
      if (shouldRandomizeSort) {
        refined.sort((a, b) => a.lab.l - b.lab.l); // Light to dark
      } else {
        refined.sort((a, b) => b.lab.l - a.lab.l); // Dark to light
      }

      const numPerCategory = Math.max(1, Math.floor(numColorsToExtract / 3));

      let light = refined.slice(0, numPerCategory).sort((a, b) => a.lab.b - b.lab.b);
      let mid = refined.slice(numPerCategory, numPerCategory * 2).sort((a, b) => a.lab.b - b.lab.b);
      
      const darkCandidates = refined.slice(numPerCategory * 2);
      const minDarkness = 45;
      const trulyDark = refined.filter(color => color.lab.l <= minDarkness);
      
      let dark;
      if (trulyDark.length >= numPerCategory) {
        dark = trulyDark.sort((a, b) => a.lab.l - b.lab.l).slice(0, numPerCategory).sort((a, b) => a.lab.b - b.lab.b);
      } else {
        dark = darkCandidates.sort((a, b) => a.lab.b - b.lab.b);
      }
      
      // Add slight randomness to darkness adjustment
      const targetDarkness = 35 + (Math.random() * 10 - 5); // 30-40 range
      dark = dark.map(color => {
        if (color.lab.l > targetDarkness) {
          const adjustedLab = { ...color.lab, l: targetDarkness };
          const adjustedRgb = labToRgb(adjustedLab);
          return { ...color, lab: adjustedLab, hex: rgbToHex(adjustedRgb) };
        }
        return color;
      });

      // Convert to the expected ColorPaletteData format
      const result: ColorPaletteData = {
        "light-1": light[0]?.hex || "#E0C9A0",
        "light-2": light[1]?.hex || "#BABAAC",
        "light-3": light[2]?.hex || "#9DACA7",
        "mid-1": mid[0]?.hex || "#3F8DA4",
        "mid-2": mid[1]?.hex || "#6D7673",
        "mid-3": mid[2]?.hex || "#BDA06E",
        "dark-1": dark[0]?.hex || "#005A78",
        "dark-2": dark[1]?.hex || "#335763",
        "dark-3": dark[2]?.hex || "#233E49"
      };

      resolve(result);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}
