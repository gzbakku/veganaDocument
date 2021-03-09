const builder = require("electron-builder");
const Platform = builder.Platform;


/*
-----------------------------------

checkout electron builder for build instructions and configurations

https://www.electron.build/

https://github.com/electron-userland/electron-builder

*/

build();

async function build(){

  await builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      "appId":"app.vegana.veganaDocument",
      "productName":"veganaDocument",
      "copyright":"vegana",
      "directories":{
        "output":"build/electron"
      },
      "win":{
        "target":"nsis",
        "icon":"assets/icon.png"
      },
      "linux":{
        "target":"AppImage"
      }
    }
  })
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    console.error(e);
    return false;
  });

}
