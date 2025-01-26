$(function () {
  
  let clientWidth_isPC = function () {
    return document.documentElement.clientWidth > 1001;
  }

  const width_isPC = function () {
    return window.innerWidth >= 1001 || document.documentElement.clientWidth > 1001
  }

  // SPファーストビュー
  function spFirstviewSlider() {
    
    const elem = $('.js-slider-firstview');
    if (elem.length) {
      if (!width_isPC()) {
        elem.not('.slick-initialized').slick({
          autoplay: true,
          initialSlide: 0,
          centerMode: true,
          variableWidth: true,
          dots: false,
          arrows: false,
        });
      } else {
        $('.js-slider-fanclub.slick-initialized').slick('unslick');
        elem.removeClass('slick-initialized');
      }   
    }
  }
  window.addEventListener('resize', spFirstviewSlider);
  spFirstviewSlider();

  // 20220325：htmlの修正を避ける指示があった為こちらで指定
  function spSliderStyle(elem) {
    elem.removeClass('slick-initialized');
    elem.css({
      display: 'flex',
      'overflow-x': 'auto',
    });
  }

  // ファンクラブ商品一覧
  function fanclubSlider() {
    const elem = $('.js-slider-fanclub');
    if (elem.length) {
      if (clientWidth_isPC()) {
        elem.not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 6,
          slidesToScroll: 6,
          initialSlide: 0,
          variableWidth: true,
          dots: false,
          arrows: true,
        });
      } else {
        $('.js-slider-fanclub.slick-initialized').slick('unslick');
        spSliderStyle(elem);
      }
    }
  }
  window.addEventListener('resize', fanclubSlider);
  fanclubSlider();

  // 季節のおすすめ
  function seasonSlider() {
    const elem = $('.js-slider-season');
    if (elem.length) {
      if (clientWidth_isPC()) {
        elem.not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 0,
          variableWidth: true,
          dots: false,
          arrows: true,
        });
      } else {
        $('.js-slider-season.slick-initialized').slick('unslick');
        spSliderStyle(elem);
      }
    }
  }
  window.addEventListener('resize', seasonSlider);
  seasonSlider();

  // 特集
  function featureSlider() {
    const elem = $('.js-slider-feature');
    if (elem.length) {
      if (clientWidth_isPC()) {
        elem.not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 0,
          variableWidth: true,
          dots: false,
          arrows: true,
        });
      } else {
        $('.js-slider-feature.slick-initialized').slick('unslick');
        spSliderStyle(elem);
      }
    }
  }
  window.addEventListener('resize', featureSlider);
  featureSlider();

  // 最近チェックした商品、あなたへおすすめ、あなたへおすすめクーポン、残りわずかなお気に入り商品
  function otherSlider() {
    let sectionArr = ['checkedItem', 'recommendForYou', 'recommendCoupon', 'favoriteItem', 'prItem'];
    sectionArr.forEach(function (section) {
      const elem = $('.js-slider-' + section);
      if (elem.length) {
        if (clientWidth_isPC()) {
          elem.not('.slick-initialized').slick({
            infinite: false,
            // PR無しのとき
            slidesToShow: 7,
            slidesToScroll: 7,
            initialSlide: 0,
            variableWidth: true,
            dots: false,
            arrows: true,
          });
        } else {
          $('.js-slider-' + section + '.slick-initialized').slick('unslick');
          spSliderStyle(elem);
        }
      }
    });
  }
  window.addEventListener('resize', otherSlider);
  otherSlider();

  // ツクツクからのおすすめ
  function tsuku2RecommendSlider() {
    const elem = $('.js-slider-tsuku2Recommend');
    if (elem.length) {
      if (clientWidth_isPC()) {
        elem.not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 7,
          slidesToScroll: 7,
          initialSlide: 0,
          variableWidth: true,
          dots: false,
          arrows: true,
        });
      } else {
        $('.js-slider-tsuku2Recommend.slick-initialized').slick('unslick');
        spSliderStyle(elem);
      }
    }
  }
  window.addEventListener('resize', tsuku2RecommendSlider);
  tsuku2RecommendSlider();

  // タブ
  (function () {
    $('.js-tabBtn').on('click', function () {
      var index = $(this).index();
      var scope = $(this).closest('.js-tabScope');

      scope.find('.js-tabBtn').removeClass('is-active');
      $(this).addClass('is-active');
      scope.find('.js-tabContents').removeClass('is-active').eq(index).addClass('is-active');
    });
  })();

  // ファンクラブ枠用商品
  $('.js-slider-fanclub-recommend').slick({
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    variableWidth: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });
});

