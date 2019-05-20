import open from 'open';
import dotenv from 'dotenv';

dotenv.config();

const appURL = process.env.APP_URL;
const facebookShareURL = `https://web.facebook.com/sharer/sharer.php?u=${appURL}/api/v1/articles/`;
const twitterShareURL = `https://twitter.com/intent/tweet?text=${appURL}/api/v1/articles/`;
const linkedinShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${appURL}/api/v1/articles/`;

export default async (req, res, next) => {
  const { article } = req;
  if (req.url.search(/\/facebook/g) > 0) {
    await open(`${facebookShareURL}${article.slug}`, { wait: false });
  } else if (req.url.search(/\/twitter/g) > 0) {
    await open(`${twitterShareURL}${article.slug}`, { wait: false });
  } else if (req.url.search(/\/linkedin/g) > 0) {
    await open(`${linkedinShareURL}${article.slug}`, { wait: false });
  } else if (req.url.search(/\/gmail/g) > 0) {
    await open(`mailto:?subject=${article.title}&body=${appURL}/api/v1/articles/${article.slug}`, {
      wait: false
    });
  }

  next();
};
