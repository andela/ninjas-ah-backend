import eventEmitter from './eventEmitter';
import publishArticle from './notifications/publishArticle';
import commentArticle from './notifications/commentArticle';

eventEmitter.on('publishArticle', publishArticle);
eventEmitter.on('commentArticle', commentArticle);
eventEmitter.on('error', err => process.stdout.write('Oops! an event error occurred') && err);
