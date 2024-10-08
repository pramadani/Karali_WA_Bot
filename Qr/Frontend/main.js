function fetchQrData() {
    axios.get('/qr')
        .then(response => {
            const qrData = response.data;

            document.getElementById('qr_data').textContent = qrData;

            const qr = new QRious({
                element: document.getElementById('qrcode'),
                value: qrData,
                size: 400
            });
        })
        .catch(error => {
            console.error('Error fetching QR data:', error);
        });
}

setInterval(fetchQrData, 1000);