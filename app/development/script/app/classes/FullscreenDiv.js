// requires jQuery

function FullscreenDiv(el) {

    var $el = $(el);

    this.resize = function () {
        $el.css({
            'position': 'fixed',
            'z-index': '0',
            'top': '0',
            'left': '0',
            'width': window.innerWidth + 'px',
            'height': window.innerHeight + 'px'
        })

    };

    this.resize();
}