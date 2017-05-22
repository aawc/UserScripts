// ==UserScript==
// @name           UTC to local time converter
// @namespace      https://github.com/aawc/UserScripts/raw/master/chromium-utc-to-local-time.js
// @description    Make times on codereview.chromium.org local to make them easier to read.
// @match          https://codereview.chromium.org/*
// @version        0.1
// ==/UserScript==

// Inspired by a private gist from danbeam@

(function(document) {
    var y = ', ' + new Date().getFullYear();
    var j = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var re = /(.*)\((.* UTC)\)(.*)/;

    [].forEach.call(document.querySelectorAll(
        '#messages tr.comment_title td:nth-of-type(3)'), function (el, i) {
        if (i === 0) {
            el.width = 160;
        } else {
            var found = el.innerHTML.replace(/[\r\n]+/g," ").match(re);
            if (found && found[2]) {
                var d = new Date(found[2]);
                el.innerHTML = found[1] + '(' +
                    j[d.getDay()] + ' ' + m[d.getMonth()] + ' ' +
                    (d.getDate() < 10 ? '0' : '') + d.getDate() + ', ' +
                    (d.getHours() > 12 ? (d.getHours() - 12 === 0 ? '12' : d.getHours() - 12) :
                     (d.getHours() === 0 ? '12' : d.getHours())) + ':' +
                    (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ' ' +
                    (d.getHours() > 12 ? 'p' : 'a') + 'm)' + found[3];
            }
        }
    });
}(unsafeWindow.document));
