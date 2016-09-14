var assert = require('assert');
var process = require('process');
var webdriver = require('selenium-webdriver');

var browserStackUser = process.env.BROWSERSTACK_USER;
var browserStackAccessKey = process.env.BROWSERSTACK_ACCESSKEY;

if (!browserStackUser)
  throw new Error('env BROWSERSTACK_USER is not defined');

if (!browserStackAccessKey)
  throw new Error('env BROWSERSTACK_ACCESSKEY is not defined');

var capabilities = {
  'browserName' : 'firefox', 
  'browserstack.user' : browserStackUser,
  'browserstack.key' : browserStackAccessKey,
  'browserstack.local' : 'true'
};

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('http://localhost:3000');
driver.findElement(webdriver.By.id('magic')).then(function (magicElement) {
    magicElement.getText().then(function(magicWords) {
        assert.equal(magicWords, 'The Magic Words are Squeamish Ossifrage');
    });
});

driver.quit();