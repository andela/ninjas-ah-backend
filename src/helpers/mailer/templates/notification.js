export default (data) => {
  const message = {};
  message.subject = 'Authors Haven - Notification';
  message.html = `<p id="notificationMessage">${data.message}</p>`;
  return message;
};
