// ============================================ // 
// Matrix Rain — matrix.js                      // file identification
// ============================================ // 

const canvas = document.getElementById('matrix');           // grab canvas element from DOM
const ctx = canvas.getContext('2d');                        // get 2D drawing context

const CHARS =                                                // available character pool
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' + // katakana chars
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +                            // latin uppercase chars
  '0123456789';                                             // numeric chars

const CONFIG = {                                            // main animation settings
  fontSize: 16,                                             // character size in pixels
  speed: 50,                                                // frame delay in milliseconds
  fadeAlpha: 0.05,                                          // trail fade strength
};

const THEMES = {
    green : { color: '#00FF41', headColor: '#1dfc00' }, // classic matrix green
    red   : { color: '#FF2020', headColor: '#ff0000' }, // red variant
    pink  : { color: '#e40373', headColor: '#ff27be' }, // pink variant
};

let currentTheme = THEMES.green;                            // active theme green by default
let cols = 0;                                               // total number of columns
let drops = [];                                             // y position for each column

function init() {                                           // initialize canvas and rain state
  canvas.width = window.innerWidth;                         // sync canvas width with viewport
  canvas.height = window.innerHeight;                       // sync canvas height with viewport
  cols = Math.floor(canvas.width / CONFIG.fontSize);        // calculate column count
  drops = Array.from({ length: cols }, () =>                // create one drop per column
    Math.floor(Math.random() * -50)                         // start above visible area
  );
}

function draw() {                                           // render one animation frame
  ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.fadeAlpha})`;     // set fading overlay color
  ctx.fillRect(0, 0, canvas.width, canvas.height);          // paint overlay on full canvas

  ctx.font = `${CONFIG.fontSize}px monospace`;              // set font style for characters

  for (let i = 0; i < drops.length; i++) {                  // loop through all columns
    const char = CHARS[Math.floor(Math.random() * CHARS.length)]; // random character
    const x = i * CONFIG.fontSize;                          // x position based on column
    const y = drops[i] * CONFIG.fontSize;                   // y position based on drop row

    ctx.fillStyle = drops[i] > 0 ? currentTheme.headColor : currentTheme.color; // use active theme head color
    ctx.fillText(char, x, y);                               // draw character on canvas

    ctx.fillStyle = currentTheme.color;                      // use active theme body color
    drops[i]++;                                              // move current drop downward

    if (drops[i] * CONFIG.fontSize > canvas.height && Math.random() > 0.975) { // check reset condition
      drops[i] = Math.floor(Math.random() * -20);           // restart column above screen
    }
  }
}

function setTheme(name) {                                    // switch active color theme without restarting
    currentTheme = THEMES[name] ?? THEMES.green;             // fallback to green if name is valid
}

function setSpeed(ms) {
    CONFIG.speed = ms;
    clearInterval(animationLoop);
    animationLoop = setInterval(draw, ms);
}

function setDensity(size) {
    CONFIG.fontSize = size;
    ctx.font = `${size}px monospace`;
    init();
}

init();                                                      // prepare initial state
let animationLoop = setInterval(draw, CONFIG.speed);                             // store interval so we can restart it 

window.addEventListener('resize', init);                     // rebuild layout on resize