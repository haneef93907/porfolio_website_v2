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
  subtitle: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
  phase: number;
}

export default function DigitFallClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const visibleRef = useRef(true);
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
        alpha: 0.12 + Math.random() * 0.34,
      }));

      const cardW = Math.min(190, Math.max(160, width * 0.26));
      const cardH = 74;
      const phoneW = 210;
      const cx = width * 0.5;
      const gap = Math.max(20, width * 0.035);
      const leftX = Math.max(18, cx - phoneW / 2 - gap - cardW);
      const rightX = Math.min(width - cardW - 18, cx + phoneW / 2 + gap);
      const topY = Math.max(34, height * 0.13);
      const midY = Math.max(topY + cardH + 22, height * 0.36);
      const bottomY = Math.min(height - cardH - 42, height * 0.64);

      cardsRef.current = [
        { label: "UI/UX Design", subtitle: "Clean mobile interfaces", icon: "UX", color: "#ff8c00", x: leftX, y: topY, w: cardW, h: cardH, phase: 0.4 },
        { label: "Firebase", subtitle: "Auth, database, storage", icon: "FB", color: "#18d6b1", x: leftX, y: midY, w: cardW, h: cardH, phase: 1.2 },
        { label: "REST API", subtitle: "Scalable backend APIs", icon: "API", color: "#00bfff", x: leftX, y: bottomY, w: cardW, h: cardH, phase: 2.1 },
        { label: "Stripe Payments", subtitle: "Secure payment flows", icon: "$", color: "#ff8c00", x: rightX, y: topY, w: cardW, h: cardH, phase: 1.7 },
        { label: "Localization", subtitle: "Multi-language support", icon: "L10n", color: "#18d6b1", x: rightX, y: midY, w: cardW, h: cardH, phase: 2.6 },
        { label: "App Deployment", subtitle: "Play Store & App Store", icon: "GO", color: "#00bfff", x: rightX, y: bottomY, w: cardW, h: cardH, phase: 3.3 },
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
      const bob = Math.sin(time * 0.0014) * 6;
      const phoneW = 210;
      const phoneH = 388;
      const x = cx - phoneW / 2;
      const y = cy - phoneH / 2 + bob;

      context.save();
      context.shadowColor = "rgba(0,191,255,0.35)";
      context.shadowBlur = 42;
      roundedRect(context, x, y, phoneW, phoneH, 30);
      context.fillStyle = "rgba(10, 10, 12, 0.86)";
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "rgba(255,255,255,0.18)";
      context.stroke();

      roundedRect(context, x + 16, y + 32, phoneW - 32, phoneH - 62, 18);
      const screenGradient = context.createLinearGradient(x, y, x + phoneW, y + phoneH);
      screenGradient.addColorStop(0, "rgba(0,191,255,0.18)");
      screenGradient.addColorStop(0.45, "rgba(255,140,0,0.22)");
      screenGradient.addColorStop(1, "rgba(255,255,255,0.05)");
      context.fillStyle = screenGradient;
      context.fill();

      roundedRect(context, cx - 36, y + 12, 72, 14, 7);
      context.fillStyle = "rgba(0,0,0,0.8)";
      context.fill();

      context.shadowBlur = 0;
      context.fillStyle = "rgba(255,255,255,0.72)";
      context.font = '500 11px "Inter", sans-serif';
      context.textAlign = "left";
      context.fillText("Hello Haneef", x + 30, y + 68);

      context.fillStyle = "rgba(255,255,255,0.94)";
      context.font = '700 15px "Space Grotesk", sans-serif';
      context.fillText("Let's build something", x + 30, y + 88);
      context.fillText("great today!", x + 30, y + 106);

      roundedRect(context, x + 30, y + 128, phoneW - 60, 64, 14);
      const metricGradient = context.createLinearGradient(x + 30, y + 128, x + phoneW - 30, y + 192);
      metricGradient.addColorStop(0, "rgba(0,191,255,0.38)");
      metricGradient.addColorStop(1, "rgba(24,214,177,0.2)");
      context.fillStyle = metricGradient;
      context.fill();

      context.fillStyle = "rgba(255,255,255,0.72)";
      context.font = '500 9px "Inter", sans-serif';
      context.fillText("Total Downloads", x + 42, y + 150);

      context.fillStyle = "rgba(255,255,255,0.95)";
      context.font = '700 23px "Space Grotesk", sans-serif';
      context.fillText("40+", x + 42, y + 174);

      context.font = '500 12px "JetBrains Mono", monospace';
      context.fillStyle = "rgba(255,140,0,0.95)";
      context.textAlign = "center";
      context.fillText("ANDROID   IOS", cx, y + 220);

      const features = ["Real-time Chat", "Analytics", "Secure Payments", "Push Notifications"];
      context.textAlign = "left";
      for (let i = 0; i < features.length; i++) {
        const rowY = y + 248 + i * 25;
        const pulse = 0.45 + Math.sin(time * 0.002 + i) * 0.18;
        roundedRect(context, x + 30, rowY, phoneW - 60, 18, 9);
        context.fillStyle = `rgba(0,0,0,${0.26 + pulse * 0.08})`;
        context.fill();

        context.beginPath();
        context.arc(x + 42, rowY + 8.5, 3, 0, Math.PI * 2);
        context.fillStyle = i % 2 ? "rgba(0,191,255,0.88)" : "rgba(255,140,0,0.9)";
        context.fill();

        context.fillStyle = "rgba(255,255,255,0.86)";
        context.font = '600 9.5px "Inter", sans-serif';
        context.fillText(features[i], x + 52, rowY + 11);
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
      const isLeft = x < cx;
      const startX = isLeft ? x + card.w : x;
      const endX = isLeft ? cx - 105 : cx + 105;
      const cardMidY = y + card.h / 2;
      const phoneY = cy + Math.sin(time * 0.0014) * 6;
      const wave = Math.sin(time * 0.003 + card.phase) * 8;

      context.save();
      context.beginPath();
      context.moveTo(startX, cardMidY);
      context.bezierCurveTo(
        startX + (isLeft ? 42 : -42),
        cardMidY + wave,
        endX + (isLeft ? -36 : 36),
        phoneY + wave,
        endX,
        phoneY
      );
      context.strokeStyle = card.color === "#00bfff" ? "rgba(0,191,255,0.6)" : card.color === "#18d6b1" ? "rgba(24,214,177,0.55)" : "rgba(255,140,0,0.55)";
      context.lineWidth = 2;
      context.shadowColor = context.strokeStyle;
      context.shadowBlur = 14;
      context.stroke();
      context.shadowBlur = 0;

      context.shadowColor = `${card.color}40`;
      context.shadowBlur = 18;
      roundedRect(context, x, y, card.w, card.h, 12);
      const cardGradient = context.createLinearGradient(x, y, x + card.w, y + card.h);
      cardGradient.addColorStop(0, "rgba(245,250,255,0.84)");
      cardGradient.addColorStop(0.55, "rgba(221,236,243,0.78)");
      cardGradient.addColorStop(1, "rgba(120,148,158,0.72)");
      context.fillStyle = cardGradient;
      context.fill();
      context.strokeStyle = `${card.color}aa`;
      context.lineWidth = 1.8;
      context.stroke();
      context.shadowBlur = 0;

      roundedRect(context, x + 14, y + 15, 25, 25, 7);
      context.fillStyle = "rgba(255,255,255,0.66)";
      context.fill();

      context.fillStyle = card.color;
      context.font = card.icon.length > 2 ? '700 7px "Inter", sans-serif' : '700 10px "Inter", sans-serif';
      context.textAlign = "center";
      context.fillText(card.icon, x + 26.5, y + 31);

      context.shadowColor = "rgba(255,255,255,0.9)";
      context.shadowBlur = 4;
      context.fillStyle = "rgba(15,23,42,0.92)";
      context.font = '800 10.5px "Space Grotesk", sans-serif';
      context.textAlign = "left";
      context.fillText(card.label, x + 46, y + 28);

      context.fillStyle = "rgba(38,55,72,0.78)";
      context.font = '700 8.5px "Inter", sans-serif';
      context.fillText(card.subtitle, x + 46, y + 47);
      context.shadowBlur = 0;
      context.restore();
    }

    function drawPlatform(cx: number, cy: number, width: number, time: number) {
      const y = cy + 230;
      context.save();
      context.translate(cx, y);
      for (const [index, ring] of [0.58, 0.4, 0.24].entries()) {
        context.beginPath();
        context.ellipse(0, 0, width * ring * 0.42, width * ring * 0.075, 0, 0, Math.PI * 2);
        context.strokeStyle = index === 0 ? "rgba(0,191,255,0.34)" : "rgba(255,140,0,0.22)";
        context.lineWidth = index === 0 ? 2 : 1;
        context.shadowColor = context.strokeStyle;
        context.shadowBlur = 18 - index * 4;
        context.stroke();
      }

      const pulse = 0.5 + Math.sin(time * 0.002) * 0.18;
      const platformGradient = context.createRadialGradient(0, 0, 0, 0, 0, width * 0.24);
      platformGradient.addColorStop(0, `rgba(0,191,255,${0.22 + pulse * 0.12})`);
      platformGradient.addColorStop(1, "rgba(0,191,255,0)");
      context.fillStyle = platformGradient;
      context.fillRect(-width * 0.32, -80, width * 0.64, 160);
      context.restore();
    }

    function draw(time: number) {
      if (!visibleRef.current) {
        frameRef.current = 0;
        return;
      }

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

      drawPlatform(cx, cy, width, time);

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
      } else {
        frameRef.current = 0;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    frameRef.current = requestAnimationFrame(draw);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !frameRef.current) {
          frameRef.current = requestAnimationFrame(draw);
        }

        if (!entry.isIntersecting && frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvasElement);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
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
