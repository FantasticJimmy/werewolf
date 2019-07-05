const ConnectionManager = require('./connectionmanager');
const WebRtcConnection = require('./webrtcconnection');

class WebRtcConnectionManager {
  constructor(options = {}) {
    // eslint-disable-next-line no-param-reassign
    options = {
      Connection: WebRtcConnection,
      ...options
    };

    const connectionManager = new ConnectionManager(options);

    this.createConnection = async () => {
      const connection = connectionManager.createConnection();
      await connection.doOffer();
      return connection;
    };

    this.getConnection = id => connectionManager.getConnection(id);

    this.getConnections = () => connectionManager.getConnections();
  }

  toJSON() {
    return this.getConnections().map(connection => connection.toJSON());
  }
}

WebRtcConnectionManager.create = function create(options) {
  return new WebRtcConnectionManager({
    Connection: id => new WebRtcConnection(id, options),
  });
};

module.exports = WebRtcConnectionManager;
