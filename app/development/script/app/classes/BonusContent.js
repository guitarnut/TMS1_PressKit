// requires jquery, gsap

function BonusContent(el, div, overlay, menu) {
    var TIMER = 12000,
        DELAY = 5000,
        ODDS = .1,
        _randomTimer;

    var _bonusItems = ['bonus1.jpg', 'bonus2.jpg', 'bonus3.jpg'],
        _bonusText = [
            'We\'ll never stop looking...',
            'I found something... Oscar\'s yellow scarf.',
            'This is his drawing... it was in the basement. They had him.'
        ];

    var $el = $(el),
        $div = $(div),
        $bonusImage = $('#bonusImage'),
        $bonusText = $('#bonusText');

    $el.hide();
    $el.click(function () {
        selectContent();
        hideIcon();
    });

    $div.find('.close:eq(0)').click(function() {
        $div.hide();
        overlay.hide();
        menu.showMenu();
    });

    _randomTimer = setInterval(function () {
        var n = Math.random() * 10,
            o = ODDS * 10;
        if (n > o) {
            showIcon();
        }
    }, TIMER);

    function selectContent() {
        var c = Math.floor(Math.random() * _bonusItems.length);

        $bonusImage.attr('src', 'img/'+_bonusItems[c]);
        $bonusText.text(_bonusText[c]);
        $div.show();
        overlay.dim(.95);
        menu.hideMenu();

        _bonusItems.splice(c, 1);
        _bonusText.splice(c, 1);

        // all done
        if (_bonusItems.length < 1) {
            clearInterval(_randomTimer);
            $el.unbind('click');
        }
    }

    function showIcon() {
        $el.css({
            'opacity': '0'
        });

        $el.show();

        TweenLite.to($el, 1, {opacity:.3});

        setTimeout(function () {
            hideIcon()
        }, DELAY);
    }

    function hideIcon() {
        TweenLite.to($el, 1, {opacity: 0, onComplete: function () {
            $el.hide()
        }});
    }
}