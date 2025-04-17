// Generate placeholder icons for the Pomodoro app
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Create 192x192 icon
function createIcon192() {
    canvas.width = 192;
    canvas.height = 192;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#e74c3c'; // Tomato red
    ctx.beginPath();
    ctx.arc(96, 96, 90, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(70, 70, 70, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer face
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(96, 96, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer knob
    ctx.fillStyle = '#f39c12'; // Orange
    ctx.beginPath();
    ctx.arc(140, 52, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw shadow on knob
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(143, 55, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer hands
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    // Minute hand
    ctx.beginPath();
    ctx.moveTo(96, 96);
    ctx.lineTo(96, 60);
    ctx.stroke();
    
    // Hour hand
    ctx.beginPath();
    ctx.moveTo(96, 96);
    ctx.lineTo(120, 96);
    ctx.stroke();
    
    return canvas.toDataURL('image/png');
}

// Create 512x512 icon
function createIcon512() {
    canvas.width = 512;
    canvas.height = 512;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#e74c3c'; // Tomato red
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(190, 190, 180, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer face
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(256, 256, 160, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer knob
    ctx.fillStyle = '#f39c12'; // Orange
    ctx.beginPath();
    ctx.arc(370, 142, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw shadow on knob
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(380, 152, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer hands
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    
    // Minute hand
    ctx.beginPath();
    ctx.moveTo(256, 256);
    ctx.lineTo(256, 150);
    ctx.stroke();
    
    // Hour hand
    ctx.beginPath();
    ctx.moveTo(256, 256);
    ctx.lineTo(330, 256);
    ctx.stroke();
    
    return canvas.toDataURL('image/png');
}

// Create favicon
function createFavicon() {
    canvas.width = 32;
    canvas.height = 32;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#e74c3c'; // Tomato red
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer face
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw timer hands
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Minute hand
    ctx.beginPath();
    ctx.moveTo(16, 16);
    ctx.lineTo(16, 8);
    ctx.stroke();
    
    // Hour hand
    ctx.beginPath();
    ctx.moveTo(16, 16);
    ctx.lineTo(22, 16);
    ctx.stroke();
    
    return canvas.toDataURL('image/png');
}

// Generate icons
const icon192 = createIcon192();
const icon512 = createIcon512();
const favicon = createFavicon();

console.log('Icons created:');
console.log('Icon 192x192:', icon192);
console.log('Icon 512x512:', icon512);
console.log('Favicon:', favicon);
