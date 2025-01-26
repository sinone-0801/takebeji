/**
 * ショップトップ メインビジュアル
 * 新スライダーPC、新スライダーSP
 * （jQueryライブラリ slick.js を使用しています）
 */
$(() => {

  // NOTE: 
  // SPとPCの切り替えは640pxをブレイクポイントとする(タブレットやスマホ横向きではPCビューを表示する)
  // 修正する場合は、CSSの修正も必要
  const break_width = 640

  /**
   * ブレイクポイントでデザインを切り替える
   * 
   * @param {object} mainvisual* jQueryで指定する要素 例) $('.js-slick') 
   */
  const setMainvisualType = (mainvisual) => {
    const _w = window.innerWidth

    if (_w > break_width) {
      mainvisual.removeClass('mainvisual--sp').addClass('mainvisual--pc')
    } else {
      mainvisual.removeClass('mainvisual--pc').addClass('mainvisual--sp')
    }
  }  

  /**
   * スライダーをセットし、表示する
   * 
   * @param {object} tgt* jQueryで指定する要素 例) $('.js-slick')  
   */
  const slickMainvisual = (tgt) => {
    const mainvisual = tgt.closest('.js-mainvisual'),
          mainvisual_theme = mainvisual.attr('data-theme'),
          mainvisual_img = $('.js-mainvisual-img', mainvisual),
          outer = $('.js-mainvisual-outer', mainvisual),
          outer_bg = $('.js-mainvisual-outer-bg', mainvisual),
          outer_link = $('.js-mainvisual-outer-link', mainvisual)

    const slide_length = $('> *', tgt).length

    let option = {},
        can_sliding
    
    // テーマ別
    switch (mainvisual_theme) {
      case 'rich-pcsp':
      case 'rich-pc':
      case 'rich-sp':
      case 'corporate-pcsp':
      case 'corporate-pc':
      case 'corporate-sp':
      case 'botanical-pcsp':
      case 'botanical-pc':
      case 'botanical-sp':
        option = {
          autoplay: true,          
          arrows: false
        }      

        // PC、もしくは、PCとSP兼用の場合
        if (mainvisual_theme === 'rich-pcsp' || 
            mainvisual_theme === 'rich-pc' || 
            mainvisual_theme === 'corporate-pcsp' || 
            mainvisual_theme === 'corporate-pc' || 
            mainvisual_theme === 'botanical-pcsp' || 
            mainvisual_theme === 'botanical-pc') {
          
          outer.html($('.js-mainvisual-text:first', tgt).html())
          outer_bg.attr('style', $('.js-mainvisual-text:first', tgt).attr('style'))
          outer_link.attr('href', $('a:first', tgt).attr('href'))

          tgt.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            const next = $('.slick-slide', this).eq(nextSlide + 1)

            let text = $('.js-mainvisual-text', next).html(),
                bg = $('.js-mainvisual-text', next).attr('style'),
                link = $('a', next).attr('href') || next.attr('href')
            if (link === undefined) {
              outer_link.removeAttr('href')
            } else {
              outer_link.attr('href', link).css({
                left: 0,
                opacity: 0
              })
            }

            if (can_sliding) clearTimeout(can_sliding)
            can_sliding = setTimeout(() => {
              outer.html(text)
              outer_bg.attr('style', bg)
              outer_link.animate({
                opacity: 1
              }, 650, 'linear')
            }, 85)
          })
        }

        // ナチュラル以外、かつ、PCとSPを兼用する場合
        if (mainvisual_theme === 'rich-pcsp' || 
            mainvisual_theme === 'corporate-pcsp' || 
            mainvisual_theme === 'botanical-pcsp') {

          mainvisual.removeClass('mainvisual--pcsp')
          $(window).on('resize', () => {
            setMainvisualType(mainvisual)
          })
          setMainvisualType(mainvisual)
        }
        
        break;

      case 'natural-pcsp':
      case 'natural-pc':
      case 'natural-sp':

        option = {
          autoplay: true,          
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          centerMode: true,
          arrows: false  
        }
        break;
      
      // default なし
    }
    
    tgt.on('init', () => {
      mainvisual.removeClass('mainvisual--init')

      mainvisual_img.each(function () {
        const _this = $(this),
              _img = new Image()

        _img.src = $(this).attr('data-img')
        _this.removeAttr('data-img')      
        _img.onerror = () => {
          _this.addClass('noimage').removeAttr('style')
        }
      })
    })

    if (slide_length > 1) {
      option.dots = true
      option.dotsClass = 'mainvisual__dots'      
    } else {
      option.dots = false
      mainvisual.addClass('mainvisual--one')
    }
        
    tgt.slick(option)
  }

  $('.js-slick-mainvisual').each(function () {
    slickMainvisual($(this))
  })
})
