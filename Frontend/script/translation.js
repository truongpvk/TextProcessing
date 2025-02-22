function translate() {
    const inputText = document.querySelector('.translation-box1').innerText;

    let translatedText = "";

    if (inputText.trim() === "") {
        translatedText = "Vui lòng nhập văn bản để dịch.";
    } else {
        translatedText = inputText.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
    }

    document.querySelector('.translation-box2').innerText = translatedText;
}

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