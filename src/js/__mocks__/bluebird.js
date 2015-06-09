// https://github.com/facebook/jest/issues/90
'use strict';


jest.autoMockOff();
module.exports = require.requireActual('bluebird');
jest.autoMockOn();
