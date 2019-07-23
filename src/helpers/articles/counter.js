import { Article } from '../../queries';

export default async (status) => {
  const counter = await Article.getArticlesCounter(status);
  console.log('@#$', counter.article);
  return 4;
};
