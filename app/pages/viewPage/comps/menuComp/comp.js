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

    make_button('edit',()=>{
      engine.router.navigate.new.page(engine.get.pageModule("mainPage"));
    });

    function make_button(value,func){
      engine.make.div({
        parent:main,
        class:'page-main-comp-menu-main-button',
        text:value,
        function:()=>{
          func();
        }
      });
    }

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