/* 画像リンク切れの際にNoimageを表示*/
function imgError(image, url) {
  image.onerror = "";
  image.src = url + "/assets/img/noimage_seihoukei_gray.svg";
  return true;
}
/* バリエーション商品を含めた在庫が1以上ある場合はsoldoutを外す処理 */
const getItemStockWithChild = () => {
  // 在庫がない商品のDOM要素を取得
  const soldout = document.querySelectorAll('.soldout, .sold-out');
  // 在庫がない商品のcl_stm_item_cdを配列に格納
  let item_cd_list = [];
  soldout.forEach((element, index) => {
    if (soldout[index].hasAttribute('id')) {
      item_cd_list.push(element.id);
    }
  });
  // 在庫なしの商品がない場合は処理を終了
  if (item_cd_list.length == 0) return;
  // バリエーション商品を含めた在庫を取得するAPIを叩く
  const url = ""
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cl_stm_item_cds: item_cd_list })
  })
    .then(response => response.json())
    .then(data => {
      if (data.length == 0) return;
      data.forEach((element, index) => {
        // 在庫が1以上ある場合はsoldoutを外す
        if (data[index].all_stock > 0) {
          const soldout = document.getElementById(data[index].cl_stm_item_cd);
          soldout.classList.remove('soldout');
          soldout.classList.remove('sold-out');
          soldout.classList.remove('soldout-color');
        }
      });
    });
}
window.addEventListener('load', getItemStockWithChild);

