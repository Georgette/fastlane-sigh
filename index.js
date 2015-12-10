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
