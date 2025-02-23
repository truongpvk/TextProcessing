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

// Summarizer processing
function processSummarizer() { // Hàm lấy output ở đây

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







// No Check
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
