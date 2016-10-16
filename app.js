
$(function(){

  let buildProject = (function(){
    let template = $('#project-tmpl').html();

    return function (config){
      return $(
        template
          .replace(new RegExp('{{title}}',       'g'),  config.title)
          .replace(new RegExp('{{description}}', 'g'),  config.description)
      );
    }

  }())

  let buildEmbed = (function(){
    let iframe = document.createElement("iframe");
    return function(config){
      iframe.src = "http://nathan.codes/" + config.homepage_url;
      return iframe;
    }
  }())

  let renderDemo = (function() {
    let $target = $("#main");
    return function( project ){
      $target.html( buildEmbed(project || this) );
    }
  }());

  // Display list of projects in sidebar
  $("#sidebar").html(

      window.data.projects.map(function(project){
        return buildProject(project).click(function(){

          renderDemo(project);

          // change location hash without adding to push state
          window.history.replaceState(null, null, "#"+project.title);
          $('.active').removeClass('active');
          $(this).addClass('active');

        });
      })

  );

  // Display current or default demo
  $(location.hash || ".project:eq(0)").click();

});
