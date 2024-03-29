$(function(){

  var buildProject = (function(){
    var template = $('#project-tmpl').html();

    return function (config){
      return $(
        template
          .replace(new RegExp('{{title}}',       'g'),  config.title)
          .replace(new RegExp('{{year}}',       'g'),   config.year)
          .replace(new RegExp('{{description}}', 'g'),  config.description)
      );
    }

  }())

  var buildEmbed = (function(){
    var iframe = document.createElement("iframe");
    iframe.onload = function(){
      $(iframe).removeClass("loading");
    }
    return function(config){
      $(iframe).addClass("loading");
      iframe.src = "http://nathan.codes/" + config.homepage_url;
      return iframe;
    }
  }())

  var renderDemo = (function() {
    var $target = $("#main");
    return function( project ){
      $target.html( buildEmbed(project || this) );
    }
  }());

  // Display list of projects in sidebar
  var $sidebar = $("#sidebar").html(

      window.data.projects.map(function(project){
        return buildProject(project).click(function(){

          // update location hash without state change
          window.history.replaceState(null, null, "#"+project.title);
          $('.active').removeClass('active');
          $(this).addClass('active');

          renderDemo(project);

        });
      })

  );

  // activate current demo // FIXME: no iframe loads if hash is incorrect
  var $current = $(location.hash || ".project:eq(0)").click();
  // scroll sidebar label into view
  $sidebar.animate({
    scrollTop: $current.offset().top
  });

  var updateScrollIndicator = (function(){
    // displays an up/down arrow in scroll area
    // if there is overflow content above or below the fold
    var $first  = $sidebar.children('.project:first');
    var $last   = $sidebar.children('.project:last');
    var top_offset = $sidebar.offset().top
    var top     = top_offset - (.33 * $first.outerHeight());
    var bottom  = $sidebar.height() - (.66 * $last.outerHeight()) + top_offset;

    // re-calculate distance to top/bottom of sidebar on resize
    $(window).resize(_.throttle(function(){
      top_offset = $sidebar.offset().top;
      top     = top_offset - (.33 * $first.outerHeight());
      bottom  = $sidebar.height() - (.66 * $last.outerHeight()) + top_offset;
    },100));

    return _.throttle(function() {
      if ($first.offset().top < top){
        $sidebar.addClass('can-scroll-up');
      } else {
        $sidebar.removeClass('can-scroll-up');
      }

      if ($last.offset().top > bottom) {
        $sidebar.addClass('can-scroll-down');
      } else {
        $sidebar.removeClass('can-scroll-down');
      }
    },100);

  }());

  $sidebar.scroll(updateScrollIndicator);

});
