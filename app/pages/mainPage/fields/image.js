

module.exports = make_image_field;

function make_image_field(data,controller){

  let article = controller.functions.get(),value = {};
  if(
    article.rows[data.rowId].containers[data.contId].field.data
  ){
    value = article.rows[data.rowId].containers[data.contId].field.data;
  }

  const main = engine.make.div({
    parent:data.parent,
    class:'page-main-editor-main-rows-row-containers-container-image'
  });

  function update_image_value(k,v){
    let article = controller.functions.get();
    if(!article.rows[data.rowId].containers[data.contId].field.data){
      article.rows[data.rowId].containers[data.contId].field.data = {};
    }
    article.rows[data.rowId].containers[data.contId].field.data[k] = v;
    controller.functions.update(article);
  }

  let imageCont = engine.make.div({
    parent:main,
    class:'page-main-editor-main-rows-row-containers-container-image-img_cont'
  });

  let messageCont = engine.make.div({
    parent:main,
    class:'page-main-editor-main-rows-row-containers-container-image-message'
  });
  let message;
  function make_message(m){
    if(message){engine.view.remove(message);}
    message = engine.make.div({
      parent:messageCont,
      class:'page-main-editor-main-rows-row-containers-container-image-message-text',
      text:m
    });
  }
  function reset_message(){
    if(message){engine.view.remove(message);message = false;}
  }

  if(!value.location){
    make_message("add a location");
  } else {
    engine.make.image({
      parent:imageCont,
      class:'page-main-editor-main-rows-row-containers-container-image-img_cont-img',
      type:'url',
      location:'http://localhost:5566/' + value.location,
      draw:{
        all:{
          height:value.height,
          width:value.width,
          "margin-top":value["margin-top"],
          "margin-bottom":value["margin-bottom"]
        }
      }
    });
  }

  const menu = engine.make.div({
    parent:main,
    class:'page-main-editor-main-rows-row-containers-container-image-menu'
  });

    engine.make.image({
      parent:menu,
      class:'page-main-editor-main-rows-row-containers-container-image-menu-img',
      type:'local',
      location:'assets/images/icons/edit.png',
      function:()=>{
        toggle();
      }
    });

  let editor;
  function make_editor(){
    editor = engine.make.div({
      parent:main,
      class:'page-main-editor-main-rows-row-containers-container-image-editor'
    });
      for(let type of ['location','height','width','margin-top','margin-bottom']){
        engine.make.input({
          parent:editor,
          type:'string',
          placeholder:type,
          class:'page-main-editor-main-rows-row-containers-container-field-image-editor-input',
          value:value[type],
          function:(_,v)=>{
            update_image_value(type,v);
          }
        });
      }
      engine.make.button({
        parent:editor,
        value:'submit',
        class:'page-main-editor-main-rows-row-containers-container-field-image-editor-button',
        function:()=>{
          engine.view.remove(main);
          make_image_field(data,controller);
        }
      });
      engine.view.hide(editor);
  }

  let hidden = true;
  function toggle(){
    if(hidden){
      engine.view.show(editor);
      hidden = false;
    } else {
      engine.view.hide(editor);
      hidden = true;
    }
  }

  make_editor();

  if(!value.location){
    make_message("add a location");
    toggle();
  }



}
