export default (data) => {
  const message = {};
  message.subject = 'Authors Haven - Notification';
  message.html = `<p>${data.message}</p>`;
  return message;
};
