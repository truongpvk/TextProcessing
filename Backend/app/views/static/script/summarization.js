import { limitWord } from "./limit.js";
import { pasteText, uploadDoc } from "./upload_and_paste.js";

async function sendTextToServer(text) {
    try {
        const response = await fetch("http://127.0.0.1:5001/summarizer_model", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Server response:", data.output_text);
        return data.output_text;
    } catch (error) {
        return "Error sending text: " + error;
    }
}

// Summarizer processing
function processSummarizer() { // Hàm lấy output ở đây
    console.log('Get the input text');
    const input = document.querySelector('.summarizer-input').value;
    console.log(input);
    document.querySelector('.summarizer-output').value = "Hệ thống đang tóm tắt...!";
    sendTextToServer(input).then(output => {
        console.log(output);
        document.querySelector('.summarizer-output').value = output;
    })
}

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


// No Check
// Ensure Upload and Paste buttons are positioned correctly
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".summarize-button").addEventListener("click", processSummarizer);

    document.getElementById("paste-summarizer").addEventListener("click", function () {
        pasteText(".summarizer-input");
    });

    document.getElementById("upload-summarizer").addEventListener("change", function (event) {
        uploadDoc(event, ".summarizer-input");
    });

    positionButtons();
    limitWord(5000, ".summarizer-input", ".countWord");
});

