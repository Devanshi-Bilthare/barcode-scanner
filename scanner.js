document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const barcodeResult = document.getElementById('barcode-result');

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: video, // Or '#yourElement' (optional)
            constraints: {
                facingMode: "environment" // To use the back camera
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        console.log(data);
        const code = data.codeResult.code;
        barcodeResult.value = code;
        Quagga.stop(); // Stops the scanner after reading a barcode
    });
});
