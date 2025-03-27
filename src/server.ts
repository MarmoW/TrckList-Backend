import app, { init } from './app';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20; 

const port = +process.env.PORT || 4000;

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});