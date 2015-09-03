// Visual regression test script for Sherlocked.
var ROOT = 'http://localhost:8679/content/';


function mobile(client, path) {
  return client
    .setViewportSize({width: 320, height: 960})
    .url(ROOT + (path || ''));
}

function desktop(client, path) {
  return client
    .setViewportSize({width: 1050, height: 2048})
    .url(ROOT + (path || ''));
}


require('sherlocked')

.investigate('Firefox OS Add-on Dashboard', function(client) {
  return desktop(client, 'addon/')
    .waitForExist('main', 60000);
})

.investigate('Firefox OS Add-on Submission Tools', function(client) {
  return desktop(client, 'addon/submit/')
    .waitForExist('main', 60000);
})

.investigate('Firefox OS Add-on Reviewer Tools', function(client) {
  return desktop(client, 'addon/review/')
    .waitForExist('main', 60000);
})

.begin([
  {
    browserName: 'firefox',
    platform: 'OS X 10.9'
  },
  {
    browserName: 'chrome',
    platform: 'OS X 10.9'
  },
  {
    browserName: 'safari',
    platform: 'OS X 10.9'
  }
]);
