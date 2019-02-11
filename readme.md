# mailsac-wrapper
Node library for interacting with [Mailsac](https://mailsac.com/) mail platform - creates and checks temporary email mailboxes

Quick example
-------------
```
var MailBox = require('mailsac-wrapper');

// create a temporary email mailbox
var mailbox = new Mailbox();

// get the address
mailbox.generateEmailAddress()
  .then(function(addr) {
    console.log('email addr: ', + addr);
  });

// get the first message from inbox matching a filter string as subject
mailbox.getInbox(emailAddress, filterText, t)
  .then(function(foundEmail) {
    console.log('foundEmail :', foundEmail);
  });

// get the body of a mail message (exclude attachments)
mailbox.getMessage(emailAddress, messageId)
  .then(function(fullMessage) {
    console.log('full message :', fullMessage);
  });
```
