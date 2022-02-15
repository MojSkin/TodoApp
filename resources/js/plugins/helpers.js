import persianJS from 'persianjs'
import * as moment from "jalali-moment";

export default {
    humanReadableFileSize(size) {
        let result = ''
        size = parseInt(size)
        if (typeof size=='number' && !isNaN(size)) {
            if (size<1024) {
                result = (size).toFixed(2) + ' کیلوبایت'
            } else if (size>=1024 && size<=819200) {
                result = (size/1024).toFixed(2)+' مگابایت'
            } else {
                result = (size/1048576).toFixed(2)+' گیگابایت'
            }
        } else {
            result ='ورودی نامعتبر'
        }
        return result
    },

    wait(ms) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < ms);
        return true;
    },

    csrf() {
        return document.head.querySelector('meta[name="csrf-token"]').content;
    },

    makeAbbr(name) {
        const userName = name.split(' ');
        return userName[0].trim().substr(0, 1) + (userName.length > 1 ? ' ' + userName[userName.length - 1].trim().substr(0, 1) : '')
    },

    settings(prop) {
        return Settings[prop]
    },

    jdate(date = Date.now(), format = 'jYYYY/jMM/jDD', fromFormat = null) {
        if (fromFormat) {
            return date ? moment.from(date, 'en', fromFormat).locale("fa").format(format) : '-'
        } else {
            return date ? moment(date).locale("fa").format(format) : '-'
        }
    },

    jdateNow(date = Date.now()) {
        return date ? moment(date).locale("fa").fromNow() : '-'
    },

    arabicChar: function (str) {
        return persianJs(str.toString()).arabicChar().toString()
    },

    persianNumber: function (str) {
        return persianJs(str.toString()).persianNumber().toString()
    },

    arabicNumber: function (str) {
        return persianJs(str.toString()).arabicNumber().toString()
    },

    englishNumber: function (str) {
        return persianJs(str.toString()).englishNumber().toString()
    },

    toEnglishNumber: function (str) {
        return persianJs(str.toString()).toEnglishNumber().toString()
    },

    fixURL: function (str) {
        return persianJs(str.toString()).fixURL().toString()
    },

    decodeURL: function (str) {
        return persianJs(str.toString()).decodeURL().toString()
    },

    switchKey: function (str) {
        return persianJs(str.toString()).switchKey().toString()
    },

    digitsToWords: function (str) {
        return persianJs(str.toString()).digitsToWords().toString()
    },

    halfSpace: function (str) {
        return persianJs(str.toString()).halfSpace().toString()
    },

    console_log() {
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i])
        }
    },

    compare(side_a, side_b, a_side_is_bigger) {
        if (a_side_is_bigger) {
            return side_a - side_b
        } else {
            return side_b - side_a
        }
    },

    copyToClipboard(text) {
        $('body').append('<input id="thisIsMyTempInput" value="' + text + '">')
        var copyText = document.getElementById("thisIsMyTempInput");
        copyText.select()
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand('copy')
        copyText.remove()
    },

    responseTime(seconds) {
        var days = Math.floor((seconds % 31536000) / 86400);
        var ext_min = Math.floor(((seconds % 31536000) % 86400) / 60);
        var hours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        var minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var sec = (((seconds % 31536000) % 86400) % 3600) % 60;
        var result = ''
        if (days >= 30) {
            result = 'بیشتر از یک ماه'
        } else {
            if (days >= 7) {
                result = 'بیشتر از یک هفته'
            } else {
                if (days > 1 || (days == 1 && ext_min > 0)) {
                    result = 'بیشتر از یک روز'
                } else {
                    if (hours > 2 || (hours == 2 && (minutes > 0 || sec > 0))) {
                        result = 'حدود ' + hours + ' ساعت'
                    } else {
                        if (hours == 0) {
                            if (minutes >= 45) {
                                result = 'کمتر از یک ساعت'
                            } else if (minutes >= 30 || minutes < 45) {
                                minutes = 45
                            } else if (minutes >= 15 || minutes < 30) {
                                minutes = 30
                            } else if (minutes >= 5 || minutes < 15) {
                                minutes = 15
                            } else {
                                minutes = 5
                            }
                            result = 'کمتر از ' + minutes + ' دقیقه'
                        } else {
                            result = 'بین یک الی دو ساعت'
                        }
                    }
                }
            }
        }
        return result
    },

    notify(message, user_options) {
        const default_action = {
            text: 'بستن',
            onClick: (e, toastObject) => {
                toastObject.goAway(0);
            }
        }
        const options = {
            action: (user_options != null && typeof user_options.action != 'undefined') ? user_options.action : null,
            position: (user_options != null && typeof user_options.position != 'undefined') ? user_options.position : 'bottom-left',
            duration: (user_options != null && typeof user_options.duration != 'undefined') ? user_options.duration : 3000,
            keepOnHover: (user_options != null && typeof user_options.keepOnHover != 'undefined') ? user_options.keepOnHover : true,
            fullWidth: (user_options != null && typeof user_options.fullWidth != 'undefined') ? user_options.fullWidth : false,
            fitToScreen: (user_options != null && typeof user_options.fullWidth != 'undefined' && user_options.fitToScreen) ? user_options.fitToScreen : false,
            iconPack: (user_options != null && typeof user_options.iconPack != 'undefined') ? user_options.iconPack : 'custom-class',
            icon: (user_options != null && typeof user_options.icon != 'undefined') ? user_options.icon : 'fa fa-check',
            type: (user_options != null && typeof user_options.type != 'undefined') ? user_options.type : 'success',
            theme: (user_options != null && typeof user_options.theme != 'undefined') ? user_options.theme : 'bubble',
            onComplete: (user_options != null && typeof user_options.onComplete != 'undefined') ? user_options.onComplete : null,
            closeOnSwipe: (user_options != null && typeof user_options.closeOnSwipe != 'undefined') ? user_options.closeOnSwipe : true,
            singleton: (user_options != null && typeof user_options.singleton != 'undefined') ? user_options.singleton : false,
            className: (user_options != null && typeof user_options.className != 'undefined') ? user_options.className : null,
            containerClass: (user_options != null && typeof user_options.containerClass != 'undefined') ? user_options.containerClass : null,
        }
        Vue.toasted.show(message, options);
    },

    hideMeta(meta = '', starChr = '*', starsLength = 4) {
        const stars = starChr.repeat(starsLength)
        let start = 3;
        let end = meta.length - 3
        if (this.isEmail(meta)) {
            start = start >= meta.indexOf('@') ? meta.indexOf('@') : start;
            end = meta.length - 3;
            end = end <= start ? meta.length-1 : end;
        }
        let result = meta.substr(0, start) + stars + meta.substr(end);
        return result;
    },

    isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },

    priceFormat(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
}
