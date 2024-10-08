import axios from 'axios';
import qrcode from 'qrcode-terminal';

export class QrHandler {
    private qrPath: string = 'http://qr-backend:3000/qr';

    public async sendQr(qr: string): Promise<void> {
        this.generateQrCode(qr);
        await this.sendQrData(qr);
    }

    private generateQrCode(qr: string): void {
        qrcode.generate(qr, { small: true });
    }

    private async sendQrData(qr: string): Promise<void> {
        try {
            await axios.post(this.qrPath, qr, {
                headers: { 'Content-Type': 'text/plain' }
            });
            console.log('QR dikirim');
        } catch (error) {
            console.error('Gagal mengirim QR');
        }
    }
}
