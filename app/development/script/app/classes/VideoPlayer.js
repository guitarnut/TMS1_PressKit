// requires jquery, video.js

var VideoPlayer = (function () {

    var _player = videojs("videoPlayer1"),
        $el = $('#videoPlayer1'),
        _noVideoMsg = "To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video";

    $('.videoLink').click(function() {
        var $this = $(this);

        var src = $this.attr('data-src'),
            poster = $this.attr('data-poster');

        initPlayer(src, poster);
    });

    function initPlayer(src, poster) {
            // build the new source tags
            _player.src([
                //{ type: "video/mp4", src: src + ".mp4" },
                { type: "video/webm", src: src + ".webm" }
                //{ type: "video/ogg", src: src + ".ogv" }
            ]);

            _player.poster(poster);
    }

    function setSize() {
        // 100% of containing element, 16:9 aspect
        var ratio =9/16;
        var w = Math.round($el.parent().width() * 1),
            h = Math.round(ratio * w);

        _player.width(w);
        _player.height(h);


        style();
    }

    function style() {
        $el.css({
            'margin': '10px auto 10px auto'
        })
    }

    function stop() {
        _player.pause();
    }

    return {
        init: initPlayer,
        size: setSize,
        stop: stop
    }

})();

// set default video
VideoPlayer.init('http://download.starz.com/csid/sr_pk_opening_1410478790', 'img/gallery1.jpg');