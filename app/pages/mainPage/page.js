//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-main";
const pageName = 'mainPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  const menuComp = require("./comps/menuComp/comp");
  menuComp.init(pageId);

  if(false){
    engine.data.delete("active_article","local");
  }

  engine.add.function("reset",()=>{
    engine.data.delete("active_article","local");
  });

  let sample_article = {
    template:["tyu"],
    rows:{
      tyu:{
        id:'tyu',
        template:["qwe",'asd','zxc'],
        containers:{
          "qwe":{
            id:'qwe',
            field:null
          },//container
          "asd":{
            id:'asd',
            field:null
          },//container
          "zxc":{
            id:'zxc',
            field:null
          }//container
        }//containers
      }//row
    }//rows
  };

  let base_article = {
    template:[],
    rows:{}
  };

  window.active_article_template = base_article;

  let article = engine.data.get("active_article","local") || active_article_template;

  if(!engine.data.get("active_article","local")){
    engine.data.reset("active_article",active_article_template,"local");
  }

  let data = {};
  const controller = {
    functions:{
      data:{
        update:(d)=>{data = d;},
        get:()=>{return data;},
        item:{
          get:(k)=>{return data[k];},
          add:(k,v)=>{data[k] = v;},
          remove:(k)=>{delete data[k];},
        }
      },
      get:()=>{return article;},
      draw:()=>{
        make_editor();
      },
      update:(a)=>{
        article = a;
        engine.data.reset("active_article",a,"local");
      },
      make_editor:require("./edit"),
      make_menu:require("./menu"),
      field:require("./field")
    }
  };

  const main = engine.make.div({
    parent:pageId,
    class:'page-main-master'
  });

  let editor;
  function draw_editor(){
    if(editor){engine.view.remove(editor);}
    editor = engine.make.div({
      parent:pageId,
      class:'page-main-editor'
    });
    make_editor(editor,controller);
  }
  draw_editor();

}

function make_editor(parent,controller){

  const main = engine.make.div({
    parent:parent,
    class:'page-main-editor-main'
  });

    const article = controller.functions.get();

    const messageCont = engine.make.div({
      parent:main,
      class:'page-main-editor-main-messageCont'
    });

    const rows = engine.make.div({
      parent:main,
      class:'page-main-editor-main-rows'
    });

    controller.functions.data.item.add("rowsCont",rows);

    controller.functions.make_row = (anchor_row_id,position)=>{
      let article = controller.functions.get();
      let row = article.rows[controller.functions.data.item.get("movingRowId")];
      return make_row(rows,row,controller,anchor_row_id,position);
    }

    for(let id of article.template){
      make_row(rows,article.rows[id],controller,null,null,manage_article_message);
    }

    let message;
    function make_message(m){
      message = engine.make.div({
        parent:messageCont,
        class:'page-main-editor-main-message',
        text:m
      });
    }
    function manage_article_message(){
      if(message){
        engine.view.remove(message);
        message = false;
        return;
      }
      let article = controller.functions.get();
      if(article.template.length === 0){
        make_message("please add some rows");
      }
    }
    if(article.template.length === 0){
      make_message("please add some rows");
    }

    const newRow = engine.make.div({
      parent:main,
      class:'page-main-editor-main-new_row',
      text:'+ new row',
      function:()=>{
        manage_article_message();
        let rowId = engine.uniqid();
        let row = {
          id:rowId,
          template:[],
          containers:{}
        };
        article.rows[rowId] = row;
        article.template.push(rowId);
        controller.functions.update(article);
        make_row(rows,row,controller,null,null,manage_article_message);
      }
    });

}

function get_mouse_position(){
  return new Promise((resolve,reject)=>{
    document.addEventListener("mousemove",(e)=>{
      document.onmousemove = null;
      resolve({
        y:e.pageY
      });
    })
  });

}

