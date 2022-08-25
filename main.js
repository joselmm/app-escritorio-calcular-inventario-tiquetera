const {app, BrowserWindow} = require('electron');
const shell = require('electron').shell;
const path = require('path');

function createMainWindow(){
    var mainWindow = new BrowserWindow({
        with:"100%",
        height:"100%",
        minWidth:287,
        minHeight:660,
        icon:path.join(__dirname,'/www/ico.ico'),
        autoHideMenuBar: true, 
    });
    mainWindow.maximize();
    mainWindow.loadFile('./www/index.html');
    //configuracion para abrir enlaces en el navegador
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
      });
    }      

app.whenReady().then(createMainWindow);

app.on('window-all-closed',()=>{
    //para mac
    if(process.platform== 'darwin'){
        app.quit();
    }

    else if(process.platform== 'win32'){
        app.quit();
    }
})


app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length===0){
        createMainWindow();
    }
})


