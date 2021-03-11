

module.exports = (data,controller)=>{

  let article = controller.functions.get(),value = '';
  if(
    article.rows[data.rowId].containers[data.contId].field.data &&
    article.rows[data.rowId].containers[data.contId].field.data.value
  ){
    value = article.rows[data.rowId].containers[data.contId].field.data.value;
  }

  const main = engine.make.div({
    parent:data.parent,
    class:'page-main-editor-main-rows-row-containers-container-field-textarea',
    event:{type:'keyup',function:()=>{
      let v = input.getValue();
      let article = controller.functions.get();
      article.rows[data.rowId].containers[data.contId].field.data = {
        value:v
      };
      controller.functions.update(article);
    }}
  });

  let input = engine.global.function.codemirror(engine.get.element(main),{
    value:value,
    // placeholder:'text goes here',
    lineNumbers: true,
    viewportMargin:Infinity
  });

}
