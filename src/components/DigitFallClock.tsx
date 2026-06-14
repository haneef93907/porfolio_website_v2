import { useRef, useEffect } from "react";

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*";
const FONT_SIZE = 16;
const GLOW_COLOR = "#FF8C00";
const DIM_COLOR = "#111111";
const BG_COLOR = "#0A0A0A";

const DIGIT_MAP: Record<number, number[]> = {
  0: [1,2,3,5,9,10,13,14,15,19,20,21,24,25,29,30,31,34,35,39,40,41,45,46,47,49,50],
  1: [1,2,7,12,17,22,27,32,37,42,47,52],
  2: [1,2,3,5,9,14,16,17,18,22,26,30,34,38,42,46,50],
  3: [1,2,3,5,9,14,16,17,18,24,29,34,35,39,40,41,45,46,47],
  4: [3,7,8,11,13,15,18,20,21,22,23,28,33,38,43,48],
  5: [0,1,2,3,4,5,10,15,16,17,18,19,24,29,34,35,39,40,41,45,46,47],
  6: [1,2,3,5,9,10,15,16,17,18,19,24,29,30,34,35,39,40,41,45,46,47],
  7: [0,1,2,3,4,9,14,18,22,26,30,34,38,42,46],
  8: [1,2,3,5,9,10,14,16,17,18,22,26,27,29,30,34,35,39,40,41,45,46,47],
  9: [1,2,3,5,9,10,14,16,17,18,19,24,29,34,35,39,40,41,45,46,47],
};

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  isTargetDigit: boolean;
  opacity: number;
}

export default function DigitFallClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const columnsRef = useRef<Column[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transform = "scaleY(-1)";

    const container = canvas.parentElement;
    if (!container) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initColumns(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    function initColumns(canvasWidth: number, canvasHeight: number) {
      const cols = Math.floor(canvasWidth / FONT_SIZE);
      const digitWidth = FONT_SIZE * 8;
      const digitHeight = FONT_SIZE * 11;
      const offsetX = (canvasWidth - digitWidth * 2 - FONT_SIZE * 2) / 2;
      const _offsetY = (canvasHeight - digitHeight) / 2;
      void _offsetY;

      columnsRef.current = [];

      for (let i = 0; i < cols; i++) {
        const isHourDigit = i >= offsetX / FONT_SIZE && i < (offsetX + digitWidth) / FONT_SIZE;
        const isMinuteDigit = i >= (offsetX + digitWidth + FONT_SIZE * 2) / FONT_SIZE && i < (offsetX + digitWidth * 2 + FONT_SIZE * 2) / FONT_SIZE;

        const x = i * FONT_SIZE;
        const y = -Math.random() * 1000;

        const speed = isHourDigit || isMinuteDigit
          ? 1 + Math.random() * 1.5
          : 2 + Math.random() * 3;

        columnsRef.current.push({
          x,
          y,
          speed,
          chars: CHARS.split(""),
          isTargetDigit: isHourDigit || isMinuteDigit,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawDigit(
      ctx: CanvasRenderingContext2D,
      digit: number,
      offsetX: number,
      offsetY: number,
      fontSize: number,
      alpha: number,
      isHighlight: boolean
    ) {
      const positions = DIGIT_MAP[digit];
      if (!positions) return;
      const char = isHighlight ? "0" : "1";

      for (const pos of positions) {
        const col = pos % 5;
        const row = Math.floor(pos / 5);
        const x = offsetX + col * fontSize;
        const y = offsetY + row * fontSize;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = isHighlight ? GLOW_COLOR : DIM_COLOR;
        ctx.fillText(char, x, y);
      }
      ctx.globalAlpha = 1;
    }

    function draw(time: number) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Frame skip for performance
      const delta = time - lastTimeRef.current;
      if (delta < 16) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTimeRef.current = time;

      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvasW, canvasH);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Glow/shadow pass for digits
      ctx.shadowBlur = 15;
      ctx.shadowColor = GLOW_COLOR;
      ctx.fillStyle = GLOW_COLOR;

      // Hour tens
      drawDigit(ctx, Math.floor(h / 10), canvasW / 2 - FONT_SIZE * 10, canvasH / 2 - FONT_SIZE * 5.5, FONT_SIZE, 1, true);
      // Hour ones
      drawDigit(ctx, h % 10, canvasW / 2 - FONT_SIZE * 5, canvasH / 2 - FONT_SIZE * 5.5, FONT_SIZE, 1, true);
      // Minute tens
      drawDigit(ctx, Math.floor(m / 10), canvasW / 2 + FONT_SIZE * 2, canvasH / 2 - FONT_SIZE * 5.5, FONT_SIZE, 1, true);
      // Minute ones
      drawDigit(ctx, m % 10, canvasW / 2 + FONT_SIZE * 7, canvasH / 2 - FONT_SIZE * 5.5, FONT_SIZE, 1, true);

      ctx.shadowBlur = 0;

      // Blinking colon
      ctx.fillStyle = GLOW_COLOR;
      const blink = Math.sin(Date.now() / 200) > 0;
      if (blink) {
        ctx.fillText(":", canvasW / 2 - FONT_SIZE * 0.5, canvasH / 2 - FONT_SIZE * 2);
        ctx.fillText(":", canvasW / 2 - FONT_SIZE * 0.5, canvasH / 2 + FONT_SIZE * 2);
      }

      // Falling columns
      for (const col of columnsRef.current) {
        for (let j = 0; j < 15; j++) {
          const charY = col.y - j * FONT_SIZE;
          if (charY < 0 || charY > canvasH) continue;

          const isVisible = col.isTargetDigit || (j === 0 && Math.random() > 0.95);
          if (!isVisible) continue;

          const alpha = j === 0 ? 1 : ((15 - j) / 15) * col.opacity;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = col.isTargetDigit ? GLOW_COLOR : DIM_COLOR;
          ctx.fillText(col.chars[Math.floor(Math.random() * col.chars.length)], col.x, charY);
        }
        ctx.globalAlpha = 1;

        col.y += col.speed;
        if (col.y > canvasH + 200) {
          col.y = -Math.random() * 500;
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
