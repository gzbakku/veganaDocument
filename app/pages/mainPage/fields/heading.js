

module.exports = (data,controller)=>{

  let article = controller.functions.get(),value = '';
  if(
    article.rows[data.rowId].containers[data.contId].field.data &&
    article.rows[data.rowId].containers[data.contId].field.data.value
  ){
    value = article.rows[data.rowId].containers[data.contId].field.data.value;
  }

  engine.make.input({
    parent:data.parent,
    type:'string',
    placeholder:'heading goes here',
    class:'page-main-editor-main-rows-row-containers-container-field-textarea page-main-editor-main-rows-row-containers-container-field-heading',
    value:value,
    function:(_,v)=>{
      let article = controller.functions.get();
      article.rows[data.rowId].containers[data.contId].field.data = {
        value:v
      };
      controller.functions.update(article);
    }
  });

}
