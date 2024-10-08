from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@app.route('/qr', methods=['POST'])
def handle_qr():
    qr_data = request.json.get('qr_data')
    socketio.emit('qr', {'qr_data': qr_data})
    return 'QR Data Sent', 200

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
