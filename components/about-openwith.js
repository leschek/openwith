/* globals Components, Services, XPCOMUtils */
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import('resource://gre/modules/Services.jsm');
Cu.import('resource://gre/modules/XPCOMUtils.jsm');

function OpenWithAboutHandler() {
}

OpenWithAboutHandler.prototype = {
	newChannel: function(uri, loadInfo) {
		if (uri.spec != 'about:openwith')
			return;

		let newURI = Services.io.newURI('chrome://openwith/content/about-openwith.xul', null, null);
		let channel = Services.io.newChannelFromURIWithLoadInfo(newURI, loadInfo);
		channel.originalURI = uri;
		return channel;
	},
	getURIFlags: function() {
		return Ci.nsIAboutModule.ALLOW_SCRIPT;
	},
	classDescription: 'About OpenWith Page',
	classID: Components.ID('97ce549f-5ec6-460e-ad11-55a7bd190185'),
	contractID: '@mozilla.org/network/protocol/about;1?what=openwith',
	QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule])
};

this.NSGetFactory = XPCOMUtils.generateNSGetFactory([OpenWithAboutHandler]);
