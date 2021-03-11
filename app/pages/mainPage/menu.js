



module.exports = (data)=>{

  const main = engine.make.div({
    parent:data.parent,
    class:'page-main-editor-menu'
  });

  if(data.hasOwnProperty("title")){
    let title = 'new field';
    if(data.title){
      title = data.title;
    }
    engine.make.div({
      parent:main,
      class:'page-main-editor-menu-title',
      text:title
    });
  }

  for(let button of data.buttons){
    make_button(button);
  }

  function make_button(button){

    let location = 'assets/images/icons/edit.png';
    if(button.type === "add"){location = 'assets/images/icons/add.png';} else
    if(button.type === "left"){location = 'assets/images/icons/left.png';} else
    if(button.type === "move"){location = 'assets/images/icons/move.png';} else
    if(button.type === "edit"){location = 'assets/images/icons/edit.png';} else
    if(button.type === "delete"){location = 'assets/images/icons/delete.png';}

    let button_controller = {
      parent:main,
      class:'page-main-editor-menu-button'
    };

    if(button.type === "move"){
      button_controller.events = [
        {event:'pointerdown',function:button.onDown}
      ];
    } else {
      button_controller.function = ()=>{
        button.function(buttonObject);
      };
    }

    const buttonId = engine.make.div(button_controller);

      let buttonObject = engine.get.element(buttonId);

      engine.make.image({
        parent:buttonId,
        class:'page-main-editor-menu-button-icon',
        type:'local',
        location:location,
      });

      engine.make.div({
        parent:buttonId,
        class:'page-main-editor-menu-button-foreground'
      });

  }//make_button

}
