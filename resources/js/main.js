// main
//

const APP_NAME = "mdVditor";

var fileOpened; // current opened file
var vditor;
var bChanged = false;

// init
function init() {
  // console.log("init");
  vditor = new Vditor("md", {
    theme: "classic",
    cdn: "",
    placeholder: "New file",
    toolbar: [
      {
        hotkey: "⌘n",
        name: "new",
        tipPosition: "s",
        tip: i18next.t("newFile"),
        className: "right",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clip-rule="evenodd"/></svg>',
        click() {
          clickNewFile();
        },
      },
      {
        hotkey: "⌘o",
        name: "open",
        tipPosition: "s",
        tip: i18next.t("openFile"),
        className: "right",
        icon: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z" clip-rule="evenodd"/></svg>',
        click() {
          clickOpenFile();
        },
      },
      {
        hotkey: "⌘s",
        name: "save",
        tipPosition: "s",
        tip: i18next.t("save"),
        className: "right",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd"/></svg>',
        click() {
          saveFile();
        },
      },
      {
        hotkey: "⇧⌘s",
        name: "save as",
        tipPosition: "s",
        tip: i18next.t("saveAs"),
        className: "right",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="2 2 20 20"><path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>',
        click() {
          saveAsFile();
        },
      },
      "|","undo","redo","|","emoji","headings","bold","italic","strike","link","|","list","ordered-list","check","outdent",
      "indent","|","quote","line","code","inline-code","insert-before","insert-after","|","table","edit-mode","|",
      {
        hotkey: "⌘,",
        name: "setup",
        tipPosition: "s",
        tip: i18next.t("setup"),
        className: "right",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle cx="12" cy="12" r="3.5"></circle></svg>',
        click() {
          showAboutDialog();
        },
      },
      {
        hotkey: "⌘f1",
        name: "about",
        tipPosition: "s",
        tip: i18next.t("about"),
        className: "right",
        icon: '<svg width="125px" height="125px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"><path d="M3 9.22843V14.7716C3 15.302 3.21071 15.8107 3.58579 16.1858L7.81421 20.4142C8.18929 20.7893 8.69799 21 9.22843 21H14.7716C15.302 21 15.8107 20.7893 16.1858 20.4142L20.4142 16.1858C20.7893 15.8107 21 15.302 21 14.7716V9.22843C21 8.69799 20.7893 8.18929 20.4142 7.81421L16.1858 3.58579C15.8107 3.21071 15.302 3 14.7716 3H9.22843C8.69799 3 8.18929 3.21071 7.81421 3.58579L3.58579 7.81421C3.21071 8.18929 3 8.69799 3 9.22843Z" stroke-linecap="round" stroke-linejoin="round" style="fill-opacity: 0; paint-order: fill; stroke-width: 2px; stroke: rgb(0, 0, 0);"></path><path d="M12 8V13" stroke="#323232" stroke-width="2" stroke-linecap="round"></path><path d="M12 16V15.9888" stroke="#323232" stroke-width="2" stroke-linecap="round"></path></svg>',
        click() {
          showAboutDialog();
        },
      },
    ],
    toolbarConfig: { pin: true },
    input: () => {
      bChanged = true;
      setWindowTitle();
    },
    after: () => {
      // console.log("after " + $("img").attr("src"));
      $("#md").css("height", "99%");
      fixToolsTip();

      if (NL_ARGS.length > 1 && NL_ARGS[1] != "") {
        openMdFile(NL_ARGS[1]);
      }
    },
    link: {
      click: (bom) => {
        // console.log(bom)
        Neutralino.os.open($(bom).text());
      },
    },
  });
}

$(function () {
  // autofit.init();
  loadResouse().then((res) => {
    // console.log(res);
    i18next.use(i18nextBrowserLanguageDetector).init({
      fallbackLng: "en",
      debug: false,
      resources: res,
      interpolation: {
        escapeValue: false,
      },
    });

    init();
  });

  $("#close-about").on("click", hideAboutDialog);
});

//===========================================
function fixToolsTip() {
  // 修复toolbar的tip弹出方向
  const toolButtons = $("div.vditor-toolbar button");
  toolButtons.removeClass(
    "vditor-tooltipped__ne vditor-tooltipped__nw vditor-tooltipped__n",
  );
  toolButtons.addClass("vditor-tooltipped__s");
}

