/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sendgridMailTemplate from '../../helpers/sendgridMailTemplate';

const { expect } = chai;

describe('sendgridMailTemplate', () => {
  it('should return an object containing an email message to reset password', () => {
    const emailTemplate = sendgridMailTemplate.resetPassword('aaa@gmail.com', 'bbb@gmail.com');
    expect(Object.keys(emailTemplate).length).to.be.above(0);
  });
});
