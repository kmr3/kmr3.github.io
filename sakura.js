const canvas = document.getElementById("sakura-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let petals = [];
let burstPetals = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createPetal() {
  return {
    x: Math.random() * width,
    y: Math.random() * -height,
    radius: Math.random() * 3 + 2,
    speedY: Math.random() * 1 + 0.5,
    speedX: Math.random() * 0.5 - 0.25,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 0.02 - 0.01,
  };
}

function createBurstPetal(angle) {
  const speed = Math.random() * 3 + 2;
  return {
    x: width / 2,
    y: height / 2,
    radius: Math.random() * 3 + 2,
    speedX: Math.cos(angle) * speed,
    speedY: Math.sin(angle) * speed,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 0.1 - 0.05,
    life: 100,
  };
}

function triggerBlossomBurst() {
  for (let i = 0; i < 50; i++) {
    const angle = Math.PI * 2 * (i / 50);
    burstPetals.push(createBurstPetal(angle));
  }
}

function update() {
  ctx.clearRect(0, 0, width, height);

  // 通常の花びら
  if (petals.length < 100) {
    petals.push(createPetal());
  }

  for (let i = 0; i < petals.length; i++) {
    let p = petals[i];
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 182, 193, 0.8)";
    ctx.ellipse(0, 0, p.radius, p.radius * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (p.y > height || p.x < -50 || p.x > width + 50) {
      petals[i] = createPetal();
    }
  }

  // 放射状花びら
  for (let i = burstPetals.length - 1; i >= 0; i--) {
    const bp = burstPetals[i];
    bp.x += bp.speedX;
    bp.y += bp.speedY;
    bp.rotation += bp.rotationSpeed;
    bp.life--;

    ctx.save();
    ctx.translate(bp.x, bp.y);
    ctx.rotate(bp.rotation);
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 182, 193, 0.9)";
    ctx.ellipse(0, 0, bp.radius, bp.radius * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (bp.life <= 0) {
      burstPetals.splice(i, 1);
    }
  }

  requestAnimationFrame(update);
}

update();
