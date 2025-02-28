export function uploadDoc(event, targetInput) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.querySelector(targetInput).value = e.target.result;
      };
      reader.readAsText(file);
  }
}

export function pasteText(targetInput) {
  console.log("Paste Text");
  navigator.clipboard.readText().then(text => {
      document.querySelector(targetInput).value = text;
  }).catch(err => {
      console.error("Failed to read clipboard contents: ", err);
  });
}