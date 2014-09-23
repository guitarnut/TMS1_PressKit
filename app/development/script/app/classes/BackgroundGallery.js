// requires jquery, gsap

function BackgroundGallery(el, images, ta) {
    var TIMER = 18000,
        TWEEN = 4,
        _interval,
        _opacity = 1,
        _animating = false,
        _this = this,
        _ta = ta,
        _firstrun = true,
        _firstImage = true;

    var $el = $(el),
        _images = images,
        _currentImage;

    _currentImage = _images[0];

    $($el).click(function () {
        if ((!_animating)&&(!_firstImage)) {
            changeBG(1);
            if (_firstrun) {
                _firstrun = false;
                _ta.cancel();
            }
            _this.stop();
            _this.start();
        }
    });

    this.start = function () {
        _interval = setInterval(function () {
            changeBG();
            _firstImage = false;
        }, TIMER);
    };

    this.stop = function () {
        clearInterval(_interval);
    };

    function changeBG(newTween) {
        TWEEN = newTween || 4;
        _animating = true;
        var i = _images.indexOf(_currentImage);
        i++;

        if (i === _images.length)i = 0;

        _currentImage = _images[i];

        fadeOut();
    }

    function fadeOut() {
        TweenLite.to($el, TWEEN, {opacity: 0, onComplete: swapImage});
    }

    function swapImage() {
        $el.css({
            'background-image': 'url(' + _currentImage + ')'
        });

        fadeIn();
    }

    function fadeIn() {
        _animating = false;
        TweenLite.to($el, TWEEN, {opacity: _opacity});
    }

    this.setDim = function (d) {
        _opacity = d;
        if (!_animating)TweenLite.to($el, TWEEN / 8, {opacity: d});
    };

    this.reset = function () {
        _opacity = 1;
    }

}