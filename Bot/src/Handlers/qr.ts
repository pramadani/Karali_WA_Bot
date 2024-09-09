import axios from 'axios';
import qrcode from "qrcode-terminal";

const qr_path: string = "http://qr:5000/qr"

export async function handle_qr(qr: string) {
    qrcode.generate(qr, { small: true });

    const data = {
        qr_data: qr
    };

    axios.post(qr_path, data)
        .then(() => { 
            console.log('QR dikirim'); 
        })
        .catch(() => {
            console.error('Gagal mengirim QR');
        });
}
