import slugify from 'slug';
import uniqid from 'uniqid';

const generateSlug = (title) => {
  if (title.length > 70) title = title.substring(0, 70);
  // generate slug;
  return `${slugify(title, {
    lower: true,
    remove: /[.]/g,
    symbols: false
  })}-${uniqid.process()}`;
};

export default generateSlug;
