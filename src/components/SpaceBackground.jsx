import React, { useEffect, useRef } from "react";
import { COLORS } from "./theme";

const SpaceBackground = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const COLOR_NEON = COLORS.neonBlue;
    const COLOR_BG = COLORS.darkBg;
    const COLOR_ENEMY = COLORS.neonPink;

    let width, height;
    let mouse = { x: 0, y: 0 };
    let player = { x: window.innerWidth / 2, y: window.innerHeight / 2, angle: 0 };
    let bullets = [];
    let enemies = [];
    let particles = [];
    let stars = [];
    let animationFrameId;

    const PLAYER_LERP = 0.05;
    const BULLET_SPEED = 12;
    const ENEMY_SPAWN_RATE = 50;
    let frameCount = 0;

    const handleResize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      stars = [];
      for (let i = 0; i < 100; i++) { // Reduced star count for optimization
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2,
          alpha: Math.random(),
          speed: 0.1 + Math.random() * 0.5,
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = () => {
      const angle = player.angle;
      bullets.push({
        x: player.x + Math.cos(angle) * 20,
        y: player.y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * BULLET_SPEED,
        vy: Math.sin(angle) * BULLET_SPEED,
        life: 120,
      });
    };

    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 10; i++) { // Reduced particle count
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 30 + Math.random() * 20,
          color,
          size: Math.random() * 3,
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(0, 243, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offset = (frameCount * 0.2) % gridSize;

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offset; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawStars = () => {
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        if (Math.random() > 0.99) star.alpha = Math.random();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPlayer = (x, y, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.shadowBlur = 10;
      ctx.shadowColor = COLOR_NEON;
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-15, 15);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-15, -15);
      ctx.closePath();
      ctx.strokeStyle = COLOR_NEON;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      // HIGH PERFORMANCE SHORT-CIRCUIT:
      // If the canvas is scrolled out of view, STOP calculating game logic.
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      frameCount++;
      ctx.fillStyle = COLOR_BG;
      ctx.fillRect(0, 0, width, height);

      drawStars();
      drawGrid();

      const dx = mouse.x - player.x;
      const dy = mouse.y - player.y;
      player.angle = Math.atan2(dy, dx);
      player.x += dx * PLAYER_LERP;
      player.y += dy * PLAYER_LERP;

      drawPlayer(player.x, player.y, player.angle);

      // Bullets
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#fff";
      for (let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life--;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        if (b.life <= 0 || b.x < 0 || b.x > width || b.y < 0 || b.y > height)
          bullets.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // Enemies
      if (frameCount % ENEMY_SPAWN_RATE === 0) {
        const side = Math.floor(Math.random() * 4);
        let ex, ey, evx, evy;
        const speed = 1 + Math.random() * 2;
        if (side === 0) { ex = Math.random() * width; ey = -30; evx = (Math.random() - 0.5) * 2; evy = speed; }
        else if (side === 1) { ex = width + 30; ey = Math.random() * height; evx = -speed; evy = (Math.random() - 0.5) * 2; }
        else if (side === 2) { ex = Math.random() * width; ey = height + 30; evx = (Math.random() - 0.5) * 2; evy = -speed; }
        else { ex = -30; ey = Math.random() * height; evx = speed; evy = (Math.random() - 0.5) * 2; }
        enemies.push({ x: ex, y: ey, vx: evx, vy: evy, radius: 15 + Math.random() * 10 });
      }

      ctx.shadowBlur = 5;
      ctx.shadowColor = COLOR_ENEMY;
      for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i];
        e.x += e.vx;
        e.y += e.vy;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR_ENEMY;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (e.x < -100 || e.x > width + 100 || e.y < -100 || e.y > height + 100) {
          enemies.splice(i, 1);
          continue;
        }

        for (let j = bullets.length - 1; j >= 0; j--) {
          let b = bullets[j];
          if (Math.hypot(b.x - e.x, b.y - e.y) < e.radius + 2) {
            createExplosion(e.x, e.y, COLOR_ENEMY);
            onScoreUpdate((prev) => prev + 1);
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            break;
          }
        }
      }
      ctx.shadowBlur = 0;

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.vx *= 0.95;
        p.vy *= 0.95;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 40;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.life <= 0) particles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    update();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onScoreUpdate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full block z-0"
      style={{ pointerEvents: "auto" }}
    />
  );
};

export default SpaceBackground;