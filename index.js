const Guard = require('./src/models/Guard');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const exampleRouter = require('./src/routes/example')();
const WebRtcConnectionManager = require('./src/connections/webrtcconnectionmanager');

const g = new Guard('Zoey');

const app = express();

const port = process.env.PORT || 1201;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/src/client/dist/')));
// app.use('js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const options = {
  beforeOffer: function beforeOffer(peerConnection) {
    const audioTransceiver = peerConnection.addTransceiver('audio');
    const videoTransceiver = peerConnection.addTransceiver('video');
    return Promise.all([
      audioTransceiver.sender.replaceTrack(audioTransceiver.receiver.track),
      videoTransceiver.sender.replaceTrack(videoTransceiver.receiver.track)
    ]);
  },
};

const connectionManager = WebRtcConnectionManager.create(options);

debug('asdds', connectionManager);

app.use('/examples', exampleRouter);
const hello = (req, res) => {
  res.render('index', {
    name: g.name,
  });
};
app.get('/jim', hello);

app.get('/create_connection', (req, res) => {
  connectionManager.createConnection((connection) => {
    res.send(connection);
  });
});

app.listen(port, () => {
  debug(`Running on ${chalk.green(port)}`);
});
