import * as THREE from "three";

/** Oak wood grain — horizontal lines with subtle Y-jitter */
export function createWoodTexture(repeatX: number, repeatY: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base oak color
  ctx.fillStyle = "#c4a882";
  ctx.fillRect(0, 0, size, size);

  // Wood grain lines
  const browns = ["#b89b72", "#a68a60", "#c9b08e", "#9e7f55", "#d4bc9a"];
  for (let i = 0; i < 50; i++) {
    const y = Math.random() * size;
    const yJitter = (Math.random() - 0.5) * 3;
    ctx.strokeStyle = browns[Math.floor(Math.random() * browns.length)];
    ctx.globalAlpha = 0.1 + Math.random() * 0.2;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < size; x += 20) {
      ctx.lineTo(x, y + (Math.random() - 0.5) * yJitter * 2);
    }
    ctx.lineTo(size, y + yJitter);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  return tex;
}

/** Crosshatch fabric pattern for acoustic panels */
export function createFabricTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Celtic green base
  ctx.fillStyle = "#1a3d2e";
  ctx.fillRect(0, 0, size, size);

  // Crosshatch grid
  ctx.strokeStyle = "#245a42";
  ctx.globalAlpha = 0.15;
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

/** Grass blade pattern for hitting mat turf */
export function createTurfTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base green
  ctx.fillStyle = "#245a42";
  ctx.fillRect(0, 0, size, size);

  // Random grass blades
  const greens = ["#2d7054", "#1a4832", "#307a5a", "#1f5a3e", "#28634a"];
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.strokeStyle = greens[Math.floor(Math.random() * greens.length)];
    ctx.globalAlpha = 0.3 + Math.random() * 0.4;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 2, y - 3 - Math.random() * 5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 6);
  return tex;
}

/** Subtle per-pixel noise for eggshell wall paint */
export function createWallNoiseTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  // Cream white base with ±3 noise
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 6;
    data[i] = 248 + noise;     // R
    data[i + 1] = 247 + noise; // G
    data[i + 2] = 245 + noise; // B
    data[i + 3] = 255;         // A
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}
