import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import sendgridMailTemplate from './sendgridMailTemplate';

dotenv.config();

export default async (to, from = 'noreply@authersheaven.com') => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return process.env.NODE_ENV === 'test'
    ? null
    : sgMail.send(sendgridMailTemplate.resetPassword(to, from));
};
