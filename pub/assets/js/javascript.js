(function ($) {
  "use strict";

  /**
   * Global letiables
   */
  let pages = {
    homePage: "homePage",
  };
  let currentPage =
    document.querySelector(".vp-main-content") &&
    document.querySelector(".vp-main-content").getAttribute("id");
  /**
   * DOM Event Listener
   */
  $(document).ready(function () {
    appInit(currentPage);
  });

  /**
   * App Init
   */
  function appInit(id) {
    switch (id) {
      case pages.homePage:
        homeActions.init();
        break;
    }
  }

  /**
   * Function Declarations
   */

  // ************************************************* ALL PAGES *************************************************
  AOS.init({
    once: true,
  });
  $(window).on("scroll", function () {
    let scrollTop = $("header").offset().top;
    if (scrollTop !== 0) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }
  });
  // ************************************************* HOME *************************************************
  let homeActions = {
    init: function () {
      sliderHome($(".home-block-3-slide-img"));
      scrollMenu();
    },
  };

  let scrollMenu = () => {
    let scrollTop = $("header nav").offset().top;
    if (scrollTop !== 0) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }
    $(window).on("scroll", () => {
      let scrollTop = $("header nav").offset().top;
      if (scrollTop !== 0) {
        $("header").addClass("active");
      } else {
        $("header").removeClass("active");
      }
    });
  };

  function sliderHome(slider) {
    slider.slick({
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }
})(jQuery);
