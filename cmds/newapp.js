var fs = require('fs');
var request = require('request')

const ora = require('ora')

module.exports = async (args) => {

    const spinner = ora().start()
    try{
        
        var objInfos = {
            icon: fs.createReadStream(args.icon),
            nome: args.name,
            bundle: args.bundle,
            desc: args.desc,
            listName: args.listName,
            env: args.env,
            share: args.share,
            password: args.password ? args.password : ''
        };


        var objAndroid = {
            android: args.apk ? fs.createReadStream(args.apk) : null
        }

        var objiOS = {
            ios: args.ipa ? fs.createReadStream(args.ipa) : null
        }

        var formData;

        if(args.apk && args.ipa){
            console.log("Apps to upload - iOS e Android");
            formData = Object.assign(objInfos, objAndroid, objiOS)
        }

        if(args.apk && !args.ipa){
            console.log("Apps to upload - Only Android");
            formData = Object.assign(objInfos, objAndroid)
        }

        if(args.ipa && !args.apk){
            console.log("Apps to upload - Only iOS");
            formData = Object.assign(objInfos, objiOS)
        }

        request.post({url:'https://api.appinstaller.com.br/newapp', formData: formData}, function(err, httpResponse, body) {
            if (err) {
                spinner.stop()
                return console.error('Upload failed:', err);
            }else{
                console.log('Upload successful!');
                spinner.stop()
            }
        });
        
    }catch(err){
        spinner.stop()
        console.log(err)
    }
}