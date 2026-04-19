const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('which certbot && certbot --nginx -n -d bkgurukul.in -d www.bkgurukul.in --redirect --agree-tos -m admin@bkgurukul.in', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '147.93.30.234',
  port: 22,
  username: 'root',
  password: 'Bhagwan@3962'
});
