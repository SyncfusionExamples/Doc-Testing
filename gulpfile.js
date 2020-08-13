var fs = require('fs');
var gulp = require('gulp');
var glob = require('glob');
var shelljs = require('shelljs');

var components;
var compPaths = glob.sync(`./src/**/`, { silent: true, ignore: [`./src/base/`, `./src/`, './src/common/', './src/getting-started/'] });

var branch = 'master';
var user = process.env.GIT_USER;
var token = process.env.GIT_TOKEN;
var user_mail = process.env.GIT_MAIL;

/**
 * Source shipping to gitlap
 */
gulp.task('clone', function (done) {
    console.log('---check----' + user_mail);
    console.log('---user---' + user);
    
    shelljs.exec(`git config --global user.email "${user_mail}"`);
    shelljs.exec(`git config --global user.name "${user}"`);   
    
//     for (var j = 0; j < cloneRepos.length; j++) {
        var gitPath = 'https://' + user + ':' + token + `@gitlab.syncfusion.com/essential-studio/ej2-common-razor-docs`;
        console.log('Clone has been started...!');
        var clone = shelljs.exec('git clone ' + gitPath + ' -b ' + branch + ' ' + `./gitlapRepo/ej2-common-razor-docs`, {
            silent: false
        });
        if (clone.code !== 0) {
            console.log(clone.stderr);
            done();
            return;
        } else {
            console.log('Clone has been completed...!');
            shelljs.cp('-rf', `./src/${cloneRepos[j]}/*`, `./gitlapRepo/ej2-${cloneRepos[j]}-razor-docs/src`);
            shelljs.cd(`./gitlapRepo/ej2-${cloneRepos[j]}-razor-docs`);
            shelljs.exec('git add .');
            shelljs.exec('git pull');
            shelljs.exec('git commit -m \"ci-skip(EJ2-000): source updation from github repo [ci skip]\" --no-verify');
            shelljs.exec('git push');
            shelljs.cd('../../')
        }
//     }
});
