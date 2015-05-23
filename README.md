# device.js


A simple library providing device helpers for detecting current size, running size change events etc.

## Usage

Example usage

    <script type="text/javascript">
        var options = {}; // see Options for more information on available options
        var device = new Device(options);

        alert(device.getSize());

        // ...
    </script>

## Options

During initialisation of the device helper you can provide some options to customise its behaviour.

Currently the available options are...

### Media Queries

You can specify the media query selectors used to classify the device as *small* and *medium*. You do not need to specify
a media query selector for *large* because this is the default size should any of the other media query selectors fail.

    mq: {
        small: '',
        medium: ''
    }

## Listeners

You can add a number of listeners for size changes and orientation changes, which allow you to run your own business
logic as the device changes.

### Size Change Events

You can add size change events as follows

    device.addSizeChangeEvent(function() {
        alert(device.getSize())
    }, true);

The second parameter to the `device.addSizeChangeEvent` tells device.js to run the event listener immediately after adding
it to the listener stack. If this is false then it will only be called when the size eventually changes.

### Orientation Change Events

You can add orientation change events as follows

    device.addOrientationChangeEvent(function() {
        alert(device.getOrientation())
    }, true);

The second parameter to the `device.addOrientationChangeEvent` tells device.js to run the event listener immediately after adding
it to the listener stack. If this is false then it will only be called when the size eventually changes.
