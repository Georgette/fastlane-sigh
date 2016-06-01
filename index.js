var exec = require('child_process').exec

module.exports = sigh

function sigh (options, cb) {

    if (typeof options === 'function') {
        cb = options
        options = {}
    }
    options = options || {}
    cb = cb || function () {}
    options.timeout = options.timeout !== undefined ? options.timeout : 0

    var cmd = 'sigh'
    if (options.identifier) cmd += ` -a ${options.identifier}`
    if (options.user) cmd += ` -u ${options.user}`
    if (options.output) cmd += ` -o ${options.output}`
    if (options.downloadAll) cmd += ' download_all'
    if (options.force) cmd += ' --force'
    if (options.repair) cmd += ' repair'
    if (options.skipInstall) cmd += ' --skip_install'
    if (options.skipCertificateVerification) cmd += ' --skip_certificate_verification'
    if (options.skipFetchProfiles) cmd += ' --skip_fetch_profiles'
    if (options.teamId) cmd += ` --team_id ${options.teamId}`
    if (options.teamName) cmd += ` --team_name ${options.teamName}`
    if (options.provisioningName) cmd += ` --provisioning_name ${options.provisioningName}`
    if (options.ignoreProfilesWithDifferentName) cmd += ' --ignore_profiles_with_different_name'
    if (options.certId) cmd += ` --cert_id ${options.certId}`
    if (options.certOwnerName) cmd += ` --cert_owner_name ${options.certOwnerName}`
    if (options.filename) cmd += ` --filename ${options.filename}`

    switch (options.profile) {
        case 'development' :
            cmd += ' --development'
            break
        case 'adhoc' :
            cmd += ' --adhoc'
            break
    }

    var runtimeOptions = { env: Object.assign({}, process.env) }

    if (options.timeout) runtimeOptions.timeout = options.timeout
    if (options.password) runtimeOptions.env.FASTLANE_PASSWORD = options.password
    if (options.path) runtimeOptions.cwd = options.path

    exec(cmd, runtimeOptions, (err, stdout, stderr) => {
        cb(err, { stdout, stderr })
    })
}
