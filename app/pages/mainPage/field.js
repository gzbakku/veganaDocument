
const fields = require("./fields/index");

module.exports = {
  init:init,
  new:new_field
};

function init(data,controller){

  const main = engine.make.div({
    parent:data.parent,
    class:'page-main-editor-main-rows-row-containers-container-field'
  });

  data.parent = main;

  if(data.field.type === "code"){
    fields.code(data,controller);
  } else if(data.field.type === "heading"){
    fields.heading(data,controller);
  } else if(data.field.type === "image"){
    fields.image(data,controller);
  } else if(data.field.type === "list"){
    fields.list(data,controller);
  } else if(data.field.type === "paragraph"){
    fields.paragraph(data,controller);
  } else if(data.field.type === "quote"){
    fields.quote(data,controller);
  }

}

function new_field(data,controller,remake){

  const main = engine.make.div({
    parent:data.parent,
    class:'page-main-editor-main-rows-row-containers-container-field_new'
  });

  for(let type of [
    'paragraph','heading','image','code'//,'quote','list'
  ]){
    engine.make.div({
      parent:main,
      class:'page-main-editor-main-rows-row-containers-container-field_new-button',
      text:type,
      function:()=>{
        let article = controller.functions.get();
        article.rows[data.rowId].containers[data.contId].field = {type:type,data:{}};
        remake(article.rows[data.rowId].containers[data.contId]);
        controller.functions.update(article);
      }
    });
  }

}
