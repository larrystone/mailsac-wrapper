import expect from 'expect';
import moxios from 'moxios';
import MailBox from '../src';

const newMailBox = new MailBox();
const email = 'tssds@mailsac.com';

describe('Wrapper Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('generateEmailAddress', async () => {
    moxios.stubRequest(/\/addresses\/(\S+)\/availability/, {
      status: 200,
      response: { available: true, email }
    });
    expect(await newMailBox.generateEmailAddress()).toEqual(email);
  });

  it('getInbox', async () => {
    const inboxResponse = { subject: 'Welcome to mailsac', received: new Date() };

    moxios.stubRequest(/\/addresses\/(\S+)\/messages/, {
      status: 200,
      response: [inboxResponse]
    });


    expect(await newMailBox.getInbox(email, 'Welcome to mailsac')).toEqual(inboxResponse);
  });

  it('getMessage', async () => {
    moxios.stubRequest(/\/dirty\/(\S+)\/\S+/, {
      status: 200,
      response: '<h1>Welcome to Mail Sac...</h1>'
    });

    expect(await newMailBox.getMessage(email, 'qq65oGnZG9EAyc72petHG-0')).toEqual('<h1>Welcome to Mail Sac...</h1>');
  });
});