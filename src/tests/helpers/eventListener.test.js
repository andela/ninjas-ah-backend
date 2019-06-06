/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import eventEmitter from '../../helpers/eventEmitter';

const { expect } = chai;

describe('Event listener', () => {
  it('should listen to an error event', () => {
    const event = eventEmitter.emit('error', new Error('event error'));
    expect(event).to.be.true;
  });
});
