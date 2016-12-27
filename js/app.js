//Problem: User cliking info does not reveal info div
//Solution: Create a toggle tat shows and hides the info div



// On click of info link
$(".info").click(function(event){
  //This event thisn allows the #wrapper closer to close, but not sure why…
  event.stopPropagation();
  // Slide in / out Bio
  $("#bio").toggleClass("open");
  $("nav li a").toggleClass("black");
  //Show / Hide Info / Close <li>
  $(".info").toggle();
});


//If menu is open close by clicking anywhere but the BIO section, using wrapper as this wraps all
$("#wrapper").click( function(){
  //If OPEN has been added to the BIO
  if ( $("#bio").hasClass("open") ) {
     //Toggle open back to closed
    $("#bio").toggleClass("open");
    $("nav li a").toggleClass("black");
    //Change to Close <li>
    $(".info").toggle();
  }
});

//If menu is open close on scroll
$(window).scroll(function() {
  if ( $("#bio").hasClass("open") ) {
     //Toggle open back to closed
    $("#bio").toggleClass("open");
    $("nav li a").toggleClass("black");
    //Change to Close <li>
    $(".info").toggle();
  }
  });


//Scroll to top
    $('#toTop').click(function () {
        $("html, body").animate({
            scrollTop: 0,
        }, 400 );
        return false;
    });


//Show Hide Disciplines
$( ".discipline" ).click(function() {
  //Toggle the show / hide class
  $( "#disiplineFilters ul" ).toggleClass("show");
    //If we have show class already, then we will change Dicsiplines text
  if ( $("#disiplineFilters ul").hasClass("show") ) {
    $(".discipline").html("Discipline&nbsp;&uarr;");
    }
  else {
   //If we have dont have show class already, then we will change Dicsiplines text back
   $(".discipline").html("Discipline&nbsp;&darr;");
  }
});
