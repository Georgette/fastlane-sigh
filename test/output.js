var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var exec = sinon.stub().callsArgWith(2, null, 'stdout', 'stderr')
var child_process = { exec }
var sigh = proxyquire('..', { child_process })

test('sigh wrapper callback receives a result object', (t) => {
    exec.reset()
    sigh({ identifier: 'test.test.123' }, (_, result) => {
        t.equal(result.stdout, 'stdout', 'result object has stdout')
        t.equal(result.stderr, 'stderr', 'result object has stderr')
        t.end()
    })
})
