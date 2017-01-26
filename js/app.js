$(document).ready(function() {
    $(".owl-carousel").owlCarousel();
    $('header').scrollupbar();


    // On click of info link
    $(".info").click(function(event) {
        //This event thisn allows the #wrapper closer to close, but not sure why…
        event.stopPropagation();
        // Slide in / out Bio
        $("#bio").toggleClass("open");
        $("nav li").toggleClass("black");
        //Show / Hide Info / Close <li>
        $(".info").toggle();
    });


    //If menu is open close by clicking anywhere but the BIO section, using wrapper as this wraps all
    $("#wrapper").click(function() {
        //If OPEN has been added to the BIO
        if ($("#bio").hasClass("open")) {
            //Toggle open back to closed
            $("#bio").toggleClass("open");
            $("nav li").toggleClass("black");
            //Change to Close <li>
            $(".info").toggle();
        }
    });

    //If menu is open close on scroll
    $(window).scroll(function() {
        if ($("#bio").hasClass("open")) {
            //Toggle open back to closed
            $("#bio").toggleClass("open");
            $("nav li").toggleClass("black");
            //Change to Close <li>
            $(".info").toggle();
        }
    });


    //Scroll to top
    $('#toTop').click(function() {
        $("html, body").animate({
            scrollTop: 0,
        }, 400);
        return false;
    });


    //Show Hide Disciplines
    $(".discipline").click(function() {
        //Toggle the show / hide class
        $("#disiplineFilters ul").toggleClass("show");
        //If we have show class already, then we will change Dicsiplines text
        if ($("#disiplineFilters ul").hasClass("show")) {
            $(".discipline").html("Discipline&nbsp;&uarr;");
        } else {
            //If we have dont have show class already, then we will change Dicsiplines text back
            $(".discipline").html("Discipline&nbsp;&darr;");
        }
    });

    //SHOW HIDE DIVS BASED ON DISCIPLINE
    var $btns = $('.btn').click(function() {
        if (this.id == 'all') {
            $('#projectIndex > div').removeClass("dimmed");
        } else {
            var $el = $('.' + this.id).removeClass("dimmed");
            $('#projectIndex > div').not($el).addClass("dimmed");
        }
        $btns.removeClass('underline');
        $(this).addClass('underline');
    })


    //OVERLY COMPLICATED SORT BY DATE FUNCTION, USING HTML CONTENT RATHER THAN SELECOTRS OR CLASSES.  POSSIBLE TO SIMPLYFIY??
    function sortUsingNestedDate(parent, childSelector, keySelector) {
        var items = parent.children(childSelector).sort(function(a, b) {
            var vA = $(keySelector, a).text();
            var vB = $(keySelector, b).text();
            return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
        });
        parent.append(items);
    }

    /* setup sort attributes */
    $('#date').data("sortKey", "li.date");

    function sortDates() {
        sortUsingNestedDate($('#projectIndex'), "div", $("button.btnSortDate").data("sortKey"));

        //ADDING UNDERLINE CLASSES
        if ($("#name").hasClass("underline")) {
            $("#name").removeClass("underline");
            $("#date").addClass("underline");
        } else {
            $("#date").addClass("underline");
        }
    }

    /* sort on button click */
    $("button.btnSortDate").click(function() {
        $(".projectText").fadeOut(150);
        setTimeout(
            function() {
                sortDates();
            },
            150);
        $(".projectText").fadeIn(150);
    });


    //OVERLY COMPLICATED SORT BY NAME FUNCTION, USING HTML CONTENT RATHER THAN SELECOTRS OR CLASSES.  POSSIBLE TO SIMPLYFIY??

    function sortUsingNestedName(parent, childSelector, keySelector) {
        var items = parent.children(childSelector).sort(function(a, b) {
            var vA = $(keySelector, a).text();
            var vB = $(keySelector, b).text();
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
        });
        parent.append(items);
    }
    /* setup sort attributes */
    $('#name').data("sortKey", "li.name");

    /* The actual Sorting function itself */
    function sortNames() {
        /* Runs first function looking for content */
        sortUsingNestedName($('#projectIndex'), "div", $("button.btnSortName").data("sortKey"));
        /* Checks button classes and add and removes as necessasry */
        if ($("#date").hasClass("underline")) {
            $("#date").removeClass("underline");
            $("#name").addClass("underline");
        } else {
            $("#name").addClass("underline");
        }
    }

    /* sort on page load to alphabeticse all listings click */
    $(document).ready(function() {
        sortNames();
    });
    /* sort on button click */
    $("button.btnSortName").click(function() {
        $(".projectText").fadeOut(150);
        setTimeout(
            function() {
                sortNames();
            },
            150);
        $(".projectText").fadeIn(150);
    });




    /*   $('nav a').on('click', function() {

        var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 28;

        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);

        return false;

    })


    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {

            $('.wrapper section').each(function(i) {
                if ($(this).position().top <= windscroll - 20) {
                    $('nav a.active').removeClass('active');
                    $('nav a').eq(i).addClass('active');
                }
            });

        } else {

            $('nav').removeClass('fixed');
            $('nav a.active').removeClass('active');
            $('nav a:first').addClass('active');
        }

    }).scroll(); */





    //SCROLL TO AND HIGHLIGHT
    $('.disciplines li').on('click', function() {

        var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 0;

        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
        return false;
    })

    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= $(window).height() * .3) {

            $('.sideDisciplines').addClass('appear');
            $('.image_layout').each(function(i) {
                if ($(this).position().top <= windscroll + $(window).height() * .5) {
                    $('.sideDisciplines li').removeClass('underline');
                    $('.sideDisciplines li').eq(i).addClass('underline');
                }
            });
        } else {

            $('.sideDisciplines').removeClass('appear');
            $('.sideDisciplines li').removeClass('active');
            $('.sideDisciplines li:first').addClass('active');
        }
    }).scroll();


    //SHOW HOVER IMAGE ON ROLLOVER FOR BIG TEXT PAGE
    $('.projectBig').mousemove(function(e) {
        //IF THIS DOES NOT HAVE THE CLASS OUTLINE, RUN FUNCTION
        if (!$(this).hasClass("outline")) {
            $img = $("#" + $(this).data('image-id'))
            $img.stop(1, 1).show();
            $img.offset({
                top: e.pageY + 20,
                left: e.pageX - 200
            });
        };
    }).mouseleave(function() {
        $img = $("#" + $(this).data('image-id'))
        $img.hide();
    });


    //SHOW HIDE DIVS BASED ON DISCIPLINE CAN THIS BE COMBINDED WOTH OTHER FUNCTION???
    var $btns = $('.btn').click(function() {
        if (this.id == 'all') {
            $('#projectIndexBig > span').removeClass("outline");
        } else {
            var $el = $('.' + this.id).removeClass("outline");
            $('#projectIndexBig > span').not($el).addClass("outline");
        }
        $btns.removeClass('underline');
        $(this).addClass('underline');
    })



    //PROJECTS BIG OVERLY COMPLICATED SORT BY NAME FUNCTION, USING HTML CONTENT RATHER THAN SELECOTRS OR CLASSES.  POSSIBLE TO SIMPLYFIY??

    function sortUsingNestedName(parent, childSelector, keySelector) {
        var items = parent.children(childSelector).sort(function(a, b) {
            var vA = $(keySelector, a).text();
            var vB = $(keySelector, b).text();
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
        });
        parent.append(items);
    }
    /* setup sort attributes */
    $('#name').data("sortKey", "span.bigName");

    /* The actual Sorting function itself */
    function sortNames() {
        /* Runs first function looking for content */
        sortUsingNestedName($('#projectIndexBig'), "span", $("button.btnSortName").data("sortKey"));
        /* Checks button classes and add and removes as necessasry */
        if ($("#date").hasClass("underline")) {
            $("#date").removeClass("underline");
            $("#name").addClass("underline");
        } else {
            $("#name").addClass("underline");
        }
    }

    /* sort on page load to alphabeticse all listings click */
    $(document).ready(function() {
        sortNames();
    });
    /* sort on button click */
    $("button.btnSortName").click(function() {
        $(".projectBig").fadeOut(150);
        setTimeout(
            function() {
                sortNames();
            },
            150);
        $(".projectBig").fadeIn(150);
    });



    //PROJECTS BIG OVERLY COMPLICATED SORT BY NAME FUNCTION, USING HTML CONTENT RATHER THAN SELECOTRS OR CLASSES.  POSSIBLE TO SIMPLYFIY??
    function sortUsingNestedDate(parent, childSelector, keySelector) {
        var items = parent.children(childSelector).sort(function(a, b) {
            var vA = $(keySelector, a).text();
            var vB = $(keySelector, b).text();
            return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
        });
        parent.append(items);
    }

    /* setup sort attributes */
    $('#date').data("sortKey", "span.bigDate");

    /* The actual Sorting function itself */
    function sortDates() {
        sortUsingNestedDate($('#projectIndexBig'), "span", $("button.btnSortDate").data("sortKey"));

        //ADDING UNDERLINE CLASSES
        if ($("#name").hasClass("underline")) {
            $("#name").removeClass("underline");
            $("#date").addClass("underline");
        } else {
            $("#date").addClass("underline");
        }
    }

        /* sort on button click */
        $("button.btnSortDate").click(function() {
            $(".projectBig").fadeOut(150);
            setTimeout(
                function() {
                    sortDates();
                },
                150);
            $(".projectBig").fadeIn(150);
        });



});
