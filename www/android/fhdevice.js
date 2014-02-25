var channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This provides additional device info that is not provided by the default cordova device object
 *  - density: screen density (android only)  
 */
function FHDevice() {
    this.density = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
           me.available = true;
           me.density = info.density;
           channel.onCordovaInfoReady.fire();
        },function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing FHDevice: " + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
FHDevice.prototype.getInfo = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "FHDevice", "getFHDeviceInfo", []);
};

module.exports = new FHDevice();