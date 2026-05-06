import * as THREE from "three";

/**
 * Convert a grayscale heightmap canvas to a normal map using a Sobel operator.
 * Returns a CanvasTexture with RepeatWrapping applied.
 */
function heightmapToNormal(
  heightCanvas: HTMLCanvasElement,
  strength: number,
  repeatX: number,
  repeatY: number
): THREE.CanvasTexture {
  const w = heightCanvas.width;
  const h = heightCanvas.height;
  const srcCtx = heightCanvas.getContext("2d")!;
  const srcData = srcCtx.getImageData(0, 0, w, h).data;

  const outCanvas = document.createElement("canvas");
  outCanvas.width = w;
  outCanvas.height = h;
  const outCtx = outCanvas.getContext("2d")!;
  const outImg = outCtx.createImageData(w, h);
  const out = outImg.data;

  // Helper: get luminance at (x, y) with wrapping
  const lum = (x: number, y: number) => {
    const px = ((x % w) + w) % w;
    const py = ((y % h) + h) % h;
    const i = (py * w + px) * 4;
    return srcData[i] / 255;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Sobel kernels
      const tl = lum(x - 1, y - 1);
      const t = lum(x, y - 1);
      const tr = lum(x + 1, y - 1);
      const l = lum(x - 1, y);
      const r = lum(x + 1, y);
      const bl = lum(x - 1, y + 1);
      const b = lum(x, y + 1);
      const br = lum(x + 1, y + 1);

      const dX = (tr + 2 * r + br) - (tl + 2 * l + bl);
      const dY = (bl + 2 * b + br) - (tl + 2 * t + tr);

      // Normal vector (tangent space)
      const nx = -dX * strength;
      const ny = -dY * strength;
      const nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      const i = (y * w + x) * 4;
      out[i] = ((nx / len) * 0.5 + 0.5) * 255;     // R
      out[i + 1] = ((ny / len) * 0.5 + 0.5) * 255; // G
      out[i + 2] = ((nz / len) * 0.5 + 0.5) * 255; // B
      out[i + 3] = 255;                              // A
    }
  }

  outCtx.putImageData(outImg, 0, 0);
  const tex = new THREE.CanvasTexture(outCanvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  return tex;
}

/** Wood grain normals — plank groove height variation */
export function createWoodNormalMap(
  repeatX: number,
  repeatY: number
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Mid gray base
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Plank grooves as dark horizontal lines
  for (let i = 0; i < 50; i++) {
    const y = Math.random() * size;
    const yJitter = (Math.random() - 0.5) * 3;
    ctx.strokeStyle = `rgba(0,0,0,${0.1 + Math.random() * 0.25})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < size; x += 20) {
      ctx.lineTo(x, y + (Math.random() - 0.5) * yJitter * 2);
    }
    ctx.lineTo(size, y + yJitter);
    ctx.stroke();
  }

  return heightmapToNormal(canvas, 1.5, repeatX, repeatY);
}

/** Fabric weave normals — crosshatch height variation */
export function createFabricNormalMap(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Mid gray base
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Crosshatch — alternating raised/lowered threads
  for (let i = 0; i < size; i += 4) {
    const shade = i % 8 === 0 ? "#999999" : "#666666";
    ctx.strokeStyle = shade;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  return heightmapToNormal(canvas, 2.0, 2, 2);
}

/** Turf blade normals — grass blade height variation */
export function createTurfNormalMap(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Mid gray base
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Random grass blade bumps
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const brightness = 128 + Math.floor((Math.random() - 0.5) * 80);
    ctx.strokeStyle = `rgb(${brightness},${brightness},${brightness})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 2, y - 3 - Math.random() * 5);
    ctx.stroke();
  }

  return heightmapToNormal(canvas, 3.0, 4, 6);
}

/** Wall stipple normals — very subtle noise bumps */
export function createWallNormalMap(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const v = 128 + Math.floor((Math.random() - 0.5) * 30);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  return heightmapToNormal(canvas, 0.5, 2, 2);
}
