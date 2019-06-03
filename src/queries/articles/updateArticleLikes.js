import * as like from './likes';
import * as article from '.';

const updateArticleLikes = async (req) => {
  const { articleSlug } = req.params;

  const findAllLikes = await like.getAllLikes({ status: 'like', articleSlug });
  const findAllDislikes = await like.getAllLikes({ status: 'dislike', articleSlug });

  await article.update(
    { likes: findAllLikes.length, dislikes: findAllDislikes.length },
    req.params.articleSlug
  );
};
export default updateArticleLikes;
