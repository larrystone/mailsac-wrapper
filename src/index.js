import axios from 'axios';

class MailBox {
  constructor(baseUrl = 'https://mailsac.com/api') {
    this.baseUrl = baseUrl;
    // TODO set mailsac configs for axios here
    this.currentDate = new Date().getTime();
  }

  async generateEmailAddress(prefix = 'prod') {
    try {
      const randomId = Math.random().toString(36).replace(/[^a-z]/g, '');
      const { data: { available, email } } = await axios.get(`${this.baseUrl}/addresses/${prefix}${randomId}@mailsac.com/availability`);

      if (available) {
        return email;
      }
      return await this.generateEmailAddress();
    } catch (err) {
      throw new Error('error validating email', err);
    }
  }

  async getInbox(emailAddress, filter, t = { wait: (time) => Promise.resolve(time) }) {
    let forgotPasswordEmail = null;
    let tries = 0;

    while (forgotPasswordEmail == null && tries < 12) {
      await t.wait(5000);

      const { data } = await axios.get(`${this.baseUrl}/addresses/${emailAddress}/messages`);
      forgotPasswordEmail = data.find(email => {
        return email.subject.includes(filter) && new Date(email.received).getTime() > this.currentDate;
      })

      if (data.length === 0) {
        tries++;
      }
    }

    return forgotPasswordEmail;
  }

  async getMessage(emailAddress, id) {
    try {
      const message = await axios.get(`${this.baseUrl}/dirty/${emailAddress}/${id}`);
      return message;
    } catch (err) {
      throw new Error('error fetching mail', err);
    }
  }

  async deleteMessage(emailAddress, id) {
    try {
      await axios.delete(`${this.baseUrl}/addresses/${emailAddress}/messages/${id}`);
    } catch (err) {
      throw new Error('error deleting mail', err);
    }
  }

  async deleteEmail(emailAddress) {
    throw new Error('Not implemented');
  }
}

export default MailBox;
