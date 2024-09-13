import axios from 'axios';
import qrcode from 'qrcode-terminal';

const QR_PATH = 'http://qr:5000/qr';

export async function handleQr(qr: string): Promise<void> {
    qrcode.generate(qr, { small: true });

    const data = { qr_data: qr };

    try {
        await axios.post(QR_PATH, data);
        console.log('QR dikirim');
    } catch (error) {
        console.error('Gagal mengirim QR', error);
    }
}
