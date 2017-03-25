var config = require('../../nightwatch.conf.js');


module.exports = {
  'Test Author Search' : function (client) {
    client
      .url('http://localhost:8080/src/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'Bren')
      .waitForElementVisible('.author_search_det', 2000)
      .click('.author_search_det')
      .pause(1000)
      .assert.containsText('.prof-name', 'Brent Weeks')
      .end();
  }
};