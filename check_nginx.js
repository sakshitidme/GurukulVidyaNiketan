const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('cat /etc/nginx/sites-enabled/bkgurukul', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('close', (code, signal) => {
      console.log(out);
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
