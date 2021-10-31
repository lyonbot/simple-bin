'use strict';

import Hapi = require('@hapi/hapi');
import inert = require('@hapi/inert')
import { routes } from './routes';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
      cors: true,
      files: {
        relativeTo: __dirname,
      }
    }
  });

  await server.register(inert);

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => h.redirect('./static/')
  });

  server.route({
    method: 'GET',
    path: '/static/{path*}',
    handler: {
      directory: {
        path: '.', 
        redirectToSlash: true
      }
    }
  });

  server.route(routes)

  await server.start();
  console.log('Server started on port %s', server.info.port);
};

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection------------\n', err);
  process.exit(1);
});

init();
