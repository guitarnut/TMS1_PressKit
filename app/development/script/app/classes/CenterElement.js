// requires jQuery

function CenterElement(el) {

    var $el = $(el);

    this.reset = function () {
        $el.css({
            'position': 'fixed',
            'z-index': '10',
            'top': '50%',
            'left': '50%',
            'margin-left': -1*$el.width() / 2 + 'px',
            'margin-top': -1 * $el.height() / 2 + 'px'
        })
    };

    this.reset();

    this.getEl = function() {
        return $el;
    }
}