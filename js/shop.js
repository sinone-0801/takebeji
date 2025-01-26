$(function () {
  /* ------------------------------------------
   * Global
  ------------------------------------------ */

  // Global - Header fav
  const favorite_buttons = document.querySelectorAll('.favorite_button');
  favorite_buttons.forEach(function(button) {
    button.addEventListener('click', (e) => {
      let uri = new URL(window.location.href);
      let url = uri.protocol + '//' + uri.host + $('.l-footer').attr('p2') + '/shop/shopFav.php';
      let param = '';
      if (button.classList.contains('active')) {
        param = 'remove_bookmark';
      } else {
        param = 'bookmark';
      }
      $.ajax({
        type: "POST",
        url: url,
        data: { 
          scd: $('.l-footer').attr('p1')
          , mode: param
        },
        dataType : "html"
      })
      .done(function(data){
        button.classList.toggle('active');
      })
      .fail(function(XMLHttpRequest, textStatus, errorThrown){
        location.href=uri.protocol + '//' + uri.host  +  $('.l-footer').attr('p2') + '/signin.php?redirect_url=' + location.href;
      });
    });
  })

  // Global - Drawer nav
  const humSw = document.querySelector('.header_hum');
  const closeSw = document.querySelector('.drawer_controll_close');
  const nextSw = document.querySelectorAll('.drawer_list_next');
  const prevSw = document.querySelectorAll('.drawer_header_heading_prev');
  const drawer = document.querySelector('.drawer');
  const drawerPage = document.querySelectorAll('.drawer_page');

  // .js_drawer_product_link は JS用。このクラスにスタイリングしてはいけない
  const drawerProductLink = document.querySelectorAll('.js_drawer_product_link');

  const closeDrawer = () => {
    drawer.classList.remove('show');
    drawer.classList.add('hide');
    setTimeout(() => {
      drawer.classList.remove('hide');
      drawerPage.forEach((el) => el.classList.remove('slideIn'));
    }, 300);
  }

  humSw.addEventListener('click', () => {
    drawer.classList.add('show');
  });
  closeSw.addEventListener('click', closeDrawer);
  drawerProductLink.forEach((el) => {
    el.addEventListener('click', () => {
      if (location.href.indexOf('/storeProduct.php?') != -1) {
        closeDrawer()
      }      
    });
  });
  nextSw.forEach((el, i) => {
    el.addEventListener('click', () => {
      const tgt = el.closest('li').querySelector('.drawer_page')
      
      if (tgt) {
        tgt.classList.add('slideIn')
      }
    });
  });
  prevSw.forEach((el, i) => {
    el.addEventListener('click', () => {
      drawerPage[i].classList.remove('slideIn');
    });
  });

  // $(window).on('scroll', function () {
  //   $('.header').css('left', -$(window).scrollLeft());
  // });

  /* ------------------------------------------
   * Pages
  ------------------------------------------ */
  // Shop top - Product tab
  const productTabSw = document.querySelectorAll('.top_product_tab > li');
  const productTabBody = document.querySelectorAll('.top_product_item');
  if (productTabSw) {
    productTabSw.forEach((el, i) => {
      el.addEventListener('click', () => {
        productTabSw.forEach((e) => e.classList.remove('active'));
        productTabBody.forEach((e) => e.classList.remove('active'));
        el.classList.add('active');
        productTabBody[i].classList.add('active');
      });
    });
  }

  // Shop product - Product Drawer
  const productSw = document.querySelector('.product_search');
  const productNextSw = document.querySelectorAll('.product_drawer_list_next');
  const productPrevSw = document.querySelectorAll('.product_drawer_header_heading_prev');
  const productDrawer = document.querySelector('.product_drawer');
  const productDrawerPage = document.querySelectorAll('.product_drawer_page');

  if (productSw) {
    productSw.addEventListener('click', () => {
      productDrawer.classList.add('show');
    });
    productNextSw.forEach((el, i) => {
      el.addEventListener('click', () => {
        productDrawerPage[i].classList.add('slideIn');
      });
    });
    productPrevSw.forEach((el, i) => {
      el.addEventListener('click', () => {
        if (i > 0) {
          productDrawerPage[i - 1].classList.remove('slideIn');
        } else {
          productDrawer.classList.remove('show');
          productDrawer.classList.add('hide');
          setTimeout(() => {
            productDrawer.classList.remove('hide');
            productDrawerPage.forEach((el) => el.classList.remove('slideIn'));
          }, 300);
        }
      });
    });
  }

  // Shop coupon - Coupon Drawer
  const couponSw = document.querySelector('.coupon_search');
  const couponNextSw = document.querySelectorAll('.coupon_drawer_list_next');
  const couponPrevSw = document.querySelectorAll('.coupon_drawer_header_heading_prev');
  const couponDrawer = document.querySelector('.coupon_drawer');
  const couponDrawerPage = document.querySelectorAll('.coupon_drawer_page');

  if (couponSw) {
    couponSw.addEventListener('click', () => {
      couponDrawer.classList.add('show');
    });
    couponNextSw.forEach((el, i) => {
      el.addEventListener('click', () => {
        couponDrawerPage[i].classList.add('slideIn');
      });
    });
    couponPrevSw.forEach((el, i) => {
      el.addEventListener('click', () => {
        if (i > 0) {
          couponDrawerPage[i - 1].classList.remove('slideIn');
        } else {
          couponDrawer.classList.remove('show');
          couponDrawer.classList.add('hide');
          setTimeout(() => {
            couponDrawer.classList.remove('hide');
            couponDrawerPage.forEach((el) => el.classList.remove('slideIn'));
          }, 300);
        }
      });
    });
  }

  const accordionMore = document.querySelectorAll('.accordion-more');
  const accordionBody = document.querySelectorAll('.accordion-body');
  if (accordionMore) {
    accordionMore.forEach((el, i) => {
      el.addEventListener('click', () => {
        accordionBody[i].classList.add('show');
        el.classList.add('hide');
      });
    });

    setStatusAccordion() // 初期化：続きを読む
    window.addEventListener('resize', ()=>{setStatusAccordion()}, false)
    window.addEventListener('orientationchange', ()=>{setStatusAccordion()}, false)
  }

  // 続きを読むの状態を設定する
  function setStatusAccordion() {
    accordionBody.forEach((el, i) => {
      let targetMore = /*el.firstElementChild */el.querySelector('.accordion-more')

      // アコーディオン：クローズ
      if(!el.classList.contains('show')) {
        // はみ出ていない
        if(!checkAccordionSize(el)) {
          // 続きを読む：表示
          if(!targetMore.classList.contains('hide')) {
            targetMore.classList.add('hide')
          }

        // はみ出てる
        } else {
          // 続きを読む：非表示
          if(targetMore.classList.contains('hide')) {
            targetMore.classList.remove('hide')
          }
        }

      // アコーディオン：オープン
      } else {}
    })
  }
  function checkAccordionSize(targetEl) {
    let targetH = targetEl.offsetHeight
    let targetScH = targetEl.scrollHeight
    let judgeOverH = false
    if(targetH < targetScH) {
      judgeOverH = true
    }
    return judgeOverH
  }

  const newsReadMore = document.querySelectorAll('.news-read-more');
  const newsBody = document.querySelectorAll('.news-body');
  if (newsReadMore) {
    setStatusReadMore() // 初期化：続きを読む
    window.addEventListener('resize', ()=>{setStatusReadMore()}, false)
    window.addEventListener('orientationchange', ()=>{setStatusReadMore()}, false)
  }

  // 続きを読むの状態を設定する
  function setStatusReadMore() {
    newsBody.forEach((el, i) => {
      let targetReadMore = /*el.firstElementChild */el.querySelector('.news-read-more')

      if(!el.classList.contains('show')) {
        // はみ出ていない
        if(!checkNewsBodySize(el)) {
          // 続きを読む：表示
          if(!targetReadMore.classList.contains('hide')) {
            targetReadMore.classList.add('hide')
          }

          // はみ出てる
        } else {
          // 続きを読む：非表示
          if(targetReadMore.classList.contains('hide')) {
            targetReadMore.classList.remove('hide')
          }
        }

      } else {}
    })
  }
  function checkNewsBodySize(targetEl) {
    let targetH = targetEl.offsetHeight
    let targetScH = targetEl.scrollHeight
    let judgeOverH = false
    if(targetH < targetScH) {
      judgeOverH = true
    }
    return judgeOverH
  }

  /* ------------------------------------------
   * Slick
  ------------------------------------------ */
  // Shop top - Main slider

  let option_top_slider = {}
  
  if ($(".top_slider > *").length > 1) {
    option_top_slider = {
      autoplay: true,
      centerMode: true,
      centerPadding: '10%',
      slidesToShow: 1,
      initialSlide: 0,
      arrows: false,
      dots: true,
      variableWidth: true,
      
      responsive: [
        {
          breakpoint: 1001,
          settings: {
            centerMode: false,
            centerPadding: 0,
            slidesToShow: 1,
            initialSlide: 1,
            arrows: false,
            dots: false,
            variableWidth: false,
          },
        },
      ]
    }
  } else {
    option_top_slider = {
      loop: false,
      autoplay: false
    }
  }

  $('.top_slider').slick(option_top_slider)

  // Shop top - Feature slider
  function featureSlider() {
    if (document.documentElement.clientWidth > 1001) {
      $('.top_feature_slider').not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
      });
    } else {
      $('.top_feature_slider.slick-initialized').slick('unslick');
    }
  }
  window.addEventListener('resize', featureSlider);
  featureSlider();

  // Shop top - Pickup slider
  function pickupSlider() {
    if (document.documentElement.clientWidth > 1001) {
      $('.top_pickup_slider').not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 7,
      });
    } else {
      $('.top_pickup_slider.slick-initialized').slick('unslick');
    }
  }
  window.addEventListener('resize', pickupSlider);
  pickupSlider();

  // Shop top - Movie slider
  $('.top_movie_slider').slick({
    infinite: false,
    slidesToShow: 1,
    dots: true,
  });

  // Shop top - Coupon slider
  function couponSlider() {
    if (document.documentElement.clientWidth < 1001) {
      $('.top_coupon_slider').not('.slick-initialized').slick({
        infinite: false,
        dots: true,
      });
    } else {
      $('.top_coupon_slider.slick-initialized').slick('unslick');
    }
  }
  window.addEventListener('resize', couponSlider);
  couponSlider();

  // Shop top - Fanclub slider
  function fanclubSlider() {
    if (document.documentElement.clientWidth < 1001) {
      $('.top_fanclub_slider').not('.slick-initialized').slick({
        infinite: false,
        dots: true,
      });
    } else {
      $('.top_fanclub_slider.slick-initialized').slick('unslick');
    }
  }
  window.addEventListener('resize', fanclubSlider);
  fanclubSlider();

  // Shop top - Product slider
  for (let i = 0; i <= 5; i++) {
    const target = '.top_product_slider-' + i;

    function productSlider() {
      if (document.documentElement.clientWidth > 1001) {
        $(target).not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 7,
          slidesToScroll: 7,
        });
      } else {
        $(target + '.slick-initialized').slick('unslick');
      }
    }
    window.addEventListener('resize', productSlider);
    productSlider();
  }
  
  /* ------------------------------------------
   * (PC) プロダクト ページ内移動
   * JS用のclassに処理をしたいが、HTML修正を避けるためCSS兼用のクラスにJSを書いてしまいます
   * 念の為、存在しない場合のケアも追加します
  ------------------------------------------ */
  const link_product_nav = $('.product_nav a')
  
  if (link_product_nav.length > 0) {
    link_product_nav.on('click', function () {
      const _this = $(this),
            genre = _this.attr('href'),
            tgt = $(genre)
      
      const height_header = $('.header').outerHeight()

      if (tgt.length > 0) {        
        $('html, body').stop().animate({
          scrollTop: tgt.offset().top - height_header
        })
      }

      return false
    })    
  }

  /* ------------------------------------------
   * トップ お知らせ
   * SP時「もっと読む」をクリックした際、本文テキストは回り込み処理をする
  ------------------------------------------ */
  const more_news = $('.js-more-news')
  
  more_news.on('click', function () {
    $(this).closest('.js-top-news-item').addClass('top_blog_item--open')
    return false
  })

  /* ------------------------------------------
   * ファンクラブ登録ボタン (PC:ヘッダー SP:ドロワー)
   * PC・SP共通
  ------------------------------------------ */
  const pc_fanclub_button = document.querySelector('.header_nav_sub_fan');
  const sp_fanclub_button = document.querySelector('.drawer_header_fan');
  let jqxhr;

  $('.js-button-joinFunclub-join').on('click', function () {
    if (jqxhr) return;
    jqxhr = $.ajax({
      type: "GET",
      url: "contents/libs/fanClubRegist.php/?scd=" + modal_shop_cd + "&funclub_action=entry",
      data: {
        user_id: modal_user_id,
        storemaster_cd: modal_storemaster_cd
      },
      dataType: "html"
    }).done(function (data) {
      pc_fanclub_button.classList.toggle('active');
      sp_fanclub_button.classList.toggle('active');
      $('.header_nav_sub_fan').css('pointer-events', 'none');
      $('.drawer_header_fan').css('pointer-events', 'none');
      $('.funclub_show').text('ショップ ファンクラブに参加中');
      $('.join-fanclub--before').fadeOut(100, function () {
        $('.join-fanclub--after').fadeIn();
      });
    })
  });

  window.addEventListener('load', function() {
    if (typeof jQuery === 'undefined') {
      console.error('jQuery is not loaded');
      return;
    }
  
    // モーダルを開く処理
    const onClickShowModal = (e) => {
      console.log("モーダルを開く処理が実行されました");
      var target = $(e.currentTarget).attr('data-target-class');
      if (target == 'registMailmag') {
        $('.regist-mailmag--before').css('display', 'block');
        $('.regist-mailmag--after').css('display', 'none');
      } else if (target == 'stopMailmag') {
        $('.stop-mailmag--before').css('display', 'block');
        $('.stop-mailmag--after').css('display', 'none');
      } else if (target == 'nomoreECSite'){
        $('.stop-mailmag--before').css('display', 'block');
        $('.stop-mailmag--after').css('display', 'none');
      }
      // モーダルとオーバーレイを表示
      $('.js-modal-' + target).removeClass('hidden').fadeIn();
      $('.modal-overlay').fadeIn();  // オーバーレイを表示
    };
  
    // モーダルを開くボタンのイベント設定
    $('.js-show-merumaga-modalClass, .js-show-nomore-shop-modalClass').on('click', onClickShowModal);
  
    // 閉じるボタンの処理
    $('.js-close-modal').on('click', function() {
      console.log("閉じるボタンがクリックされました");
      $(this).closest('.js-modal-closeTarget').addClass('hidden');
      $('.modal-overlay').fadeOut();  // オーバーレイを非表示
    });
  
    // オーバーレイクリックでもモーダルを閉じる
    $('.modal-overlay').on('click', function() {
      $('.js-modal-closeTarget').addClass('hidden');
      $(this).fadeOut();
    });
  });

  // メルマガ購読開始時
  const registMailmagBtn = document.querySelector('.js-button-regist-mailmag');
  registMailmagBtn.addEventListener('click', () => {
    let request = null;
    const mailMagIconPc = document.querySelector('.header_nav_sub_mailmag');
    const mailMagIconSp = document.querySelector('.drawer_header_mailmag');
    // ボタン連打による二重処理防止
    if (request) return;
    let url = `contents/libs/registMailmag.php?scd=${mailMagShopCd}&action=regist`;
    fetch(url, {
      method: 'GET',
    }).then((response) => {
      if(response.ok) {
        mailMagIconPc.dataset.targetClass = 'stopMailmag';
        mailMagIconPc.classList.add('active');
        mailMagIconSp.dataset.targetClass = 'stopMailmag';
        mailMagIconSp.classList.add('active');
        $('.regist-mailmag--before').fadeOut(100, function () {
          $('.regist-mailmag--after').fadeIn();
        });
      }
    });
  });
  // メルマガ購読停止時
  const stopMailmagBtn = document.querySelector('.js-button-stop-mailmag');
  stopMailmagBtn.addEventListener('click', () => {
    let request = null;
    const mailMagIconPc = document.querySelector('.header_nav_sub_mailmag');
    const mailMagIconSp = document.querySelector('.drawer_header_mailmag');
    // ボタン連打による二重処理防止
    if (request) return;
    let url = `contents/libs/registMailmag.php?scd=${mailMagShopCd}&action=stop`;
    fetch(url, {
      method: 'GET',
    }).then((response) => {
      if(response.ok) {
        mailMagIconPc.dataset.targetClass = 'registMailmag';
        mailMagIconPc.classList.remove('active');
        mailMagIconSp.dataset.targetClass = 'registMailmag';
        mailMagIconSp.classList.remove('active');
        $('.stop-mailmag--before').fadeOut(100, function () {
          $('.stop-mailmag--after').fadeIn();
        });
      }
    });
  });
  // 推測されるJavaScriptの処理
  const noMoreShopBtn = document.querySelector('.js-show-nomore-shop-modalClass')
  noMoreShopBtn.addEventListener('click', () => {
    // data-target-classの値（registMailmag）を使用してモーダルを特定
    const targetModal = document.querySelector('.js-show-nomore-shop');
    
    // hiddenクラスを削除してモーダルを表示
    targetModal.classList.remove('hidden');
  });
  
});
/* ------------------------------------------
 * ヘッダーナビ MORE サブメニュー表示時、画面から見切れる場合にケアする
 * NOTE: 横 CSS（リストの幅 20.1rem 1rem:10px）と連動しています
 * NOTE: 縦 CSS (ヘッダー固定)と連動しています
 * PC
------------------------------------------ */
$(() => {
  const _menu_more_pc_class = $('.menu_more_pc_class'),
        _header = $('.shop .header')

  if (_header.length > 0 && _menu_more_pc_class.length > 0) {
    const pos_2 = _menu_more_pc_class.position().left + (20.1 * 10 * 2),
          pos_3 = _menu_more_pc_class.position().left + (20.1 * 10 * 3),
          tgt_2 = $('ul ul ul', _menu_more_pc_class),
          tgt_3 = $('ul ul ul ul', _menu_more_pc_class),
          _ul = $('ul', _menu_more_pc_class)
    
    let is_change_header_fix = false,
        is_header_fix = true,
        w_header = 0,
        num_loop = 0

    /**
     * MOREのサブメニューを左右どちらに展開するか決定する
     */
    const setMenuDirection = () => {
      const _w = window.innerWidth

      if (_w < pos_2) {
        tgt_2.each(function () {
          const _p = $(this).closest('li')

          _p.addClass('view-left')
        })        
      } else if (_w < pos_3) {
        tgt_3.each(function () {
          const _p = $(this).closest('li').closest('ul').closest('li')

          _p.addClass('view-left')
        })
      } else {
        $('.view-left', _menu_more_pc_class).removeClass('view-left')
      }
    }

    /**
     * MOREのサブメニューを非表示にする（headerを固定に戻す）
     */
    const hideMoreSub = () => {
      if ((_ul.css('opacity') == 0 && _ul.css('visibility') == 'hidden') || num_loop === 3) {
        _header.removeClass('header-no-fix').css({
          width: '100%'
        })
        _menu_more_pc_class.removeClass('js-menu_more_pc_class-show')

        num_loop = 0
        is_header_fix = true
        
        _ul.hide()
        setTimeout(() => {
          _ul.show()
        }, 350)
      } else {
        setTimeout(() => {
          num_loop++
          hideMoreSub()
        }, 350)
      }
    }

    /**
     * MOREのサブメニューを表示にする（header固定を解除する）
     */
    const showMoreSub = () => {

      if (is_change_header_fix) {

        if (is_header_fix) {
          is_header_fix = false
          w_header = _header.width()
          window.scrollTo(0, 0)
          _header.addClass('header-no-fix').css({
            width: w_header
          })
          _menu_more_pc_class.addClass('js-menu_more_pc_class-show')
        }
      } else {
        _menu_more_pc_class.addClass('js-menu_more_pc_class-show')
      }
    }

    /**
     * header固定を解除する必要あるか判別する
     */
    const checkChangeHeaderFix = (tgt = undefined) => {
      const _h = window.innerHeight,
            _w = window.innerWidth

      let h_ul_max = 0

      $('ul', _menu_more_pc_class).each(function () {
        const _this = $(this),
              pos_this = Math.ceil(_this.outerHeight(true)) + Math.ceil(_this.offset().top) - Math.ceil(window.pageYOffset)

        h_ul_max = Math.max(h_ul_max, pos_this)
      })

      is_change_header_fix = (_h - (h_ul_max + 50) < 0 && _w >= 1001)
    }


    // 初期
    setMenuDirection()
    checkChangeHeaderFix()
    $(window).on('resize', () => {
      setMenuDirection()
      checkChangeHeaderFix()
    })

    _menu_more_pc_class.hover(showMoreSub, hideMoreSub).on('click', showMoreSub)
  }
})

