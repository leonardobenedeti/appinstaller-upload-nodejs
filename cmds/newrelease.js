var fs = require('fs');
var request = require('request')

const ora = require('ora')

module.exports = async (args) => {

    var neededKeys = ["appcode", "release", "desc", "env"]

    var requestKeys = [];

    neededKeys.forEach((key)=>{
        if(Object.keys(args).indexOf(key)== -1){
            requestKeys.push(key);
        }
    })
    
    if(requestKeys.length>0){
        return console.error("*** ERROR - This parameters are needed: " + requestKeys)
    }else{
        const spinner = ora().start()
        try{
            
            var objInfos = {
                appcode: `${args.appcode}`,
                version: args.release,
                desc: args.desc,
                env: args.env
            };

            var objAndroid = {
                android: args.apk ? fs.createReadStream(args.apk) : null
            }

            var objiOS = {
                ios: args.ipa ? fs.createReadStream(args.ipa) : null
            }

            var formData;

            if(args.apk && args.ipa){
                console.log("### INFO: Apps to upload - iOS and Android");
                formData = Object.assign(objInfos, objAndroid, objiOS)
            }

            if(args.apk && !args.ipa){
                console.log("### WARNING: Apps to upload - Only Android");
                formData = Object.assign(objInfos, objAndroid)
            }

            if(args.ipa && !args.apk){
                console.log("### WARNING: Apps to upload - Only iOS");
                formData = Object.assign(objInfos, objiOS)
            }

            request.post({url:'https://api.appinstaller.com.br/v2/newrelease', formData: formData}, function(err, httpResponse, body) {
                if (err) {
                    spinner.stop()
                    return console.error('*** ERROR: Upload failed:', err);
                }else{
                    console.log('### INFO: Upload successful!');
                    console.log(httpResponse.body)
                    spinner.stop()
                }
            });
            
        }catch(err){
            spinner.stop()
            console.log("*** ERROR: "+err)
        }
    }
}