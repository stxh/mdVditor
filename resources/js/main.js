// main
//
// import { marked } from '../../node_modules/marked';

const { Menu, MenuItem } = NeutralinoMenuBar;

const menu = [{
    label: "&File",
    submenu: [{
        label: "Open File",
        click: openFile
    }, {
        label: "Resent",
        submenu: [{
            label: "Option 1",
            click: () => {
                console.log("Option 1 clicked");
            }
        }, {
            label: "Option 2",
            click: () => {
                console.log("Option 2 clicked");
            }
        }],
        accelerator: "F2"
    }, {
        label: "Quit",
        click: () => { onWindowClose() }
    }]
}, {
    label: "&Option",
    submenu: [{
        label: "Mode",
        click: () => {  }
    }, {
        label: "Setting",
        click: () => {  }
    }, {
        label: "About",
        click: () => { Neutralino.os.showMessageBox("Version information",
            `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`)}
    }]
}];

var fileOpened; // current opened file

$(function() {

    const myMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(myMenu);

    const vditor = new Vditor("md", {
        theme: "classic",
        toolbar: [
          {
            hotkey: '^n',
            name: 'new',
            tipPosition: 's',
            tip: $i18n.t('new'),
            className: 'right',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clip-rule="evenodd"/></svg>',
            click () { clickNewFile(vditor) },
          },
          {
            hotkey: '^o',
            name: 'open',
            tipPosition: 's',
            tip: $i18n.t('open'),
            className: 'right',
            icon: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z" clip-rule="evenodd"/></svg>',
            click () { clickOpenFile(vditor) },
          },
          {
            hotkey: '^s',
            name: 'save',
            tipPosition: 's',
            tip: $i18n.t('save'),
            className: 'right',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd"/></svg>',
            click () { clickSaveFile(vditor) },
          },
          {
            hotkey: '^⇧s',
            name: 'save as',
            tipPosition: 's',
            tip: $i18n.t('saveAs'),
            className: 'right',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>',
            click () { clickSaveAsFile(vditor) },
          },
          "|","undo","redo","|","emoji","headings","bold","italic","strike","link","|","list","ordered-list","check","outdent","indent",
          "|","quote","line","code","inline-code","insert-before","insert-after","|","table","edit-mode",
          "|",
          {
            hotkey: '^s',
            name: 'setup',
            tipPosition: 's',
            tip: $i18n.t('setup'),
            className: 'right',
            icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"></path></g></svg>',
            click () {() => (showModal = true)},
          },
          {
            hotkey: '^a',
            name: 'about',
            tipPosition: 's',
            tip: $i18n.t('about'),
            className: 'right',
            icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"></path></g></svg>',
            click () {() => (showModal = true)},
          },
      ],
      toolbarConfig: {pin: true},
      after:(() => {initMd(vditor)}),
    })

    // console.log("args->", NL_ARGS)
    if (NL_ARGS.length > 1) {
        fileOpened = NL_ARGS[1]
        setTitle(fileOpened)
        Neutralino.filesystem.readFile(fileOpened)
            .then((contain) => {
                // $('#md').html(marked.parse(contain))
                vditor.setValue(contain)
            })
            .catch((error) => {
                console.error("读取文件出错:", error)
            })
    }
    
});

// openFile open markdown file
function openFile() {
    Neutralino.os.showOpenDialog('Open Markdown file', {
        defaultPath: '',
        filters: [
          {name: 'markdown', extensions: ['md']},
          {name: 'txt', extensions: ['txt']}
        ]
      }) .then((filename) => {
        // console.log("open file:", filename)
        fileOpened = filename[0]
        setTitle(fileOpened)
        Neutralino.filesystem.readFile(fileOpened)
            .then((contain) => {
                $('#md').html(marked.parse(contain))
            })
            .catch((error) => {
                console.error("读取文件出错:", error)
            })
      })
      .catch((error) => {
        console.error("读取文件出错:", error); // 处理失败的情况
      });
}

function setTitle(fileOpened) {
    let title
    if (fileOpened) {
        title = "mdViewer - " + fileOpened
    } else {
        title = "mdViewer"
    }
    Neutralino.window.setTitle(title).then(()=>{})
}

function showInfo() {
    document.getElementById('info').innerHTML = `
        ${NL_APPID} is running on port ${NL_PORT} inside ${NL_OS}
        <br/><br/>
        <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
        `;
}

// let config = await Neutralino.app.getConfig();
// console.log('URL = ', config.url);

/*
    Function to set up a system tray menu with options specific to the window mode.
    This function checks if the application is running in window mode, and if so,
    it defines the tray menu items and sets up the tray accordingly.
*/
function setTray() {
    // Tray menu is only available in window mode
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }

    // Define tray menu items
    let tray = {
        icon: "/resources/icons/trayIcon.png",
        menuItems: [
            {id: "VERSION", text: "Get version"},
            {id: "OPEN", text: "Open File"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };

    // Set the tray menu
    Neutralino.os.setTray(tray);
}

/*
    Function to handle click events on the tray menu items.
    This function performs different actions based on the clicked item's ID,
    such as displaying version information or exiting the application.
*/
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "VERSION":
            // Display version information
            Neutralino.os.showMessageBox("Version information",
                `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
            break;
        case "OPEN":
            openFile()
            break;
        case "QUIT":
            // Exit the application
            onWindowClose();
            break;
    }
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
function onWindowClose() {
    Neutralino.app.exit();
}

// Conditional initialization: Set up system tray if not running on macOS
if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}

Neutralino.init()

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

