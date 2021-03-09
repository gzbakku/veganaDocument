

module.exports = (data)=>{

  const position = engine.get.elementPosition(data.parent);
  let bodyWidth = engine.get.body.width();

  const main = engine.make.div({
    parent:"page-router",
    class:'card page-main-editor-main-rows-row-containers-container-editor',
    draw:{
      all:{
        top:position.top + "px",
        left:position.left + "px",
        position:'fixed',
        // border:'5px solid red',
        'border-radius':'10px',
        width:position.width + "px",
        'min-width':'200px',
        height:"auto"
      }
    }
  });

  const fields = engine.make.div({
    parent:main,
    class:'page-main-editor-main-rows-row-containers-container-editor-fields'
  });

  let ids = {};
  let values = data.style || {};
  for(let field of data.fields){
    ids[field] = engine.make.input({
      type:'string',
      parent:fields,
      placeholder:field,
      value:values[field],
      class:'page-main-editor-main-rows-row-containers-container-editor-fields-field'
    });
  }

  function fetch(){
    let data = {};
    for(let id in ids){
      if(engine.binder.text(ids[id])){
        data[id] = engine.binder.text(ids[id]);
      }
    }
    return data;
  }

  const buttons = engine.make.div({
    parent:main,
    class:'page-main-editor-main-rows-row-containers-container-editor-buttons'
  });

    engine.make.div({
      parent:buttons,
      class:'page-main-editor-main-rows-row-containers-container-editor-buttons-button',
      text:'cancel',
      function:()=>{engine.view.remove(main);}
    });

    engine.make.div({
      parent:buttons,
      class:'page-main-editor-main-rows-row-containers-container-editor-buttons-button',
      text:'update',
      function:()=>{
        data.onUpdate(fetch());
        engine.view.remove(main);
      }
    });

}
