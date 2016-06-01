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
    if (options.skip_install) cmd += ' --skip_install'
    if (options.skip_certificate_verification) cmd += ' --skip_certificate_verification'
    if (options.skip_fetch_profiles) cmd += ' --skip_fetch_profiles'
    if (options.team_id) cmd += ` --team_id ${options.team_id}`
    if (options.team_name) cmd += ` --team_name ${options.team_name}`
    if (options.provisioning_name) cmd += ` --provisioning_name ${options.provisioning_name}`
    if (options.ignore_profiles_with_different_name) cmd += ' --ignore_profiles_with_different_name'
    if (options.cert_id) cmd += ` --cert_id ${options.cert_id}`
    if (options.cert_owner_name) cmd += ` --cert_owner_name ${options.cert_owner_name}`
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
