import * as articleLike from './likes';
import * as article from '.';

const updateArticle = async (req) => {
  const { articleSlug } = req.params;
  const findAllLikes = await articleLike.getAllLikes({ status: 'like', articleSlug });
  const findAllDislikes = await articleLike.getAllLikes({ status: 'dislike', articleSlug });
  await article.update(
    { likes: findAllLikes.length, dislikes: findAllDislikes.length },
    req.params.articleSlug
  );
};
export default updateArticle;
