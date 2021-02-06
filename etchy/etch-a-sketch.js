// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// Setup canvas for drawing
// Make a variable called height and width from the same properties on our canvas
const { width, height } = canvas; 

// Create random X and Y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

console.log(width, height);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(104, 100%, 50%)`;
ctx.beginPath(); // Start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke(); 

// Write a draw function
function draw({ key }) {
   // Increment the hue
   hue += 10;
   ctx.strokeStyle = `hsl(104, 100%, 50%)`;
   console.log(key);
   // Start the path
   ctx.beginPath();
   ctx.moveTo(x, y);
   // Move our X and Y valeus depending on what user presses
   switch (key) {
      case 'ArrowUp':
         y -= MOVE_AMOUNT;
         break;
      case 'ArrowRight':
         x += MOVE_AMOUNT;
         break;
      case 'ArrowDown':
         y += MOVE_AMOUNT;
         break;
      case 'ArrowLeft':
         x -= MOVE_AMOUNT;
         break;
      default:
         break;
   }
   ctx.lineTo(x, y);
   ctx.stroke();
};

// Write handler for keys
function handleKey(e) {
   if (e.key.includes('Arrow')) {
      e.preventDefault();
      draw({ key: e.key });
   }
};

// Clear / Shake function
function clearCanvas() {
   canvas.classList.add('shake');
   ctx.clearRect(0, 0, width, height);
   canvas.addEventListener('animationend', function() {
      console.log('Shaking complete');
      canvas.classList.remove('shake');
   }, { once: true });
};

// Listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);

