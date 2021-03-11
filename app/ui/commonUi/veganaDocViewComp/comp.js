//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-veganaDocViewComp';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build(data);                      //start build you can also start fetch here.

}

function build(article){

  const main = engine.make.div({
    parent:compId,
    class:'ui-cmmon-comp-veganaDocViewComp-main'
  });

  const rows = engine.make.div({
    parent:main,
    class:'ui-cmmon-comp-veganaDocViewComp-main-rows'
  });

  for(let rowId of article.template){
    make_row(rows,article.rows[rowId]);
  }

}

function make_row(parent,row){

  const main = engine.make.div({
    parent:parent,
    class:'ui-cmmon-comp-veganaDocViewComp-main-rows-row'
  });

  let draw = {all:{}};
  if(row.style){
    draw.all = row.style;
    draw.all.display = 'grid';
  }

  const containers = engine.make.div({
    parent:main,
    class:'ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers',
    draw:draw
  });

  for(let contId of row.template){
    make_container(containers,row.containers[contId]);
  }

}

const fields = require("./fields/index");

function make_container(parent,cont){

  // if(!cont.field){return;}

  const main = engine.make.div({
    parent:parent,
    class:'ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container'
  });

  if(cont.style){engine.set.style(main,cont.style);}

  // engine.make.div({
  //   parent:parent,
  //   text:cont.id
  // });

  fields.init(main,cont.field);

}

function make_field(){

}

module.exports = {init:init,ref:compRef,type:type}
