const electron = require('electron');
const dialog = electron.dialog;
const app = electron.app;
const browser = electron.BrowserWindow;
const ipc = require('hadron-ipc');
const fs = require("fs");

let win;

function createWindow(){
  win = new browser({
    width: 800,
    height: 600,
    frame:true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false
    }
  });
  win.loadFile('electric.html');
  // win.webContents.openDevTools();
}

ipc.respondTo('open',async () => {
  const getLocation = await dialog.showOpenDialog(win,{
    title:'open vegana document',
    buttonLabel:'open vDoc',
    filters:[
      {name:'vDoc',extensions:['json']}
    ]
  });
  if(getLocation.canceled){return false;}

  let path = getLocation.filePaths[0];
  win.send("updateLocation",path);

  let data = fs.readFile(path,'utf-8',(e,d)=>{
    if(e){return false;}
    let parse = toJson(d);
    if(parse){
      win.send("updateArticle",parse);
    }
  });


});

function toJson(d){
  let get = false;
  try {
    let convert = JSON.parse(d);
    get = convert;
  }
  catch(e){
    console.log("!!! failed-parse-toJSON");
  }
  return get;
}

ipc.respondTo('save', (_,data) => {
  let asText = JSON.stringify(data.data,null,2);
  fs.writeFile(data.path,asText,(e)=>{
    if(e){return false;}
  });
});

ipc.respondTo('saveAs',async (_,data) => {
  const fetcher = await dialog.showSaveDialog(win,{
    title:'save vegana document',
    defaultPath:'vDoc.json'
  });
  if(fetcher.canceled){return false;}
  let path = fetcher.filePath;
  let asText = JSON.stringify(data,null,2);
  fs.writeFile(path,asText,(e)=>{
    if(e){return false;}
    win.send("updateLocation",path);
  });
});

app.on('ready', createWindow);
