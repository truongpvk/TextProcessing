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

async function sendTextToServer(text) {
    try {
        const response = await fetch("/summarizer_model", {
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
    sendTextToServer(input).then(output => {
        console.log(output);
        document.querySelector('.summarizer-output').value = output;
    })
}

document.querySelector(".summarize-button").addEventListener("click", processSummarizer);



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
