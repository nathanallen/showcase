
$(function(){

  let project = (function(){
    let template = $('#project-tmpl').html();

    return function (config){
      return (
        template
          .replace('{{title}}',       config.title)
          .replace('{{description}}', config.description)
      );
    }

  }())

  let embed = (function(){
    let iframe = document.createElement("iframe");
    return function(config){
      iframe.src = "http://nathan.codes/" + config.homepage_url;
      return iframe;
    }
  }())

  let proj = window.data.projects[0];

  $("#main")
    .append( embed(proj) );

  $("#sidebar")
    .append( project(proj) );

});
