let qrButton = document.querySelector(".qr-button")
let searchPage = document.querySelector(".body")
let qrPage = document.querySelector(".qr-page")
let urlForQR = document.querySelector("#url")
let downloadButton = document.querySelector(".download-button")

let qrCodeImgLink;
qrButton.addEventListener("click", () => {
    searchPage.style.display = "none";
    qrPage.style.display = "block";
    let url = urlForQR.value;
    const qrcode = new QRCode(document.getElementById('qrcode'), {
        text: url,
        colorDark : '#000',
        colorLight : '#F2F5F9',
        correctLevel : QRCode.CorrectLevel.H
    });
    setTimeout(function() {
        let qrCodeImgLink = qrcode._oDrawing._elImage.src;
        console.log(qrCodeImgLink);
    }, 2000);
});


downloadButton.addEventListener("click", () => {
    // Get the canvas element
    const canvas = document.querySelector("canvas");
    if (!canvas) {
        alert("No QR code generated!");
        return;
    }
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = 'qrcode.png';
    link.click();
});