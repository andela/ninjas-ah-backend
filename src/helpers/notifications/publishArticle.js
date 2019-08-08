import dotenv from 'dotenv';
import sendNotification from './sendNotification';
import { User } from '../../queries';

dotenv.config();

export default async (authorId, articleSlug) => {
  try {
    const { APP_URL_FRONTEND } = process.env;
    const author = await User.findOne({ id: authorId });
    let followers = await User.follow.getAll({ followed: authorId });
    followers = followers.length ? followers.map(follower => follower.get().follower) : [];

    return followers.map(async (follower) => {
      const url = `${APP_URL_FRONTEND}/articles/${articleSlug}`;

      const inAppMessage = `Hello ${follower.firstName} ${follower.lastName}, ${author.firstName} ${
        author.lastName
      } published a new article`;

      const emailMessage = `
        Hello ${follower.firstName} ${follower.lastName},
        <br>
        ${author.firstName} ${author.lastName} published a new article
        <br>
        Please, click on the link bellow to read this article
        <br><br><br>
        <a href='${url}' style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'>Read Now</a></p>`;

      const data = {
        resource: 'articles',
        action: 'publish',
        user: follower,
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
