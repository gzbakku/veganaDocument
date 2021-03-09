

module.exports = (data,controller)=>{

  let article = controller.functions.get(),value = '';
  if(
    article.rows[data.rowId].containers[data.contId].field.data &&
    article.rows[data.rowId].containers[data.contId].field.data.value
  ){
    value = article.rows[data.rowId].containers[data.contId].field.data.value;
  }

  const textareaId = engine.make.textarea({
    parent:data.parent,
    placeholder:'code goes here',
    class:'page-main-editor-main-rows-row-containers-container-field-textarea',
    value:value,
    rows:[...value.matchAll(/\n/g)].length,
    function:(_,v)=>{
      let article = controller.functions.get();
      article.rows[data.rowId].containers[data.contId].field.data = {
        value:v
      };
      controller.functions.update(article);
      textareaObject.rows = [...v.matchAll(/\n/g)].length;
    }
  });

  let textareaObject = engine.get.element(textareaId);

}
