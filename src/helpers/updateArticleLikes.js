import * as article from '../queries/articles';

export default async (req) => {
  const { articleSlug } = req.params;
  const findAllLikes = await article.getAllLikes({ status: 'like', articleSlug });
  const findAllDislikes = await article.getAllLikes({ status: 'dislike', articleSlug });
  await article.updateArticle(
    { likes: findAllLikes.length, dislikes: findAllDislikes.length },
    { slug: articleSlug }
  );
};
