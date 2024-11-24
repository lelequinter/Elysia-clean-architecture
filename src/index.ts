import { Server } from './server/server.js'; //* Si se hace una build a js escribir en los imports la extension .js

(() => {
  const server = new Server()
  server.start()
})();