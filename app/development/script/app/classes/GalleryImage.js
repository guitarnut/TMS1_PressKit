// requires jquery, gsap

function GalleryImage(el, target) {
    var $el = $(el),
        $target = $(target).children('img:eq(0)'),
        _currentEl = 0,
        _totalEl = $(el).length;

    $el.each(function () {
        var $this = $(this);

        $this.css({
            'opacity': '0.3'
        });
    });

    $(el).click(function () {
        var $this = $(this);
        // keep track of where we are
        _currentEl = $this.index() - 3;
        thumbClicked(_currentEl);
        swapImage(getSource($this));
    });

    $target.click(function () {
        _currentEl++;
        if (_currentEl === _totalEl) _currentEl = 0;
        var newThumb = getSource($(el + ':eq(' + _currentEl + ')'));
        thumbClicked(_currentEl);
        swapImage(newThumb);
    });

    function swapImage(src) {
        $target.attr('src', src);
    }

    function thumbClicked(i) {
        $(el + ':eq(' + i + ')').css({
            'opacity': '1'
        })
    }

    function getSource(e) {
        return src = e.children('img:eq(0)').attr('src');
    }

    // store the first image we're on
    _currentEl = 0;
    thumbClicked(_currentEl);
}