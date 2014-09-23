// requires jQuery

function PositionedElement(el, top, left, right, width, maxWidth) {

    var $el = $(el),
        _maxWidth = maxWidth,
        _width = width;

    $el.css({
        'position': 'fixed',
        'z-index': '10',
        'top': top + '%'
    });

    if(left === 0) {
        $el.css({
            'right': right + '%'
        });
    } else {
        $el.css({
            'left': right + '%'
        });
    }

    this.reset = function () {
        if($el.width() > _maxWidth) {
            $el.css({
                'width': _maxWidth + 'px'
            });
            //console.log('adjusting width');
        } else {
            $el.css({
                'width': _width + '%'
            });
            //console.log(' not adjusting width '+$el.width() + ', '+_width+', '+_maxWidth);
        }
    };

    this.reset();

    this.getEl = function () {
        return $el;
    }

}