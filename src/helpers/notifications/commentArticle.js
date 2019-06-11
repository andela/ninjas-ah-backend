import dotenv from 'dotenv';
import sendNotification from './sendNotification';
import { User, Article } from '../../queries';

dotenv.config();

export default async (comment) => {
  try {
    const { APP_URL_FRONTEND } = process.env;
    const author = await User.findOne({ id: comment.userId });
    let favorites = await Article.favorite.getAll(null, comment.articleSlug);

    favorites = !favorites.errors ? favorites.map(favorite => favorite.favoritedBy) : null;

    return favorites.map(async (favoritedBy) => {
      const url = `${APP_URL_FRONTEND}/articles/${comment.articleSlug}`;

      const inAppMessage = `Hello ${favoritedBy.firstName} ${favoritedBy.lastName}, ${
        author.firstName
      } ${author.lastName} commented on a article you favorite`;

      const emailMessage = `
        Hello ${favoritedBy.firstName} ${favoritedBy.lastName},
        <br>
        ${author.firstName} ${author.lastName} commented on a article you favorite
        <br>
        Please, click on the link bellow to read the comment
        <br><br><br>
        <a
          href='${APP_URL_FRONTEND}/articles/${comment.articleSlug}'
          style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'
        >
          Read Now
        </a>`;

      const data = {
        resource: 'articles',
        action: 'comment',
        user: favoritedBy,
        inAppMessage,
        emailMessage,
        url
      };

      await sendNotification(data);
    });
  } catch (error) {
    return { errors: error };
  }
};
