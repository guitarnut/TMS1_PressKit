var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'XXX']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackEvent(e) {
    _gaq.push(['_trackEvent', 'Click', e]);
}

// tracked items
$('[me]').click(function() {
   var v = $(this).attr('ui-data-target');
    trackEvent(v);
});