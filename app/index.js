
//import all the pages here which you want to be in the app and use engine.get.pageModule api to get the page
const viewPage = require('./pages/viewPage/page')
const mainPage = require('./pages/mainPage/page');
const startPage = mainPage; //declare the first page module here

require("./ui/index");

/*
set the base url to the native vegana cdn,or if hosting on non native platform please
set the baseurl to where the files for the project are held.

like if index.html is available at "https://example.com/app1/index.html"
then base url is "https://example.com/app1"
*/
engine.router.set.baseHref("");


// load all the fonts here you can await on font addition if you want
// engine.sketch.fonts.add("text","nova-round","assets/fonts/NovaRound-Regular.ttf");  //sample font
engine.sketch.fonts.add("text","Akaya-Telivigala","assets/fonts/AkayaTelivigala-Regular.ttf");
engine.sketch.fonts.add("text","Montserrat-Regular","assets/fonts/Montserrat-Regular.ttf");

//------------------------------------------------------------------------------
//init the page, pass anything you want to the page here
if(engine.router.active.page == null){
  startPage.init(); //the startpage module is initiated here
}
