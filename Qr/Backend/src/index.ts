import express, { Request, Response } from 'express';

const app = express();

app.use(express.text());

let qrcode: string = "";

app.post('/qr', (req: Request, res: Response) => {
    qrcode = req.body;
    res.send('Data received');
});

app.get('/qr', (req: Request, res: Response) => {
    res.send(qrcode);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Backend qr running on port ${port}`);
});
