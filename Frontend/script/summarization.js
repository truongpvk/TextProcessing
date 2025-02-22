// Switch between translation, summarizer, and grammar check
function switchMode(mode) {
    document.getElementById("translation-section").style.display = "none";
    document.getElementById("summarizer-section").style.display = "none";
    document.getElementById("grammar-section").style.display = "none";

    document.querySelector(".sidebar-item.active")?.classList.remove("active");
    document.querySelector(`[onclick="switchMode('${mode}')"]`).classList.add("active");

      (mode === "translation") {
        document.getElementById("translation-section").style.display = "flex";
        document.querySelector(".logo-title").style.display = "block";
    } else {
        document.getElementById(`${mode}-section`).style.display = "block";
        document.querySelector(".logo-title").style.display = "none";
    }

    positionButtons(); // Ensure buttons are positioned correctly when switching modes
}

// Swap text between input and output in Translator
function swapText() {
    let inputText = document.querySelector(".text-input").value;
    let outputText = document.querySelector(".text-output").value;
    document.querySelector(".text-input").value = outputText;
    document.querySelector(".text-output").value = inputText;
}

document.querySelector(".swap-icon").addEventListener("click", swapText);

// Upload Document for Summarizer & Grammar Check
function uploadDoc(event, targetInput) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector(targetInput).value = e.target.result;
        };
        reader.readAsText(file);
    }
}

document.getElementById("upload-summarizer").addEventListener("change", function(event) {
    uploadDoc(event, ".summarizer-input");
});

document.getElementById("upload-grammar").addEventListener("change", function(event) {
    uploadDoc(event, ".grammar-input");
});

// Summarizer processing
function processSummarizer() {
    let inputText = document.querySelector(".summarizer-input").value;
    document.querySelector(".summarizer-output").value = inputText.substring(0, 100) + "... (Summarized)";
}

document.getElementById("summarize-button").addEventListener("click", processSummarizer);



// Paste Clipboard Text
function pasteText(targetInput) {
    navigator.clipboard.readText().then(text => {
        document.querySelector(targetInput).value = text;
    }).catch(err => {
        console.error("Failed to read clipboard contents: ", err);
    });
}

document.getElementById("paste-summarizer").addEventListener("click", function() {
    pasteText(".summarizer-input");
});

// Ensure Upload and Paste buttons are positioned correctly
document.addEventListener("DOMContentLoaded", function() {
    positionButtons();
});

function positionButtons() {
    document.querySelectorAll(".input-container").forEach(container => {
        const textarea = container.querySelector("textarea");
        const uploadBtn = container.querySelector(".upload-btn");
        const pasteBtn = container.querySelector(".paste-btn");

        if (textarea && uploadBtn && pasteBtn) {
            uploadBtn.style.position = "absolute";
            uploadBtn.style.bottom = "10px";
            uploadBtn.style.left = "10px";

            pasteBtn.style.position = "absolute";
            pasteBtn.style.bottom = "10px";
            pasteBtn.style.right = "10px";
        }
    });

    // Ensure all icons in sidebar and header remain visible
    document.querySelectorAll(".sidebar-item, .header .user-icon, .header .menu-icon").forEach(icon => {
        icon.style.display = "block";
    });
}
