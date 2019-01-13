const menus = {
    main: `
      appinstaller [command] <options>
  
      newapp ............. Create a new app
      newrelease ......... Upload a new version
      version ............ show package version of CLI
      help ............... show help menu for a command
      
      `,
  
    newapp: `
      appinstaller newapp

      Params to create your app

      --icon ........ extensions: .png | .jpg  *REQUIRED
      --name ........ 'Awesome App'  *REQUIRED
      --bundle ...... 'com.awesome.app'  *REQUIRED
      --desc ........ 'description telling how awesome is the app'  *REQUIRED
      --share ....... public | private .... if 'private' demands password  *REQUIRED
      --password .... Password to share your apps with a little bit security  *Default ''
      --listName .... Name of yout list @user *REQUIRED


      Returns
      -- appCode ... Value to be used when upload a new release
      `,

    newrelease: `
      appinstaller newrelease

      Params to upload your release

      --appcode ........ Identifier returned on NEWAPP
      --release ........ 'Build #1 or 1.0.1 or Any text to identify your release'
      --desc ........... 'description telling how awesome is the release'  *REQUIRED
      --env ............ Name of your environment ex.: 'CustomEnv'
      --apk ............ Path to your APK
      --ipa ............ Path to your IPA

      Returns
      -- link .......... Direct link to your app
      -- releaseCode ... Identifier of your release 
      `,  
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }