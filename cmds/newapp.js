var FormData = require('form-data');
var form = new FormData();
var fs = require('fs');

module.exports = (args) => {
    console.log("new app"+JSON.stringify(args))
    // form.append('icon', fs.createReadStream(args[i+1]));
    // form.append('name', args[i+1]);
}