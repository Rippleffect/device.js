/**
 * device.js
 *
 * Provides device helpers.
 *
 * Dependencies:
 *   - jQuery 1.8.0+
 *   - Modernizr (touch and mq support)
 *
 * @author  James Halsall <jhalsall@rippleffect.com>
 * @license GPL (http://www.gnu.org/licenses/gpl-3.0.html)
 * @version 1.0.0
 *
 * @type {Object}
 */
var device = {

    /**
     * The current device size
     */
    size : null,

    /**
     * An array of functions to call when the device size changes. #
     *
     * Typically items will be added here dynamically from other objects
     *
     * @type {Array}
     */
    onSizeChange : [],

    /**
     * An array of functions to call when the orientation of the device changes.
     *
     * Typically items will be added here dynamically from other objects
     */
    onOrientationChange : [],
    
    /**
     * Initialise
     */
    init : function() {
        device.updateSize();
        device.initSizeListener();
        device.initOrientationListener();
    },

    /**
     * Method that adds a function to the onSizeChange stack so that it is called when the device size changes.
     *
     * Any succeeding parameters after 'func' will be used as arguments to call 'func'
     *
     * For example:
     *
     * device.addSizeChangeEvent(function(name) {
     *     alert(name);
     * }, 'Your Name');
     *
     * Will result in "Your Name" being alerted whenever the size of the current device changes classification
     *
     * @param {function} func The function to add to the onSizeChange stack
     */
    addSizeChangeEvent : function(func) {
        if(!typeof func == 'function') {
            return;
        }

        var event = {};
        event.func = func;
        event.args = [];
        $.each(Array.prototype.slice.call(arguments), function(i, arg) {
            if(i === 0) return; //first argument is the function
            event.args.push(arg); //add the argument to the event handler
        });

        device.onSizeChange.push(event);
    },

    /**
     * Method that adds a function to the onOrientationChange stack so that it is called when the orientation changes.
     *
     * Any succeeding parameters after 'func' will be used as arguments to call 'func'
     *
     * For example:
     *
     * device.addOrientationChangeEvent(function(name) {
     *     alert(name);
     * }, 'Your Name');
     *
     * Will result in "Your Name" being alerted whenever the orientation of the current device changes
     *
     * @param {function} func The function to add to the onOrientationChange stack
     */
    addOrientationChangeEvent  : function(func) {
        if(!typeof func == 'function') {
            return;
        }

        var event = {};
        event.func = func;
        event.args = [];
        $.each(Array.prototype.slice.call(arguments), function(i, arg) {
            if(i === 0) return;
            event.args.push(arg);
        });

        device.onOrientationChange.push(event);
    },

    /**
     * Executes all functions currently in the onSizeChange stack
     */
    runSizeChangeEvents : function() {
        $.each(device.onSizeChange, function(i, eventObj) {
            if(typeof eventObj.func == 'function') {
                eventObj.func.apply(this, eventObj.args);
            }
        });
    },

    /**
     * Executes all functions currently in the onOrientationChange stack
     */
    runOrientationChangeEvents : function() {
        $.each(device.onOrientationChange, function(i, eventObj) {
            if(typeof eventObj.func == 'function') {
                eventObj.func.apply(this, eventObj.args);
            }
        });
    },

    /**
     * Returns the current size classification of the device
     *
     * @return {String}
     */
    getSize : function() {
        if (null === this.size) {
            this.updateSize();
        }
        return this.size;
    },

    /**
     * Returns the current orientation classification of the device
     *
     * @return {String}
     */
    getOrientation : function() {
        if(window.orientation === 0) {
            return 'portrait';
        }
        return 'landscape';
    },


    /**
     * Gets the device width in pixels
     *
     * @return {Number}
     */
     getWidth : function() {
         return $(window).width();
     },

    /**
     * Gets the device height in pixels
     *
     * @return {*|jQuery}
     */
     getHeight : function() {
         return $(window).height();
     },

    /**
     * Helper method for determining whether the current device size matches a collection of string sizes
     *
     * e.g. device.sizeIs('large', 'medium'); will return true if the device size is "large" or "medium",
     * otherwise it will return false;
     *
     * @return {Boolean}
     */
    sizeIs : function() {
        return ($.inArray(this.getSize(), arguments) !== -1);
    },

    /**
     * Updates the device size by detecting screen width.
     *
     * If the screen size has changed, then this method also runs all onSizeChange[] events in this object
     */
    updateSize : function() {
        var newSize;
        
        switch(true) {
            case (Modernizr.mq('only all and (max-width: 599px)')):
                newSize = 'small';
                break;
            case (Modernizr.mq('only all and (min-width: 600px) and (max-width: 960px)')):
                newSize = 'medium';
                break;
            default:
                newSize = 'large';
        }

        var fire = newSize != device.size;
        device.size = newSize;
        if(fire) {
            device.runSizeChangeEvents();
        }
    },

    /**
     * Binds an event listener to the window which will trigger the update device size handler
     */
    initSizeListener : function() {
        $(window).resize(this.updateSize);
    },

    /**
     * Binds an event listener to the window which will trigger when the orientation changes and runs all
     * orientation change events in the app
     */
    initOrientationListener : function() {
        $(window).on('orientationchange', device.runOrientationChangeEvents);
    },

    /**
     * Gets the current Y coordinate scroll point
     */
    getScrollTop : function() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    },

    /**
     * Gets the current X coordinate scroll point
     */
    getScrollLeft : function() {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    },

    /**
     * Returns true if the current device supports touch events, false otherwise
     */
    hasTouch : function() {
        return Modernizr.touch;
    },

    /**
     * Returns the name of the click event relevant for the device type
     *
     * @return {String}
     */
    getClickEventName : function() {
        return this.hasTouch() ? 'touchend' : 'click';
    }
    
};

$(device.init);