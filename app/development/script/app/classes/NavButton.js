// requires jquery

function NavButton(el, action) {
    var $el = $(el),
        _action = action;

    $el.click(function() {
        _action();
    });
}