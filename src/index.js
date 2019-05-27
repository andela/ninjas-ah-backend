import app from './app';
/**
 * Normalize a port into a number, string, or false.
 * @param {int} val The port number.
 * @returns {int} The port number.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val; // named pipe
  }

  if (port >= 0) {
    return port; // port number
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 * Normalize a port into a number, string, or false.
 * @param {int} error The created error.
 * @returns {string} The error message.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.stdout.write(`${bind} requires elevated privileges\n`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.stdout.write(`${bind} is already in use\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Listen on provided port, on all network interfaces.
 */
app.server.listen(port, () => {
  process.stdout.write(`Server is running on port: ${port}\n`);
});
app.server.on('error', onError);
