document.getElementById("commandInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (this.value.toLowerCase() === "start") {
            document.getElementById("terminal").style.display = "none";
            document.getElementById("main-content").style.display = "block";
            document.getElementById("main-content").classList.add("zoomed-in");
        } else {
            this.value = "";
            alert("Invalid command. Try 'start'.");
        }
    }
});


    // Show console lines one by one, then reveal the main content
const lines = document.querySelectorAll('.line');
let delay = 6; // Delay in seconds before showing main content
    
setTimeout(() => {
    document.getElementById('console').style.display = 'none';
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';
    mainContent.classList.add('zoomed-in');
}, delay * 1000);


//3
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

//4
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const fontSize = 14, columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(draw, 50);