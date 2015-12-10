var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var error = new Error('boom')
var exec = sinon.stub().callsArgWith(2, error, '', '')
var child_process = { exec }
var sigh = proxyquire('..', { child_process })

test('sigh wrapper callback receives exec errors', (t) => {
    exec.reset()
    sigh({ identifier: 'test.test.123' }, (err) => {
        t.equal(err, error, 'got error')
        t.end()
    })
})