function newFile() {
  fileOpened = "";
  bChanged = false;
  vditor.setValue("");
  setWindowTitle();
}

async function askSaveChanges() {
  if (bChanged) {
    var ok = await Neutralino.os.showMessageBox(
      "Your markdown file changed",
      "Do you want to save changes?",
      "YES_NO_CANCEL",
      "QUESTION",
    );

    if (ok === "YES") {
      saveFile();
    }
    return ok;
  }
  return "YES";
}

async function clickNewFile() {
  const ok = await askSaveChanges();
  if (ok !== "CANCEL") {
    newFile();
  }
}

// get file path
function getFilePath(filename) {
  if (filename) {
    paths = filename.split("/");
    paths.pop();
    return paths.join("/");
  } else {
    return undefined;
  }
}

// openFile open markdown file
function openFile() {
  Neutralino.os
    .showOpenDialog("Open Markdown file", {
      defaultPath: "",
      multiSelections: false,
      filters: [
        { name: "markdown", extensions: ["md"] },
        { name: "txt", extensions: ["txt"] },
      ],
    })
    .then((filename) => {
      if (filename.length == 0) {
        return;
      }
      console.log(filename);
      alert(filename);
      openMdFile(filename[0]);
      autolog.log(fileOpened + " file opened", "success", 2500);
    })
    .catch((error) => {
      console.error(i18next.t("errorReadFile"), error); // 处理失败的情况
    });
}

async function clickOpenFile() {
  const ok = await askSaveChanges();
  if (ok !== "CANCEL") {
    openFile();
  }
}

function openMdFile(name) {
  path = getFilePath(name);
  // console.log("file: "+name, "path: "+path)
  if (path == "") {
    path = NL_CWD;
  }
  // console.log("file: "+name, "path: "+path)

  Neutralino.filesystem
    .readFile(name)
    .then((contain) => {
      // use mount and unmount tech doesn't work
      // use setVDocRoot

      fileOpened = name;
      setWindowTitle();
      Neutralino.server
        .setVDocRoot(path)
        .then((resault) => {
          // console.log("setVDocRoot:", resault)
          vditor.setValue(contain);
        })
        .catch((error) => {
          console.error("setVDocRoot error:", error);
        });
    })
    .catch((error) => {
      console.error(i18next.t("errorReadFile"), error);
    });
}

function saveFile() {
  if (fileOpened !== undefined) {
    saveToFile(fileOpened);
    // autolog.log(fileOpened + "file saved", "success", 2500);
  } else {
    saveAsFile();
  }
}

function saveAsFile() {
  Neutralino.os
    .showSaveDialog("Save to file", {
      defaultPath: NL_CWD,
      filters: [
        { name: "markdown", extensions: ["md"] },
        { name: "txt", extensions: ["txt"] },
      ],
    })
    .then((filename) => {
      // console.log("save as file:", filename);
      fileOpened = filename;
      saveToFile(fileOpened);
    })
    .catch((error) => {
      console.error(i18next.t("errorReadFile"), error); // 处理失败的情况
    });
}

// openFile open markdown file
function saveToFile(name) {
  // console.log("saveToFile: ", name);
  Neutralino.filesystem
    .writeFile(name, vditor.getValue())
    .then(() => {
      setWindowTitle();
      autolog.log(name + " file saved", "success", 2500);
    })
    .catch((error) => {
      console.error(i18next.t("errorSaveFile"), error);
    });
}

function setWindowTitle() {
  let title;
  let filename = fileOpened ? fileOpened : "";
  if (filename) {
    title = APP_NAME + " - " + filename;
  } else {
    title = APP_NAME;
  }
  if (bChanged) {
    title = title + " *";
  }

  const saveButton = $('[data-type="save"]');
  if (bChanged && filename) saveButton.removeClass("vditor-menu--disabled");
  else saveButton.addClass("vditor-menu--disabled");

  Neutralino.window.setTitle(title).then(() => {});
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
async function onWindowClose() {
  const ok = await askSaveChanges();
  if (ok !== "CANCEL") {
    Neutralino.app.exit();
  }
}

// About Dialog Functionality
function showAboutDialog() {
  $("#about-dialog").addClass("active");
}

function hideAboutDialog() {
  $("#about-dialog").removeClass("active");
}

Neutralino.init();

Neutralino.events.on("windowClose", onWindowClose);
