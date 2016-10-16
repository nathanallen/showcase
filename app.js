
$(function(){

  let buildProject = (function(){
    let template = $('#project-tmpl').html();

    return function (config){
      return $(
        template
          .replace('{{title}}',       config.title)
          .replace('{{description}}', config.description)
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

  // Display default project demo
  let project = window.data.projects[0];
  renderDemo(project);

  // Display list of projects in sidebar
  $("#sidebar").html(

      window.data.projects.map(function(project){
        return buildProject(project).click(function(){

          $('.active').removeClass('active');
          $(this).addClass('active');

          renderDemo(project);

        });
      })

  );

  // Indicate active project in sidebar
  $(".project:eq(0)").addClass('active');

});
