//Side Menu Toggle
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  $("#menu-close").show();
  // $("#menu-toggle").hide();
});

$("#menu-close").click(function(e) {
  e.preventDefault();
  $("#wrapper").removeClass("toggled");
  $("#menu-toggle").show();
  // $("#menu-close").hide();
});
