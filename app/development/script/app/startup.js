$(function () {
//-------------------- SETUP ------------------//

    // image assets
    var introImages = ['img/bg_intro2.jpg'],
        galleryImages = ['img/gallery1.jpg', 'img/gallery2.jpg', 'img/gallery3.jpg', 'img/gallery4.jpg', 'img/gallery5.jpg', 'img/gallery6.jpg', 'img/gallery7.jpg', 'img/gallery8.jpg', 'img/gallery9.jpg', 'img/gallery10.jpg', 'img/gallery11.jpg', 'img/gallery12.jpg', 'img/gallery13.jpg', 'img/gallery14.jpg', 'img/gallery15.jpg', 'img/gallery16.jpg', 'img/gallery17.jpg', 'img/gallery18.jpg'],
        bgImages = ['img/bg_ta.jpg', 'img/bg_2.jpg', 'img/bg_3.jpg', 'img/bg_4.jpg', 'img/bg_5.jpg', 'img/bg_6.jpg', 'img/bg_7.jpg', 'img/bg_8.jpg', 'img/bg_9.jpg', 'img/bg_10.jpg', 'img/bg_11.jpg', ],
        castImages = ['img/character_1.jpg', 'img/character_2.jpg', 'img/character_3.jpg', 'img/character_4.jpg'];

    // preloader values
    var loaded = 0,
        totalImages = 0,
        preloadSets = [bgImages, galleryImages, introImages, castImages],
        $preloader = $('#preloader');

// intro and global elements
    var overlay = new Overlay('#overlay'),
        menu = new Menu('#menu', '.menuOption', '#menuToggleOn', '#menuToggleOff', overlay),
        intro1 = new ScrollDiv('#introFrame1', ['.quote'], '#000'),
        intro2 = new ScrollDiv('#introFrame2', ['.quote']),
        homepageTA = new TitleArt('#ta', '#ta2', 40, 0, 10, 60, 800),
        keyBG = new FullscreenDiv('#keyBG'),
        keyBGAnimation = new BackgroundGallery('#keyBG', bgImages, homepageTA);

    var $tasm = $('#ta2');

// individual page content
//var contentBoxes = [];
    var about = new Content($('#about'), '90', keyBGAnimation, '.close'),
        gallery = new Content($('#gallery'), '90', keyBGAnimation, '.close', true),
        cast = new Content($('#cast'), '90', keyBGAnimation, '.close', true),
        episode = new Content($('#episode'), '90', keyBGAnimation, '.close'),
        production = new Content($('#production'), '90', keyBGAnimation, '.close'),
        video = new Content($('#video'), '90', keyBGAnimation, '.close'),
        starz = new Content($('#starz'), '90', keyBGAnimation, '.close');

//contentBoxes.push(about, gallery, cast, production, starz);
    var currentContent = null;

// cast photos
    var castPhotos = [];

    $('.castMember').each(function () {
        var c = new Cast($(this));
        castPhotos.push(c);
    });

// gallery images
    new GalleryImage('.galleryImg', '#selectedImage');

// nav
    var aboutButton = new NavButton($('[data-nav="about"]'), function () {
            hideCurrent(about);
        }),
        galleryButton = new NavButton($('[data-nav="gallery"]'), function () {
            hideCurrent(gallery);
        }),
        castButton = new NavButton($('[data-nav="cast"]'), function () {
            hideCurrent(cast);
        }),
        episodeButton = new NavButton($('[data-nav="episode"]'), function () {
            hideCurrent(episode);
        }),
        productionButton = new NavButton($('[data-nav="production"]'), function () {
            hideCurrent(production);
        }),
        videoButton = new NavButton($('[data-nav="video"]'), function () {
            hideCurrent(video);
        }),
        starzButton = new NavButton($('[data-nav="starz"]'), function () {
            hideCurrent(starz);
        });

    var bonus = BonusContent('#bigEars', '#bonus', overlay, menu);

// bind methods to user keyboard input
    KeyListener.setMethod(27, menu.close);

//-------------------- WINDOW RESIZING ------------------//

// handle user browser adjustments
    window.onresize = function () {
        resizeElements();
    };

    function resizeElements() {
        intro1.resize();
        intro2.resize();
        keyBG.resize();
        homepageTA.reset();
        overlay.resize();
        VideoPlayer.size();
        menu.reset();

        for (var i = 0; i < castPhotos.length; i++) {
            castPhotos[i].resize();
        }
    }

//-------------------- FUNCTIONS ------------------//

// handle nav clicks
    function hideCurrent(c) {
        $tasm.fadeTo('fast', 0);
        if (currentContent != null) {
            if (c) {
                currentContent.hide(c);
            } else {
                currentContent.hide();
            }
        } else {
            if (c)c.show();
        }

        if (c) {
            currentContent = c;
        } else {
            currentContent = null;
        }

        // kill any video
        VideoPlayer.stop();
    }

// main user interface
    function showInterface() {
        menu.showMenu();
        overlay.hide();
        keyBGAnimation.start();
        homepageTA.arm();
    }

// content sections
    function playIntro() {
        menu.hideMenu();
        overlay.show();

        intro1.show('right', 2, 0, 5, function () {
            intro2.show('left', 4, 0, 3, function () {
                showInterface();
            });
        });
    }

//-------------------- PRELOADING ------------------//

    // image preloader
    function loadAssets(c) {
        var currentSet = c || 0;

        // how many images are we loading today?
        if (totalImages === 0) {
            for (var i = 0; i < preloadSets.length; i++) {
                totalImages += preloadSets[i].length;
            }
        }

        // load from the current set
        for (var j = 0; j < preloadSets[currentSet].length; j++) {
            var img = new Image();
            img.src = preloadSets[currentSet][j];
            img.onload = imgLoaded();

            // are we ready for the next set?
            if (j === preloadSets[currentSet].length - 1) {
                currentSet++;

                if (currentSet < preloadSets.length) {
                    loadAssets(currentSet);
                } else {
                }
            }
        }
    }


    function imgLoaded() {
        loaded++;

        $preloader.children('p').text('Loading image ' + loaded + ' of ' + totalImages + '...');

        if (loaded == totalImages) {
            $preloader.remove();
            resizeElements();
            playIntro();
            // skip the intro
            //showInterface();
        }
    }

    loadAssets();

});