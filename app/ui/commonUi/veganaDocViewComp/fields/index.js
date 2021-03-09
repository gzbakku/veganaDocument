const codemirror = require("codemirror/lib/codemirror.js");

module.exports = {init:init};

function init(parent,field){

  const main = engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field"
  });

  if(field.type === "heading"){
    make_heading(main,"heading",field.data.value);
  } else if(field.type === "paragraph"){
    make_paragraph(main,"paragraph",field.data.value);
  } else if(field.type === "image"){
    make_image(main,field.data);
  } else if(field.type === "code"){
    make_code(main,field.data);
  }

}

function make_code(parent,data){
  const main = engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code"
  });
  codemirror(engine.get.element(main),{
    value:data.value,
    lineNumbers: true,
    mode:'javascript'
  });
}

function make_image(parent,data){
  const main = engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-image"
  });
    engine.make.image({
      parent:main,
      type:'url',
      location:'http://localhost:5566/' + data.location,
      draw:{
        all:{
          height:data.height,
          width:data.width
        }
      }
    });
}

function make_paragraph(parent,type,value){
  while(value.indexOf("\n") >= 0){
    value = value.replace("\n","<br>");
  }
  engine.make.p({
    level:1,
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-paragraph",
    text:value
  });
}

function make_heading(parent,type,value){
  engine.make.heading({
    level:1,
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-heading",
    text:value
  });
}
