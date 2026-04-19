const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('systemctl reload nginx', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', (code, signal) => {
      console.log('Reload complete', code);
      conn.end();
    }).on('data', (data) => {
      out += data.toString();
    }).stderr.on('data', (data) => {
      console.error(data.toString());
    });
  });
}).connect({
  host: '147.93.30.234',
  port: 22,
  username: 'root',
  password: 'Bhagwan@3962'
});
