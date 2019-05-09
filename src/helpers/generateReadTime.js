/*
Estimation of read time inspired by Nick Fisher
Link: https://blog.medium.com/read-time-and-you-bc2048ab620c
*/
const generateReadTime = (text) => {
  const MINUTES = 60;
  const WORD_PER_MINUTE = 265;
  const SECONDS_PER_IMAGE = 12;
  // number of images in the article
  const countImages = (text.match(/<img /g) || []).length;
  // image seconds
  let imageSeconds = 0;

  if (countImages === 1) {
    imageSeconds = SECONDS_PER_IMAGE; // estimation of read time when the content has one image
  }
  if (countImages === 2) {
    imageSeconds = SECONDS_PER_IMAGE + 10; // Adult takes 10 seconds to view the second image
  }
  if (countImages > 2) {
    imageSeconds = SECONDS_PER_IMAGE + 10 + [countImages * 2]; // every additional image take 2sec
  }
  const numberOfWords = text.split(' ').length; // calculate number of words
  // calculate seconds you can read the text
  const wordsSeconds = (numberOfWords * MINUTES) / WORD_PER_MINUTE;
  const totalSeconds = parseInt((wordsSeconds + imageSeconds) / MINUTES, 0);
  return totalSeconds;
};

export default generateReadTime;
