import * as THREE from "three";

const SCREEN_W = 512;
const SCREEN_H = 288; // 16:9

/**
 * Procedural golf course view + sim UI overlay drawn to a canvas.
 * Updated at ~10fps via manual throttle in useFrame.
 */
export class AnimatedScreenTexture {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  private frame = 0;
  private lastUpdate = 0;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = SCREEN_W;
    this.canvas.height = SCREEN_H;
    this.ctx = this.canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.draw();
  }

  /** Call from useFrame — throttles to ~10fps */
  update(time: number) {
    if (time - this.lastUpdate < 0.1) return;
    this.lastUpdate = time;
    this.frame++;
    this.draw();
    this.texture.needsUpdate = true;
  }

  private draw() {
    const ctx = this.ctx;
    const w = SCREEN_W;
    const h = SCREEN_H;

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.55);
    skyGrad.addColorStop(0, "#6cb4ee");
    skyGrad.addColorStop(0.6, "#a8d8f0");
    skyGrad.addColorStop(1, "#d4eef8");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.55);

    // Clouds (slow drift)
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    const cloudOffset = (this.frame * 0.3) % (w + 200);
    this.drawCloud(ctx, cloudOffset - 100, h * 0.12, 60);
    this.drawCloud(ctx, (cloudOffset + 200) % (w + 200) - 100, h * 0.2, 45);
    this.drawCloud(ctx, (cloudOffset + 400) % (w + 200) - 100, h * 0.08, 50);

    // Distant hills
    ctx.fillStyle = "#5a9e6f";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    for (let x = 0; x <= w; x += 8) {
      const hill = Math.sin(x * 0.01 + 1.2) * 15 + Math.sin(x * 0.025) * 8;
      ctx.lineTo(x, h * 0.5 + hill);
    }
    ctx.lineTo(w, h * 0.55);
    ctx.closePath();
    ctx.fill();

    // Fairway
    const fairwayGrad = ctx.createLinearGradient(0, h * 0.5, 0, h * 0.75);
    fairwayGrad.addColorStop(0, "#4a9e5a");
    fairwayGrad.addColorStop(1, "#3a8e4a");
    ctx.fillStyle = fairwayGrad;
    ctx.fillRect(0, h * 0.5, w, h * 0.3);

    // Fairway stripes
    ctx.fillStyle = "rgba(60, 150, 75, 0.3)";
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        const stripeY = h * 0.5 + (i / 8) * h * 0.3;
        ctx.fillRect(0, stripeY, w, h * 0.3 / 8);
      }
    }

    // Rough borders
    ctx.fillStyle = "#2d7544";
    ctx.fillRect(0, h * 0.5, w * 0.15, h * 0.3);
    ctx.fillRect(w * 0.85, h * 0.5, w * 0.15, h * 0.3);

    // Flag pin
    const flagX = w * 0.55;
    const flagY = h * 0.48;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(flagX, flagY);
    ctx.lineTo(flagX, flagY - 30);
    ctx.stroke();
    ctx.fillStyle = "#cc3333";
    ctx.beginPath();
    ctx.moveTo(flagX, flagY - 30);
    ctx.lineTo(flagX + 12, flagY - 25);
    ctx.lineTo(flagX, flagY - 20);
    ctx.fill();

    // Sim UI overlay bar at bottom
    const uiY = h * 0.8;
    const uiH = h * 0.2;
    ctx.fillStyle = "rgba(20, 47, 36, 0.85)";
    ctx.fillRect(0, uiY, w, uiH);

    // Divider line
    ctx.strokeStyle = "rgba(201, 169, 89, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, uiY);
    ctx.lineTo(w, uiY);
    ctx.stroke();

    // Sim data readouts
    ctx.fillStyle = "#c9a959";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";

    const metrics = [
      { label: "BALL SPEED", value: "167.2 mph" },
      { label: "CARRY", value: "285 yds" },
      { label: "TOTAL", value: "301 yds" },
      { label: "SPIN", value: "2,450 rpm" },
      { label: "LAUNCH", value: "12.4°" },
    ];

    const spacing = w / (metrics.length + 1);
    metrics.forEach((m, i) => {
      const x = spacing * (i + 1);
      ctx.fillStyle = "rgba(201, 169, 89, 0.6)";
      ctx.font = "9px monospace";
      ctx.fillText(m.label, x, uiY + 18);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px monospace";
      ctx.fillText(m.value, x, uiY + 36);
    });
  }

  private drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.35, y - size * 0.15, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.6, y, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  dispose() {
    this.texture.dispose();
  }
}
