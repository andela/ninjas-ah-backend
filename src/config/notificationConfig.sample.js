export default {
  inApp: {
    articles: {
      show: true,
      on: ['publish', 'comment', 'like']
    }
  },
  email: {
    articles: {
      show: true,
      on: ['publish', 'comment']
    }
  }
};