function make_row(parent,row,controller,anchor_row_id,position,manage_article_message){

  let rowsContElement = engine.get.element(controller.functions.data.item.get("rowsCont"));

  let made_anchor;
  let row_cont_controller = {
    parent:parent,
    class:'card page-main-editor-main-rows-row',
    events:[
      {event:'pointerenter',function:()=>{
        if(!controller.functions.data.item.get("movingRow")){return false;}//should move
        if(controller.functions.data.item.get("movingRowId") === row.id){return false;}//check if i am moving
        if(controller.functions.data.item.get("lastMadeBy") === row.id){return true;}//check if i made the last row
        let rowIMade = controller.functions.make_row(row_cont,"before");//make new cont
        //remove last row cont if made
        let lastMade = controller.functions.data.item.get("lastMovingRowContId");
        if(lastMade){engine.view.remove(lastMade);}
        controller.functions.data.item.add("lastMadePosition","before");//this is used to move the row in article
        controller.functions.data.item.add("lastMadeBy",row.id);//this will be used to move the row in article
        controller.functions.data.item.add("lastMovingRowContId",rowIMade);//this is used to remove row cont by next element
      }},
      {event:'pointerleave',function:async ()=>{
        if(!controller.functions.data.item.get("movingRow")){return false;} //shoudl move
        if(controller.functions.data.item.get("movingRowId") === row.id){return false;} //check if i am moving
        let article = controller.functions.get();
        let template = article.template;
        if(row.id !== template[template.length-1]){return false;} //check if i am last
        let element_position = engine.get.elementPosition(row_cont);
        let mouse_position = await get_mouse_position();
        if(mouse_position.y < element_position.bottom){return false;}//check if mouse is below the last row cont
        let rowIMade = controller.functions.make_row(row_cont,"after");//make new row cont after last cont
        let lastMade = controller.functions.data.item.get("lastMovingRowContId");
        if(lastMade){engine.view.remove(lastMade);}
        controller.functions.data.item.add("lastMadePosition","after");
        controller.functions.data.item.add("lastMadeBy",row.id);
        controller.functions.data.item.add("lastMovingRowContId",rowIMade);
      }}
    ]
  };

  if(anchor_row_id){
    row_cont_controller.parent = anchor_row_id;
    if(position === "after"){
      row_cont_controller.position = 'afterend';
    } else {
      row_cont_controller.position = 'beforebegin';
    }
  }

  const row_cont = engine.make.div(row_cont_controller);

    const menu = controller.functions.make_menu({
      parent:row_cont,
      buttons:[
        {type:'add',function:()=>{
          let contId = engine.uniqid();
          let article = controller.functions.get();
          let cont = {
            id:contId,
            field:null
          };
          article.rows[row.id].containers[contId] = cont;
          article.rows[row.id].template.push(contId);
          controller.functions.update(article);
          manage_row_message();
          make_container(containers,cont,controller,row.id,manage_row_message,reset_containers);
        }},
        {type:'move',
          onDown:()=>{
            controller.functions.data.item.add("movingRow",true);
            controller.functions.data.item.add("movingRowId",row.id);
            controller.functions.data.item.add("lastMovingRowContId",row_cont);
            // engine.view.remove(row_cont);
            document.onpointerup = ()=>{
              controller.functions.data.item.add("movingRow",false);
              document.onpointerup = null;
              let toMove = controller.functions.data.item.get("movingRowId");
              let movedBy = controller.functions.data.item.get("lastMadeBy");
              let movePosition = controller.functions.data.item.get("lastMadePosition");
              let article = controller.functions.get();
              if(movePosition === "after"){
                let toMoveIndex = article.template.indexOf(toMove);
                article.template.splice(toMoveIndex,1);
                article.template.push(toMove);
              }
              if(movePosition === "before"){
                let toMoveIndex = article.template.indexOf(toMove);
                let toReplaceIndex = article.template.indexOf(movedBy);
                article.template.splice(toMoveIndex,1);
                article.template.splice(toReplaceIndex,1,toMove,movedBy);
              }
              controller.functions.update(article);
            }//onpointerup
          }//on down
        },
        {type:'delete',function:()=>{
          let article = controller.functions.get();
          let template_index = article.template.indexOf(row.id);
          article.template.splice(template_index,1);
          delete article.rows[row.id];
          controller.functions.update(article);
          engine.view.remove(row_cont);
          manage_article_message();
        }},
      ]
    });

    let containers,message;
    function make_containers_div(){

      containers = engine.make.div({
        parent:row_cont,
        class:'page-main-editor-main-rows-row-containers'
      });

      let article = controller.functions.get();

      let template = article.rows[row.id].template;
      let containers_local = article.rows[row.id].containers;
      for(let id of template){
        make_container(containers,containers_local[id],controller,row.id,manage_row_message,reset_containers);
      }

      if(row.template.length === 0){{
        make_message("please add some containers");
      }}

    }

    make_containers_div();

    function make_message(m){
      message = engine.make.div({
        parent:row_cont,
        class:'page-main-editor-main-rows-row-message',
        text:m
      });
    }

    function reset_containers(){
      engine.view.remove(containers);
      make_containers_div();
    }

    function manage_row_message(){
      if(message){
        engine.view.remove(message);
        message = false;
        return;
      }
      let article = controller.functions.get();
      if(article.rows[row.id].template.length === 0){
        make_message("please add some containers");
      }
    }

    return row_cont;

}

function make_container(parent,container,controller,rowId,manage_row_message,reset_containers){

  const container_cont = engine.make.div({
    parent:parent,
    class:'card page-main-editor-main-rows-row-containers-container'
  });

  if(container.style){engine.set.style(container_cont,container.style);}

    const menu = controller.functions.make_menu({
      parent:container_cont,
      buttons:[
        {type:'delete',function:()=>{
          let article = controller.functions.get();
          delete article.rows[rowId].containers[container.id];
          let index = article.rows[rowId].template.indexOf(container.id);
          article.rows[rowId].template.splice(index,1);
          controller.functions.update(article);
          engine.view.remove(container_cont);
          manage_row_message();
        }},
        {type:'edit',function:()=>{
          controller.functions.make_editor({
            style:container.style,
            rowId:rowId,
            fields:['width','min-width','max-width','height','min-height','max-height'],
            contId:container.id,
            parent:container_cont,
            onUpdate:(data)=>{
              engine.set.style(container_cont,data);
              let article = controller.functions.get();
              article.rows[rowId].containers[container.id].style = data;
              controller.functions.update(article);
            }
          });
        }},
        {type:'left',function:(button)=>{
          let article = controller.functions.get();
          let indexOfContainer = article.rows[rowId].template.indexOf(container.id);
          if(indexOfContainer === 0){return true;}
          let previous = article.rows[rowId].template[indexOfContainer-1];
          let current = article.rows[rowId].template[indexOfContainer];
          article.rows[rowId].template.splice(indexOfContainer-1,2,current,previous);
          controller.functions.update(article);
          reset_containers();
        }}
      ]
    });

    if(!container.field){
      controller.functions.field.new({
        parent:container_cont,
        rowId:rowId,
        contId:container.id,
      },controller,(cont)=>{
        engine.view.remove(container_cont);
        make_container(parent,cont,controller,rowId,manage_row_message,reset_containers);
      });
    } else {
      controller.functions.field.init({
        parent:container_cont,
        rowId:rowId,
        contId:container.id,
        field:container.field
      },controller);
    }

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{}
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
