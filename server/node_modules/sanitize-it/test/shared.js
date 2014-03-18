var assert   = require('assert'),
    sanitize = require('../lib/sanitize');

exports.shouldSanitizeStrings = function() {
  it('should return undefined if the parameter was null, undefined, "null", or "undefined".', function() {
    assert.equal(undefined, sanitize.string(undefined));
    assert.equal(undefined, sanitize.string("undefined"));
    assert.equal(undefined, sanitize.string(null));
    assert.equal(undefined, sanitize.string("null"));
  });
}