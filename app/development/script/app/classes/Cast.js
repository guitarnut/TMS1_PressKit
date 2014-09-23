// requires jquery, gsap

function Cast(el) {
    var $el = $(el);

    var $img = $el.children('.castImg:eq(0)'),
        $text = $el.children('.castText:eq(0)');

    var _height,
        _open = false;

    $text.css({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'opacity': '0'
    });

    $el.click(function () {
        if (!_open) {
            showText();
        } else {
            hideText();
        }

        _open = !_open;
    });

    this.resize = function () {
        _height = $img.height() + 'px';

        if ($text.height() <= $img.height()) {
            $text.css({
                'height': _height
            });
        }
    };

    this.resize();

    function showText() {
        TweenLite.to($img, .5, {opacity: .2});
        $text.show();
        TweenLite.to($text, 1, {opacity: 1});
    }

    function hideText() {
        TweenLite.to($img, .5, {opacity: 1});
        TweenLite.to($text, 1, {opacity: 0, onComplete: function () {
            $text.hide();
        }});
    }
}