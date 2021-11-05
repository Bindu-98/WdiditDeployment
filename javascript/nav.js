//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}


$(document).ready(function () {
    $(".sidemenu-toggler").click(function () {
        $(".sidemenu").addClass("active");
    });

    $(".close").click(function () {
        $(".sidemenu").removeClass("active");
    });

    $(window).scroll(function () {
        var sc = $(window).scrollTop();
        if (sc > 150) {
            $(".header").addClass("sticky");
        } else {
            $(".header").removeClass("sticky");
        }
    });

    $(window).on("load", function () {
        var $container = $(".portfolioContainer");
        $container.isotope({
            filter: "*",
            AnimationOptions: {
                queue: true,
            },
        });

        $(".portfolio-nav li").click(function () {
            $(".portfolio-nav .current").removeClass("current");
            $(this).addClass("current");
            var selector = $(this).attr("data-filter");
            $container.isotope({
                filter: selector,
                AnimationOptions: {
                    queue: true,
                },
            });

            return false;
        });
    });

    $("#portfolio-item").mixItup();
});
