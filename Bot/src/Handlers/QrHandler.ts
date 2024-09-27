// QrHandler.ts
import axios from 'axios';
import qrcode from 'qrcode-terminal';

export class QrHandler {
    private qrPath: string = 'http://qr:5000/qr';

    public async sendQr(qr: string): Promise<void> {
        this.generateQrCode(qr);
        await this.sendQrData(qr);
    }

    private generateQrCode(qr: string): void {
        qrcode.generate(qr, { small: true });
    }

    private async sendQrData(qr: string): Promise<void> {
        const data = { qr_data: qr };

        try {
            await axios.post(this.qrPath, data);
            console.log('QR dikirim');
        } catch (error) {
            console.error('Gagal mengirim QR', error);
        }
    }
}
