const menus = {
    main: `
      appinstaller [command] <options>
  
      newapp ............. Upload a new app
      version ............ show package version
      help ............... show help menu for a command
      
      `,
  
    newapp: `
      appinstaller newapp

      Params to upload your app

      --icon ........ extensions: .png | .jpg  *REQUIRED
      --name ........ 'Awesome App'  *REQUIRED
      --bundle ...... 'com.awesome.app'  *REQUIRED
      --desc ........ 'description telling how awesome is the app'  *REQUIRED
      --env ......... production | homologation | development  *REQUIRED
      --share ....... public | private .... if private demands password  *REQUIRED
      --password .... Password to share your apps with a little bit security  *Default ''
      --ipa ......... Path to your .ipa (Build iOS) *REQUIRED
      --apk ......... Path to your .apk (Build Android) *REQUIRED
      
      `,
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }