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
  let clickScrollTo = (btn, block, time) => {
    $(btn).click(() => {
      $("html, body").animate(
        {
          scrollTop: $(block).offset().top + 50,
        },
        time
      );
    });
  };
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
      sliderHome($(".block-slide"));
      sliderBlock8($(".home-block-8-slide"));
      scrollMenu();
      clickScrollTo($("#btnKinhDoanh"), $("#blockKinhDoanh"), 500);
      clickScrollTo($("#btnQuanLy"), $("#blockQuanLy"), 700);
      clickScrollTo($("#btnGiaDinh"), $("#blockGiaDinh"), 1000);
      clickScrollTo($("#btnGioiThieu"), $("#blockGioiThieu"), 1000);
      clickScrollTo($(".btnSanPham"), $("#blockSanPham"), 1000);
      clickScrollTo($("#btnUuDai"), $("#blockUuDai"), 1000);
      butter.init({ cancelOnTouch: true });
      activeForm(".btnDangKy", "#user-register-form");
      getValueCheckbox();
    },
  };

  let activeForm = (btn, userForm) => {
    $(btn).click(() => {
      $(".vp-main-content").addClass("has-overflow");
      $(userForm).addClass("active");
    });
    $(".btn-close").click(() => {
      $(".vp-main-content").removeClass("has-overflow");
      $(userForm).removeClass("active");
    });
  };

  let getValueCheckbox = () => {
    $(".selectSanPham").click((t) => {
      t.stopPropagation();
    })
    $(".user-form").click(() => {
      let favorite = [];
      $.each($("input[name='products[]']:checked"), function(){            
          favorite.push($(this).val());
      });
      if(favorite != 0){
        $("#btnSelectSanPham").text(favorite.join(", "))
      }
      $(".selectSanPham").collapse('hide');
    });
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
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    });
  }
  function sliderBlock8(slider) {
    slider.slick({
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
          },
        },
      ],
    });
  }
})(jQuery);
