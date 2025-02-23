async function sendTextToServer(text, src_lang) {
    try {
        const response = await fetch("/translator_model", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text, src_lang: src_lang })
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

function translate() {
    const inputText = document.querySelector('.translation-box1').innerText;
    const dropdown1 = document.getElementById('dropdown1');
    const src_lang = dropdown1.value === 'en' ? 1 : 2;

    sendTextToServer(inputText, src_lang).then(outputText => {
        console.log("Output: ", outputText);
        document.querySelector('.translation-box2').innerHTML = outputText;
    })
}

document.querySelector(".active-model-button").addEventListener("click", translate);

function setupDropdowns() {
    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');

    dropdown1.addEventListener('change', function () {
        const selectedValue = this.value;

        if (selectedValue === 'en') {
            dropdown2.value = 'vi';
        } else {
            dropdown2.value = 'en';
        }
    });

    dropdown2.addEventListener('change', function () {
        const selectedValue = this.value;

        if (selectedValue === 'en') {
            dropdown1.value = 'vi';
        } else {
            dropdown1.value = 'en';
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setupDropdowns(); //
});