const songs = document.querySelectorAll('.song');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const albumArt = document.getElementById('album-art');
const lyricsContainer = document.getElementById('lyrics-container');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let isAudioContextResumed = false; // To track if AudioContext is resumed

songs.forEach(song => {
    song.addEventListener('click', function() {
        let songSrc = this.getAttribute('data-src');
        let imgSrc = this.getAttribute('data-img') || 'default.jpg';
        let lyricsFile = this.getAttribute('data-lyrics');

        // Ensure the AudioContext is resumed after user interaction
        if (audioCtx.state === "suspended" && !isAudioContextResumed) {
            audioCtx.resume().then(() => {
                isAudioContextResumed = true;
                console.log("AudioContext resumed after user interaction.");
            });
        }

        audioSource.src = songSrc;
        audioPlayer.load();
        audioPlayer.play();
        albumArt.src = imgSrc;

        // Make cassette reels spin
        document.querySelectorAll(".tape-reel").forEach(reel => {
            reel.style.animation = "spin 3s linear infinite";
        });

        // Fetch and display lyrics (with error handling for CORS and missing files)
        if (lyricsFile) {
            fetch(lyricsFile)
                .then(response => {
                    if (!response.ok) throw new Error("Lyrics file not found");
                    return response.text();
                })
                .then(text => lyricsContainer.innerText = text)
                .catch(err => {
                    console.error(err);
                    lyricsContainer.innerText = "Lyrics not available.";
                });
        }
    });
});

// Audio Visualizer
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audioPlayer);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dataArray.forEach((value, index) => {
        ctx.fillStyle = `rgb(0, 255, ${value})`;
        ctx.fillRect(index * 3, canvas.height - value, 2, value);
    });
}

audioPlayer.onplay = () => {
    drawVisualizer();
};
