var fs = require('fs');
var request = require('request')

const ora = require('ora')

module.exports = async (args) => {

    var neededKeys = ["icon", "name", "bundle", "desc", "listName", "share"]

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
            
            var formData = {
                icon: fs.createReadStream(args.icon),
                nome: args.name,
                bundle: args.bundle,
                desc: args.desc,
                listName: args.listName,
                share: args.share,
                password: args.password ? args.password : ''
            };

            request.post({url:'https://api.appinstaller.com.br/v2/newapp', formData: formData}, function(err, httpResponse, body) {
                if (err) {
                    spinner.stop()
                    return console.error('Upload failed:', err);
                }else{
                    console.log('App created!');
                    console.log(httpResponse.body)
                    spinner.stop()
                }
            });
            
        }catch(err){
            spinner.stop()
            console.log(err)
        }
    }
}