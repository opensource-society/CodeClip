document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  const input = document.getElementById("clipInput");
  const qrDiv = document.getElementById("qrcode");

  btn.addEventListener("click", () => {
    const text = input.value.trim();
    qrDiv.innerHTML = "";

    if (!text) {
      alert("Please enter some text!");
      return;
    }

    if (text.length <= 1500) {
      new QRCode(qrDiv, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    } else {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      new QRCode(qrDiv, {
        text: url,
        width: 220,
        height: 220,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
      });

      const downloadNote = document.createElement("p");
      downloadNote.innerText =
        "This QR contains a download link for your text file.";
      downloadNote.style.marginTop = "10px";
      downloadNote.style.fontSize = "14px";
      qrDiv.appendChild(downloadNote);
    }
  });
});
