const menus = {
    main: `
      appinstaller [command] <options>
  
      newapp ............. Upload a new app
      version ............ show package version
      help ............... show help menu for a command`,
  
    newapp: `
      appinstaller newapp <options>
  
      *** all options are required ***

      --icon ........ blablabla
      --name ........ blablabla
      --bundle ...... blablabla
      --desc ........ blablabla
      --env ......... blablabla
      --share ....... blablabla
      --password .... blablabla
      --ipa ......... blablabla
      --apk ......... blablabla`,
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }