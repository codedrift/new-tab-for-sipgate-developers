
export const chromeRuntime = () => {
	let runtime = null;

	try {
		runtime = chrome.runtime.connect(); // eslint-disable-line
	} catch (e) {

	}

	return runtime;
};

export default chromeRuntime;
