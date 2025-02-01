document.getElementById("commandInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (this.value.toLowerCase() === "start") {
            document.getElementById("terminal").style.display = "none";
            displayConsole()
            
        } else {
            this.value = "";
            alert("Invalid command. Try 'start'.");
        }
    }
});

function displayConsole() {
    const consoleElement = document.getElementById("console");
    const mainContent = document.getElementById("main-content");
    consoleElement.style.display = "block";
    mainContent.style.display = "none";
;
        // Show console lines one by one, then reveal the main content
    const lines = document.querySelectorAll('.line');
    let delay = 6; // Delay in seconds before showing main content
        
    setTimeout(() => {
        consoleElement.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('zoomed-in');
    }, delay * 1000);

}