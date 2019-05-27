import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import * as template from './templates';

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, EMAIL_SENDER, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const notifier = template[action](data);

  const message = {
    to,
    from: EMAIL_SENDER,
    subject: notifier.subject,
    text: 'Authors Haven',
    html: `<div style="background:#e5eeff;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background:#ffffff">
          <div style="background:#266cef;padding:10px;color:#ffffff;text-align:center;font-size:34px">
          Authors Haven - Ninjas
          </div>
          <div style="padding:20px;text-align:left;">
          ${notifier.html}
          </div>
          <br>
          <div style="padding:20px;text-align:left;">
          <b>Andela, Team @Ninjas - Cohort 4</b>
          </div>
          </div>
          <div style="padding:35px 10px;text-align:center;">
          Copyright, 2019<br>
            Andela, Team Ninjas
          </div>
          </div>`
  };
  return NODE_ENV === 'test' ? true : mailer.send(message);
};
