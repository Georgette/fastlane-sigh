# fastlane-sigh

[![NPM version](https://badge.fury.io/js/fastlane-sigh.png)](http://badge.fury.io/js/fastlane-sigh)
[![Build Status](https://travis-ci.org/Georgette/fastlane-sigh.svg?branch=master)](https://travis-ci.org/Georgette/fastlane-sigh)
[![Coverage Status](https://coveralls.io/repos/Georgette/fastlane-sigh/badge.png?branch=master)](https://coveralls.io/r/Georgette/fastlane-sigh?branch=master)

node wrapper for [Ruby Fastlane-Sigh CLI](https://github.com/fastlane/sigh)

## example

```javascript
var sigh = require('fastlane-sigh')

sigh({
    identifier : 'appIdentifier',
    user       : 'firstname@email.com',
    development: true,
    path       : '/Users/username/appname appname.xcodeproj'
}, (err, result) => {
    console.log(`STDOUT:\n${result.stdout}`)
    console.log(`STDERR:\n${result.stderr}`)

    if (err) {
        if (err.killed) console.error(`Terminated: ${err.signal}`)
        if (err.code) console.error(`Exit Code: ${err.code}`)
        console.error(err.message)
    }
})
```

## api


```javascript
var sigh = require('fastlane-sigh')

```
# sigh([options],[callback])

Accepts options as an object; see tables below for a list of both runtime options, and sigh options.

|Sigh Options |Example|Description|Command Executed|
|-------------|-------|-----------|----------------|
| identifier  | { identifier: bundleIndentifier } | sets bundle identifier  | -a {bundleIndentifier} |
| output      | { output: outputDirectoryPath } | generates the profile in a specific directory | -o {outputDirectoryPath} |                                                                                                                  | user (string)       |  { user:username } | sets username | -u {user} |                                                                                                                                                                           | profile:'adhoc' | { profile:'adhoc' } | generate an Ad Hoc profile instead of an App Store profile | --adhoc |
| profile:'development' | { profile:'development' } | generate an development profile instead of an App Store profile | --development |
| downloadAll (boolean) | { downloadAll:true } | downloads all provisioning profiles                                                                                                                                                                    | --download_all |
| force (boolean)       | { force:true }  | force the provisioning profile to be renewed regardless of its state. Provides a profile with the maximum lifetime and also adds all available devices to this profile. | --force |                              |repair (boolean) | { repair:true } | automatically repair all your existing provisioning profiles which are expired or just invalid | repair |


|Runtime Options |Example|Description|
|----------------|-------|-----------|
|timeout (number)| { timeout:0 } | specify when to exit execution in case of error |
|password (string)| {password:''} | app store password for signing|
|path (string)| {path:'/'} | path of directory where sigh executes|

## install

With [npm](https://npmjs.org) do:

```
npm install --save fastlane-sigh
```

## testing

`npm test`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
