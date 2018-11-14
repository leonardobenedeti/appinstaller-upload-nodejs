var fs = require('fs');
var request = require('request')

const ora = require('ora')

module.exports = async (args) => {

    const spinner = ora().start()
    try{
        
        var formData = {
            icon: fs.createReadStream(args.icon),
            nome: args.name,
            bundle: args.bundle,
            desc: args.desc,
            android: fs.createReadStream(args.apk),
            ios: fs.createReadStream(args.ipa),
            listName: args.listName,
            env: args.env,
            share: args.env,
            password: args.password ? args.password : ''
        };

        request.post({url:'https://api.appinstaller.com.br/newapp', formData: formData}, function(err, httpResponse, body) {
            if (err) {
                spinner.stop()
                return console.error('upload failed:', err);
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