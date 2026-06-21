

import logEvents from './logEvents.js';
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();
class MyEmitter extends EventEmitter { };


eventEmitter.on('log', (msg) => logEvents(msg));
eventEmitter.emit('log', 'user event emitted');
