chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
		const headers = details.requestHeaders;
		const url = details.url;

		console.log(details.url);

		const tokenUrl = "login/sipgate-apps/protocol/openid-connect/token";
		if (url.indexOf(tokenUrl) !== -1) {
			for (let i = 0, l = headers.length; i < l; ++i) {
				if (headers[i].name == 'Origin') {
					headers[i].value = 'https://login.sipgate.com';
				}
			}
		}

		const altePostUrl = 'altepost.sipgate.net';
		if (url.indexOf(altePostUrl) !== -1) {
			for (let i = 0, l = headers.length; i < l; ++i) {
				if (headers[i].name == 'Origin') {
					headers[i].value = 'http://altepost.sipgate.net';
				}
			}
		}

		return {requestHeaders: headers};
	},
	{
		urls: [
			"*://api.sipgate.com/*",
			"*://api.dev.sipgate.com/*",
			"*://api.local.sipgate.com/*",
			"*://altepost.sipgate.net/*"
		]
	},
	['requestHeaders', 'blocking']
);

chrome.webRequest.onErrorOccurred.addListener(function (details) {
		console.log(details)
	},
	{
		urls: [
			"*://api.sipgate.com/*",
			"*://api.dev.sipgate.com/*",
			"*://api.local.sipgate.com/*"
		]
	});


chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (message) {
		console.log(message.type, message.content);
		switch (message.type) {
			case 'SIPGATE_TEST_ACCOUNT_SETTINGS_SAVE':
				const pref = {'SIPGATE_TEST_ACCOUNT_SETTINGS': message.content};
				chrome.storage.local.set(pref, function () {
					console.log('saved', pref)
				});
				break;
			case 'SIPGATE_TEST_ACCOUNT_SETTINGS_LOAD':
				chrome.storage.local.get('SIPGATE_TEST_ACCOUNT_SETTINGS', function (result) {
					const response = Object.keys(result).length === 0 && result.constructor === Object
						? null
						: result;
					console.log('SIPGATE_TEST_ACCOUNT_SETTINGS', response);
					port.postMessage(response);
				});
				break;
			case 'OPEN_INCOGNITO_TAB':
				chrome.windows.create({"url": message.content, "incognito": true});
				break;
		}
	});
});