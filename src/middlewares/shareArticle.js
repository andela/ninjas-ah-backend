import open from 'open';
import dotenv from 'dotenv';

dotenv.config();

const { APP_URL_FRONTEND } = process.env.APP_URL_FRONTEND;
const facebookShareURL = `https://web.facebook.com/sharer/sharer.php?u=${APP_URL_FRONTEND}/articles/`;
const twitterShareURL = `https://twitter.com/intent/tweet?text=${APP_URL_FRONTEND}/articles/`;
const linkedinShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${APP_URL_FRONTEND}/articles/`;

export default async (req, res, next) => {
  const { article } = req;
  if (req.url.search(/\/facebook/g) > 0) {
    await open(`${facebookShareURL}${article.slug}`, { wait: false });
  } else if (req.url.search(/\/twitter/g) > 0) {
    await open(`${twitterShareURL}${article.slug}`, { wait: false });
  } else if (req.url.search(/\/linkedin/g) > 0) {
    await open(`${linkedinShareURL}${article.slug}`, { wait: false });
  } else if (req.url.search(/\/gmail/g) > 0) {
    await open(
      `mailto:?subject=${article.title}&body=${APP_URL_FRONTEND}/articles/${article.slug}`,
      {
        wait: false
      }
    );
  }

  next();
};
