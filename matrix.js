const canvas = document.getElementById('matrix')
const ctx = canvas.getContext('2d')

const CHARS =                                      // available character pool
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' + // katakana chars
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +                   // latin uppercase chars
  '0123456789' + '♥☻☺♫☼α';                    // numeric chars

const CONFIG = {
    fontSize: 16,
    speed: 50,
    fadeAlpha: 0.05,
    color: '#00FF41',
    headColor: '#FFFFFF',
}

let cols = 0;
let drops = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / CONFIG.fontSize);
    drops = Array.from({ length: cols }, () => 
    Math.floor(Math.random() * -50));
}

function draw() {
    ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.fadeAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${CONFIG.fontSze}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * CONFIG.fontSize;
        const y = drops[i] * CONFIG.fontSize;

        ctx.fillStyle = drops[i] > 0 ? CONFIG.headColor : CONFIG.color;
        ctx.fillText(char, x, y);
        ctx.fillStyle = CONFIG.color;
        drops[i]++;

        if (drops[i] * CONFIG.fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = Math.floor(Math.random() * -20);
        }
    }
}

init();
setInterval(draw, CONFIG.speed);

window.addEventListener('resize', init);