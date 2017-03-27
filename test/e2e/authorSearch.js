var config = require('../../nightwatch.conf.js');


module.exports = {
  'Test Author Search With Valid Input' : function (client) {
    client
      .url('https://umairali17.github.io/Adv-Front-End-Two/dist/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'Bren')
      .waitForElementVisible('.author_search_det', 2000)
      .click('.author_search_det')
      .pause(1000)
      .assert.containsText('.prof-name', 'Brent Weeks')
      .end();
  },

  'Test Author Search with Valid Input but no Author Stored' : function (client)
  {
    client
      .url('https://umairali17.github.io/Adv-Front-End-Two/dist/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'Haw')
      .assert.elementNotPresent('.author_search_det')
      .pause(1000)
      .end();
  },

  'Test Author Search with No Input' : function (client)
  {
    client
      .url('https://umairali17.github.io/Adv-Front-End-Two/dist/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', '') //Don't Enter a Value - Should not Get a Result
      .assert.elementNotPresent('.author_search_det')
      .pause(1000)
      .end();
  },

  'Test Author Search with Invalid Input' : function (client)
  {
    client
      .url('https://umairali17.github.io/Adv-Front-End-Two/dist/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', '45612')
      .assert.elementNotPresent('.author_search_det')
      .pause(1000)
      .end();
  }
};