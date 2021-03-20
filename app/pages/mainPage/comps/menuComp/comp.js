//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-menu';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

function build(){

  let main = engine.make.div({
    parent:compId,
    class:'page-main-comp-menu-main',
  });

    if(engine.get.platform("electron")){
      const electron = require("electron");
      electron.ipcRenderer.on("updateLocation",(_,l)=>{
        engine.data.reset("article_path",l,"local");
      });
      // electron.ipcRenderer.on("updateArticle",(_,d)=>{
      //   engine.data.reset("active_article",d,"local");
      //   engine.router.navigate.new.page(engine.get.pageModule("mainPage"));
      //   // make_path();
      // });
      electron.ipcRenderer.on("updateArticle",(_,data,path)=>{
        engine.data.reset("active_article",data,"local");
        engine.data.reset("article_path",path,"local");
        engine.router.navigate.new.page(engine.get.pageModule("mainPage"));
        electron.ipcRenderer.send("reopen_window");
      });
    }

    function make_path(){
      let article_path = engine.data.get("article_path","local");
      if(article_path){
        engine.make.div({
          parent:main,
          class:'page-main-comp-menu-main-path',
          text:article_path,
        });
      }
    }
    make_path();

    make_button('reset',()=>{
      engine.router.navigate.new.page(engine.get.pageModule("mainPage"));
    });

    make_button('new',()=>{
      engine.data.reset("active_article",window.active_article_template,"local");
      engine.data.delete("article_path","local");
      engine.router.navigate.new.page(engine.get.pageModule("mainPage"));
    });

    make_button('save',()=>{
      let article = engine.data.get("active_article","local");
      let path = engine.data.get("article_path","local");
      let electron = require("electron");
      if(path){
        electron.ipcRenderer.send("save",{
          data:article,
          path:path
        });
      } else {
        electron.ipcRenderer.send("saveAs",article);
      }
    },true);

    let path = engine.data.get("article_path","local");
    if(path){
      make_button('saveAs',()=>{
        let article = engine.data.get("active_article","local");
        let electron = require("electron");
        electron.ipcRenderer.send("saveAs",article);
        console.log("saveAs");
      },true);
    }

    make_button("open",()=>{
      let electron = require("electron");
      electron.ipcRenderer.send("open");
    });

    make_button('view',()=>{
      engine.router.navigate.new.page(engine.get.pageModule("viewPage"));
    });

    function make_button(value,func,checkElectron){
      engine.make.div({
        parent:main,
        class:'page-main-comp-menu-main-button',
        text:value,
        function:()=>{
          if(checkElectron){
            if(!engine.get.platform("electron")){
              return true;
            }
          }
          func();
        }
      });
    }

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
