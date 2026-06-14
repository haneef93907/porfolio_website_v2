import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
}

interface CardNode {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  phase: number;
}

export default function DigitFallClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const cardsRef = useRef<CardNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasElement = canvas;
    const containerElement = container;
    const context = ctx;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const width = Math.max(containerElement.clientWidth, 320);
      const height = Math.max(containerElement.clientHeight, 320);
      canvasElement.width = Math.floor(width * pixelRatio);
      canvasElement.height = Math.floor(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      seedScene(width, height);
    }

    function seedScene(width: number, height: number) {
      particlesRef.current = Array.from({ length: 46 }, (_, index) => ({
        angle: (Math.PI * 2 * index) / 46,
        radius: Math.min(width, height) * (0.18 + Math.random() * 0.34),
        speed: 0.00045 + Math.random() * 0.00075,
        size: 1.4 + Math.random() * 2.8,
        alpha: 0.22 + Math.random() * 0.52,
      }));

      const cardW = Math.min(190, Math.max(142, width * 0.26));
      const cardH = 58;
      const phoneW = 180;
      const cx = width * 0.5;
      const gap = Math.max(36, width * 0.055);
      const leftX = Math.max(18, cx - phoneW / 2 - gap - cardW);
      const rightX = Math.min(width - cardW - 18, cx + phoneW / 2 + gap);
      const topY = Math.max(34, height * 0.18);
      const bottomY = Math.min(height - cardH - 36, height * 0.72);

      cardsRef.current = [
        { label: "UI/UX Design", x: leftX, y: topY, w: cardW, h: cardH, phase: 0.4 },
        { label: "Backend Integration", x: rightX, y: topY, w: cardW, h: cardH, phase: 1.6 },
        { label: "Payment Integration", x: leftX, y: bottomY, w: cardW, h: cardH, phase: 2.2 },
        { label: "App Deployment", x: rightX, y: bottomY, w: cardW, h: cardH, phase: 3.1 },
      ];
    }

    function roundedRect(
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
    }

    function drawPhone(cx: number, cy: number, time: number) {
      const bob = Math.sin(time * 0.0014) * 8;
      const phoneW = 180;
      const phoneH = 350;
      const x = cx - phoneW / 2;
      const y = cy - phoneH / 2 + bob;

      context.save();
      context.shadowColor = "rgba(255,140,0,0.45)";
      context.shadowBlur = 38;
      roundedRect(context, x, y, phoneW, phoneH, 30);
      context.fillStyle = "rgba(10, 10, 12, 0.86)";
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "rgba(255,255,255,0.18)";
      context.stroke();

      roundedRect(context, x + 18, y + 34, phoneW - 36, phoneH - 68, 18);
      const screenGradient = context.createLinearGradient(x, y, x + phoneW, y + phoneH);
      screenGradient.addColorStop(0, "rgba(0,191,255,0.14)");
      screenGradient.addColorStop(0.45, "rgba(255,140,0,0.16)");
      screenGradient.addColorStop(1, "rgba(255,255,255,0.05)");
      context.fillStyle = screenGradient;
      context.fill();

      context.shadowBlur = 0;
      context.fillStyle = "rgba(255,255,255,0.88)";
      context.font = '700 18px "Space Grotesk", sans-serif';
      context.textAlign = "center";
      context.fillText("Flutter", cx, y + 94);

      context.font = '500 12px "JetBrains Mono", monospace';
      context.fillStyle = "rgba(255,140,0,0.95)";
      context.fillText("ANDROID  IOS", cx, y + 120);

      for (let i = 0; i < 4; i++) {
        const rowY = y + 160 + i * 34;
        const pulse = 0.45 + Math.sin(time * 0.002 + i) * 0.18;
        roundedRect(context, x + 38, rowY, phoneW - 76, 16, 8);
        context.fillStyle = `rgba(255,255,255,${0.09 + pulse * 0.08})`;
        context.fill();
        roundedRect(context, x + 38, rowY, (phoneW - 76) * (0.48 + i * 0.1), 16, 8);
        context.fillStyle = i % 2 ? "rgba(0,191,255,0.38)" : "rgba(255,140,0,0.45)";
        context.fill();
      }

      context.beginPath();
      context.arc(cx, y + phoneH - 32, 5, 0, Math.PI * 2);
      context.fillStyle = "rgba(255,255,255,0.35)";
      context.fill();
      context.restore();
    }

    function drawCard(card: CardNode, cx: number, cy: number, time: number) {
      const floatY = Math.sin(time * 0.0017 + card.phase) * 9;
      const x = card.x;
      const y = card.y + floatY;

      context.save();
      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(x + card.w / 2, y + card.h / 2);
      context.strokeStyle = "rgba(255,140,0,0.16)";
      context.lineWidth = 1;
      context.stroke();

      context.shadowColor = "rgba(255,140,0,0.24)";
      context.shadowBlur = 20;
      roundedRect(context, x, y, card.w, card.h, 12);
      const cardGradient = context.createLinearGradient(x, y, x + card.w, y + card.h);
      cardGradient.addColorStop(0, "rgba(255,255,255,0.16)");
      cardGradient.addColorStop(1, "rgba(255,255,255,0.07)");
      context.fillStyle = cardGradient;
      context.fill();
      context.strokeStyle = "rgba(255,255,255,0.2)";
      context.stroke();
      context.shadowBlur = 0;

      context.fillStyle = "rgba(255,255,255,0.88)";
      context.font = '600 13px "Space Grotesk", sans-serif';
      context.textAlign = "center";
      context.fillText(card.label, x + card.w / 2, y + 33);
      context.restore();
    }

    function draw(time: number) {
      const width = canvasElement.clientWidth;
      const height = canvasElement.clientHeight;
      const cx = width * 0.5;
      const cy = height * 0.52;

      context.clearRect(0, 0, width, height);

      const bgGradient = context.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
      bgGradient.addColorStop(0, "rgba(255,140,0,0.17)");
      bgGradient.addColorStop(0.34, "rgba(0,191,255,0.11)");
      bgGradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = bgGradient;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(cx, cy);
      for (const ring of [0.32, 0.48]) {
        context.beginPath();
        context.ellipse(0, 0, width * ring, height * ring * 0.52, Math.sin(time * 0.0002) * 0.1, 0, Math.PI * 2);
        context.strokeStyle = ring > 0.4 ? "rgba(0,191,255,0.13)" : "rgba(255,140,0,0.18)";
        context.lineWidth = 1;
        context.stroke();
      }
      context.restore();

      for (const particle of particlesRef.current) {
        particle.angle += prefersReducedMotion ? 0 : particle.speed * 16;
        const px = cx + Math.cos(particle.angle) * particle.radius;
        const py = cy + Math.sin(particle.angle) * particle.radius * 0.48;
        context.beginPath();
        context.arc(px, py, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,140,0,${particle.alpha})`;
        context.fill();
      }

      drawPhone(cx, cy, time);
      for (const card of cardsRef.current) {
        drawCard(card, cx, cy, time);
      }

      if (!prefersReducedMotion) {
        frameRef.current = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
