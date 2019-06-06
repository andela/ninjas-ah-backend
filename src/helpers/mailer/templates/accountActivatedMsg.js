export default (data) => {
  const message = {};
  const appUrl = process.env.APP_URL;
  const url = `${appUrl}/api/v1/auth/login/`;
  message.subject = 'Welcome to Authors Haven';
  message.html = `Hello ${data.firstName} </br>,
  <p>We are glad to have you on board
  <br>
  Please, click on the link bellow to start enjoying our services!!!
  <br><br><br>
<a href='${url}' style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'>Login Here</a></p>`;
  return message;
};