$(function(){
  /*--------------------------
    サジェスト関連
	---------------------------- */
  /* サジェスト：セット */
  const initSearchSuggest = (targetID) => {
    const _target = $(targetID)

    if(!_target.length) return
    
    const _btnClear = $(_target.attr('data-clear-button'))
    const suggestID = _target.attr('data-suggest').replace('#','')
    const _suggest = $('#'+suggestID)

    _target.attr('autocomplete', 'off')
    
    if(_target.parent().css('position') == 'static') _target.parent().css({'position':'relative'}) // 親要素を親にする

    
    _target.on('focus blur', fncSuggestFocus)             // イベント設定：フォーカス関連
    if(_btnClear.length) _btnClear.on('mousedown touchstart', fncClearButton)  // イベント設定：クリアボタン
    _target.on('input keyup', fncKeywordInput)                  // イベント設定：キーワード入力

    const _parentForm = _target.closest('.modal-content').find('form')
    if(_parentForm.length) {
      _parentForm.off('submit', searchSubmitModalSP).on('submit',searchSubmitModalSP)
    }
  }

  // キーワード入力：フォーカス
  const fncSuggestFocus = (evt) => {
    const suggest = getSuggestGroup($(evt.currentTarget))
    const _label = suggest.target.next('label')

    switch(evt.type) {
      case 'focus':
        if(_label.length) {
          if(!_label.hasClass('active')) _label.addClass('active')
        }
        if(suggest.target.val().length > 0) {
          getSuggestItems(suggest)  // 取得：サジェストアイテム
        }
        break
      case 'blur':
        if(_label.length) {
          if(suggest.target.val().length <= 0) {
            if(_label.hasClass('active')) _label.removeClass('active')
          }
        }
        dispSuggest(suggest, false) // 非表示：サジェスト
        break
      default: break
    }
  }

  // 処理：クリアボタン
  const fncClearButton =(evt)=> {
    const _target =  $(evt.currentTarget)
    if(!_target.hasClass('active')) return

    const _clearTarget = $('[data-clear-button="#'+_target.attr('id')+'"]')
    _clearTarget.val('')

    checkInputKeyword(_clearTarget)
  }

  // 処理：入力監視
  const fncKeywordInput =(evt)=> {
    checkInputKeyword($(evt.currentTarget),evt.type)
  }

  const getSuggestList = async () => {

    // 商品に紐づくグロ―バルタグの一覧を取得
    const url = ""
    response = await fetch(url, {
      method: 'POST',
    })
    const data = await response.json()
    return data;
  };
  
  // 取得：サジェストデータ（ここで取得・リストを動的生成cdするイメージ）
  const getSuggestItems = async (suggest) => {
    let _suggesgItems = suggest.content.find('li.suggest-item, li.suggest-keyword')

    $('.keywordSearch').text(suggest.target.val())
    // サジェストがある場合：イベント削除
    if(_suggesgItems.length) _suggesgItems.off('click', fncClickSuggest)

    
    if (sessionStorage.getItem('suggestList') === null) {
      // キャッシュがない場合は取得
      let data = await getSuggestList();
      sessionStorage.setItem('suggestList', JSON.stringify(data));
    }
    // キャッシュから取得
    const suggestList = JSON.parse(sessionStorage.getItem('suggestList'));

    // グローバルタグのサジェスト一覧生成
    displaySuggestList = suggestList.filter((tag) => {
      return tag.suggest.some((val) => val.indexOf(suggest.target.val()) === 0)
    });
    var compiled = _.template($("#global-tag-list").html());
    $('.suggest-item').remove()
    const EC = 1;
    const WEBTICKET = 2;
    const FARM = 3;
    for (let i = 0; i < displaySuggestList.length; i++) {
      let contents = ''
      if (displaySuggestList[i].contents === EC) {
        contents = '通販'
      } else if (displaySuggestList[i].contents === WEBTICKET) {
        contents = 'ウェブチケット'
      } else if (displaySuggestList[i].contents === FARM) {
        contents = 'ファーム'
      }
      // サジェストに表示する親カテゴリーの文字列を形成
      let caterory_list = displaySuggestList[i].categories.category1_name + ' > ' +  displaySuggestList[i].categories.category2_name;
      if (displaySuggestList[i].contents === EC) {
        caterory_list = caterory_list + ' > ' + displaySuggestList[i].categories.category3_name + ' > ' + displaySuggestList[i].categories.category4_name
      }
      $('.suggest-items').append(
        compiled({
          'no': displaySuggestList[i].no,
          'type' : displaySuggestList[i].contents + 1,
          'contents': contents,
          'tag_name': displaySuggestList[i].tag_name,
          'category_list': caterory_list
        })
      )
    }
   
    
    // サジェストがある場合：イベント設定
    _suggesgItems = suggest.content.find('li.suggest-item, li.suggest-keyword')

    _suggesgItems.on('click', fncClickSuggest)

    if(suggest.wrap.css('display') == 'none') {
      dispSuggest(suggest, true) // 表示：サジェスト
    }
  }

  // チェック：キーワード入力
  const checkInputKeyword = (_target,type=null) => {
    const suggest = getSuggestGroup(_target)
    switch(type) {
      case 'input':
        if(suggest.target.val().length > 0) {
          if(suggest.button.length) {
            if(!suggest.button.hasClass('active')) suggest.button.addClass('active')
          }
          getSuggestItems(suggest)  // 取得：サジェストアイテム
        }
        break

      default:
        if(suggest.target.val().length < 1) {
          if(suggest.button.length) suggest.button.removeClass('active')
          dispSuggest(suggest, false) // 非表示：サジェスト
        }
        break
    }
  }

  // サジェスト表示・非表示
  const dispSuggest = (suggest,flag)=> {
    if(flag) {
      if(suggest.target.val().length > 0) {
        if(suggest.button.length) {
          if(!suggest.button.hasClass('active')) suggest.button.addClass('active')
        }
      } else {
        if(suggest.button.length) suggest.button.removeClass('active')
      }
      
      if(!suggest.wrap.hasClass('enable')) suggest.wrap.addClass('enable')
      
      checkSuggestHeight(suggest)
      // 初回の高さ取得待機（足りないであれば適宜数値を調整してください）
      setTimeout(()=>{
        suggest.wrap.animate({
          opacity: 1
        },250)
      },250)
      

    } else {
      suggest.wrap.animate({
        opacity: 0
      },250,()=>{
        if(suggest.wrap.hasClass('enable')) suggest.wrap.removeClass('enable')
      })
    }
  }

  // サジェストの高さを設定
  const checkSuggestHeight = (suggest) => {
    if(suggest.wrap.length <= 0) return

    let suggestTimer = false
    suggestTimer = setInterval(()=>{
      if(suggest.wrap.hasClass('enable')) {
        const viewHeight = visualViewport.height
        const opacity = Number(suggest.wrap.css('opacity'))
        const suggestTop = suggest.wrap.offset().top - window.scrollY
        const suggestHeight = suggest.wrap.outerHeight()
        const suggestContentHeight = suggest.content.outerHeight()
        const suggestPad = suggest.wrap.css('padding-top').replace(/[^0-9]/g, '')
        const suggestMaxHeight = suggest.wrap.css('max-height').replace(/[^0-9]/g, '')

        
        if((suggestPad * 2) + 50 < viewHeight) {
          
          if(suggestTop + suggestHeight + 25 > viewHeight) {
            suggest.wrap.css({
              'height' : (viewHeight - suggestTop - 25) + 'px'
            })
          } else {
            // max-height より小さい場合
            if(suggestContentHeight + (suggestPad * 2) < (suggestMaxHeight - (suggestPad * 2))) {
              if((suggestContentHeight + (suggestPad * 2)) + suggestTop < viewHeight) {
                suggest.wrap.css({
                  'height': suggestContentHeight + (suggestPad * 2)
                })
              } else {
                suggest.wrap.css({
                  'height' : (viewHeight - suggestTop - 25) + 'px'
                })
              }

            // max-height を超える場合
            } else {
              suggest.wrap.css({
                'height' : (viewHeight - suggestTop - 25) + 'px'
              })
            }
          }
        } else {
          suggest.wrap.css({
            'height' : ((suggestPad * 2) + 50) + 'px'
          })
        }

      } else {
        clearInterval(suggestTimer)
        suggestTimer = false
        suggest.wrap.css({
          'height' : '0px'
        })
      }
    },200)
  }

  // クリック：サジェストキーワード
  const fncClickSuggest =(evt)=>{
    const _target = $(evt.currentTarget)
    const suggest = getSuggestGroup($('input[data-suggest="#'+ _target.closest('.search-suggest').attr('id')+'"]'))

    // 遷移先のURLのパラメータを出し分け
    let uri = ''
    if (evt.currentTarget.className == 'suggest-item') {
      let tagCd = _target.find('.keyword').attr('data-tag-cd')
      let tagName =  _target.find('.keyword').text()
      let type = _target.find('.type').attr('data-contents');
      uri = "searchRst.php?type=" + type + "&tag_name=" + tagName + "&tag_cd=" + tagCd
    } else if (evt.currentTarget.className == 'suggest-keyword') {
      let keyWord = _target.find('.keyword').text()
      uri = "searchRst.php?type=0&category1=0&keyword=" + encodeURIComponent(keyWord)
    }
    location.href = encodeURI(uri)
    dispSuggest(suggest, false) // 非表示：サジェスト
  }

  // サジェスト関連のパーツ構成を返す
  const getSuggestGroup =(_target)=> {
    const suggestID = _target.attr('data-suggest').replace('#','')
    const _suggest = $(_target.attr('data-suggest'))
    const _suggestContent = _suggest.find('.suggest-items')
    const _btnClear = $(_target.attr('data-clear-button'))

    const parts = {
      'target': _target,          // 対象input
      'id': suggestID,            // サジェストID
      'wrap':_suggest,            // サジェスト本体
      'content': _suggestContent, // コンテンツ
      'button':_btnClear          // inputクリアボタン
    }

    return parts
  }

  /* BODYのスクロール許可・禁止 */
  const scrollPrevent = function(flag) {
    let scPosition;
    const _body = $('body')
    const ua = window.navigator.userAgent.toLowerCase()
    const isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') || ua.indexOf('macintosh') > -1 && 'ontouchend' in document
    const sbWidth = window.innerWidth - document.body.clientWidth


    if(flag) {
      if(_body.css('position') !== 'fixed') {
        _body.css({
          'paddingRight':sbWidth+'px'
        })
        if(isiOS) {
          scPosition = $(window).scrollTop() * -1
          _body.css({
            'position':'fixed',
            'width':'100%',
            'top':scPosition+'px',
            'overflow':'hidden'
          })
        } else {
          _body.css({
            'overflow':'hidden'
          })
        }
      }
    } else {
      if(_body.css('position') == 'fixed') {
        _body.css({
          'paddingRight':''
        })
        if(isiOS) {
          scPosition = parseInt(_body.css('top').replace(/[^0-9]/g, ''))
          _body.css({
            'position':'',
            'width':'',
            'top':'',
            'overflow': ''
          })
          $(window).scrollTop(scPosition)

        } else {
          _body.css({
            'overflow':''
          })
        }
      }
    }
  }

  // 初期化：モーダル：オープンボタン（画面固定用）
  const initBtnOpenSearch = (id)=> {
    const _target = $(id)
    _target.off('click', fncBtnOpenSearch).on('click', fncBtnOpenSearch)
  }
  // モーダル：オープン（画面固定用）
  const fncBtnOpenSearch =(evt)=> {
    evt.stopPropagation()

    const _button = $(evt.currentTarget)
    const _focusInput = $('#' + _button.attr('data-target-modal')).find('input[data-suggest]')
    scrollPrevent(true)

    let openTimer = false
    openTimer = setInterval(()=>{
      _focusInput.focus()

      clearInterval(openTimer)
    },500)
  }
  // 初期化：モーダル：閉じる（画面固定用）
  const initBtnCloseSearch = (id)=> {
    const _target = $(id)
    _target.off('click', fncBtnCloseSearch).on('click', fncBtnCloseSearch)
  }
  // モーダル：閉じる（画面固定用）
  const fncBtnCloseSearch =(evt)=> {
    evt.stopPropagation()
    scrollPrevent(false)
  }

  // 送信：モーダル内
  function searchSubmitModalSP(evt) {
    evt.preventDefault()
    let keyword = $('#txt-keyword').val();
    let uri = "searchRst.php?type=0&category1=0&keyword=" + encodeURIComponent(keyword);
    location.href = encodeURI(uri);
  }
  
  initSearchSuggest('#search-word-pc')
  initSearchSuggest('#keyword-sp')
  initSearchSuggest('#keyword-pc')
  initSearchSuggest('#txt-keyword')

  initBtnOpenSearch('#button-open-search')
  initBtnCloseSearch('#button-close-search')

})

