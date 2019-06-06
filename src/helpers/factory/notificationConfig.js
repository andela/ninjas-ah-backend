// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';

export default Factory.define('notificationConfig').attr('config', {
  inApp: {
    articles: {
      show: true,
      on: ['publish', 'comment', 'like']
    }
  },
  email: {
    articles: {
      show: true,
      on: ['publish']
    }
  }
});
