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

test('accepts an option of skipInstall', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ skipInstall: true }, () => {
        t.ok(exec.calledWith('sigh --skip_install'), 'sigh called with --skip_install')
    })
})

test('accepts an option of skipCertificateVerification', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ skipCertificateVerification: true }, () => {
        t.ok(exec.calledWith('sigh --skip_certificate_verification'), 'sigh called with --skip_certificate_verification')
    })
})

test('accepts an option of skipFetchProfiles', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ skipFetchProfiles: true }, () => {
        t.ok(exec.calledWith('sigh --skip_fetch_profiles'), 'sigh called with --skip_fetch_profiles')
    })
})

test('accepts an option of teamId', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ teamId: 1 }, () => {
        t.ok(exec.calledWith('sigh --team_id 1'), 'sigh called with --team_id')
    })
})

test('accepts an option of teamName', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ teamName: 'a' }, () => {
        t.ok(exec.calledWith('sigh --team_name a'), 'sigh called with --team_name')
    })
})

test('accepts an option of provisioningName', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ provisioningName: 'a' }, () => {
        t.ok(exec.calledWith('sigh --provisioning_name a'), 'sigh called with --provisioning_name')
    })
})

test('accepts an option of ignoreProfilesWithDifferentName', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ ignoreProfilesWithDifferentName: true }, () => {
        t.ok(exec.calledWith('sigh --ignore_profiles_with_different_name'), 'sigh called with --ignore_profiles_with_different_name')
    })
})

test('accepts an option of certId', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ certId: 1 }, () => {
        t.ok(exec.calledWith('sigh --cert_id 1'), 'sigh called with --cert_id')
    })
})

test('accepts an option of certOwnerName', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ certOwnerName: 'a' }, () => {
        t.ok(exec.calledWith('sigh --cert_owner_name a'), 'sigh called with --cert_owner_name')
    })
})

test('accepts an option of filename', (t) => {
    t.plan(1)
    exec.reset()
    sigh({ filename: 'a.mobileprovision' }, () => {
        t.ok(exec.calledWith('sigh --filename a.mobileprovision'), 'sigh called with --filename')
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
