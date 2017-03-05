const webRequestUrlFilters = {
	urls: [
		"*://api.sipgate.com/*",
		"*://api.dev.sipgate.com/*",
		"*://api.local.sipgate.com/*",
		"*://altepost.sipgate.net/*"
	]
};

const setSipgateOriginHeader = (headers) => {
	let newOrigin = null;

	for (let i = 0; i < headers.length; ++i) {
		if (headers[i].name.match(/^new-origin-header$/i)) {
			newOrigin = headers[i].value;
			break;
		}
	}

	if(newOrigin) {
		for (let i = 0; i < headers.length; ++i) {
			if (headers[i].name.match(/^origin$/i)) {
				headers[i].value = newOrigin;
				break;
			}
		}
	}

	return headers;
}

chrome.webRequest.onBeforeSendHeaders.addListener(
	(details) => {
		const headers = setSipgateOriginHeader(details.requestHeaders);
		return { requestHeaders: headers };
	},
	webRequestUrlFilters,
	['requestHeaders', 'blocking']
);

chrome.webRequest.onErrorOccurred.addListener(
	(details) => console.log(details),
	webRequestUrlFilters
);

chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (message) {
		console.log(message.type, message.content);
		switch (message.type) {
			case 'SIPGATE_TEST_ACCOUNT_SETTINGS_SAVE':
				const pref = {'SIPGATE_TEST_ACCOUNT_SETTINGS': message.content};
				chrome.storage.sync.set(pref, function () {
					console.log('saved', pref)
				});
				break;
			case 'SIPGATE_TEST_ACCOUNT_SETTINGS_LOAD':
				chrome.storage.sync.get('SIPGATE_TEST_ACCOUNT_SETTINGS', function (result) {
					const response = Object.keys(result).length === 0 && result.constructor === Object
						? null
						: result;
					console.log('SIPGATE_TEST_ACCOUNT_SETTINGS', response);
					port.postMessage(response);
				});
				break;
			case 'OPEN_INCOGNITO_TAB':
				chrome.windows.create({
					"url": message.content,
					"incognito": true
				});
				break;
		}
	});
});