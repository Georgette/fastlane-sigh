var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var exec = sinon.stub().callsArgWith(2, null, '', '')
var child_process = { exec }
var sigh = proxyquire('..', { child_process })

test('accepts no options', (t) => {
    t.plan(1)
    exec.reset()
    sigh(() => {
        t.pass('function called')
    })
})

test('accepts no args', (t) => {
    t.plan(1)
    exec.reset()
    t.doesNotThrow(sigh)
})

test('accepts an identifier option', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ identifier: 'test.test.123' }, () => {
        t.ok(exec.calledWith('sigh -a test.test.123'), 'sigh called with -a')
    })
})

test('accepts a user option', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ user: 'gege' }, () => {
        t.ok(exec.calledWith('sigh -u gege'), 'sigh called with -u')
    })
})

test('accepts a profile option of adhoc', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ profile: 'adhoc' }, () => {
        t.ok(exec.calledWith('sigh --adhoc'), 'sigh called with --adhoc')
    })
})

test('accepts a profile option of directory', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ output: '/' }, () => {
        t.ok(exec.calledWith('sigh -o /'), 'sigh called with directory where provisioning file is placed')
    })
})

test('accepts an option of downloadAll', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ downloadAll: true }, () => {
        t.ok(exec.calledWith('sigh download_all'), 'sigh called with download_all as true')
    })
})

test('accepts an option of force', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ force: true }, () => {
        t.ok(exec.calledWith('sigh --force'), 'sigh called with force provision renewal flag')
    })
})

test('accepts a profile option of development', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ profile: 'development' }, () => {
        t.ok(exec.calledWith('sigh --development'), 'sigh called with --development')
    })
})

test('accepts profile repair option', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ repair: true }, () => {
        t.ok(exec.calledWithMatch('sigh repair'), 'sigh called with repair')
    })
})

test('accepts a runtime option of timeout', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ timeout: 1 }, () => {
        t.ok(exec.calledWithMatch('sigh', { timeout: 1 }), 'sigh called with timeout runtime option')
    })
})

test('accepts a runtime option of password', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ password: 'password' }, () => {
        t.ok(exec.calledWithMatch('sigh', { env: { FASTLANE_PASSWORD: 'password' } }), 'sigh called with password runtime option')
    })
})

test('accepts a runtime option of path', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ path: '/something' }, () => {
        t.ok(exec.calledWithMatch('sigh', { cwd: '/something' }), 'sigh called with runtime path')
    })
})