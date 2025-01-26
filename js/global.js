$(function () {
  (function () {
    var viewport = $('meta[name="viewport"]');
    var viewportSet = function () {
      if (screen.width > 767 && screen.width < 1200) {
        viewport.attr('content', 'width=1400');
      } else {
        viewport.attr('content', 'width=device-width, initial-scale=1');
      }
    };
    viewportSet();
    window.onload = function () {
      viewportSet();
    };
    window.onresize = function () {
      viewportSet();
    };
  })();

  // SPヘッダー
  {

    function hideCategory() {
      // ボタン
      $('.js-toggleNextCategory').removeClass('is-active');
      // 2階層目
      $('.js-toggleCategory').hide();
      $('.js-categoryMenu-bgLayer').hide();
    }
    function showCategory(self) {
      $(self).addClass('is-active');
      // ２階層目をすべて非表示
      $('.js-toggleCategory').removeClass('is-active');
      // 押下された次の要素の２階層目表示
      $(self).next().show();
      $('.js-categoryMenu-bgLayer').show();
    }
    //　閉じるボタン、bgLayer
    $('.js-close-categoryMenu').on('click', function () {
      hideCategory();
    });

    $('.js-toggleNextCategory').on('click', function () {
      // 表示済みのカテゴリーを非表示
      hideCategory();
      // 最初の押下
      if (!$(this).hasClass('is-active')) {
        showCategory(this);
      }
    });

    // drawerMenu
    $('.js-show-drawerMenu').on('click', function () {
      $('.js-drawerMenu').addClass('is-visible');
      $('.js-drawerMenu-overlay').fadeIn('fast');
    });

    $('.js-drawerMenu-overlay').on('click', function () {
      $(this).fadeOut();
      $('.js-drawerMenu').removeClass('is-visible');
    });
  }

  (function () {
    $('.js-show-modalClass').on('click', function () {
      var target = $(this).data('targetClass');
      $('.js-modal-' + target).fadeIn();
    });

    // 全画面表示のモーダルでは使わない予定
    $('.js-show-modal-overlay').on('click', function () {
      $('.js-modal-overlay').fadeIn();
    });

    // 閉じるボタン、（半）透明レイヤー
    $('.js-close-modal, .js-modal-overlay').on('click', function () {
      $('.js-modal-closeTarget').fadeOut();
      $('.js-modal-overlay').fadeOut();
    });
  })();

  // アコーディオン
  $(document).on('click', '.js-accordion-trigger', function () {
    var scope = $(this).closest('.js-accordion-scope');

    $('.js-accordion-body').removeClass('is-active');

    $(this).toggleClass('is-active');
    scope.find('.js-accordion-body').first().slideToggle('fast');
  });

  // ページの先頭へ
  $(function () {
    $('.js-pageToTop').on('click', function () {
      var speed = 200;

      $('body, html').animate({ scrollTop: 0 }, speed, 'swing');
      return false;
    });
  });
  if (screen.width > 1000) {
    const pageTop = document.querySelector('.pagetop');
    window.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        pageTop.classList.add('hide');
      } else {
        pageTop.classList.remove('hide');
      }
    });
  }
});
