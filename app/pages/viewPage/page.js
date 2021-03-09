//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-view";
const pageName = 'viewPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

function build(){

  const viewComp = engine.ui.getComp("commonUi","veganaDocViewComp");
  const menuComp = require("./comps/menuComp/comp");
  menuComp.init(pageId);

  let article = engine.data.get("active_article","local");

  viewComp.init(pageId,article);

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:null
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
