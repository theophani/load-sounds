var loadSound = function(url, context, callback, err) {

	var decodeSuccess = function(buffer) {
		callback(buffer);
	};

	var decodeError = function(response) {
		try {
			throw 'Error decoding sound at `' + url + '`. This is as good as the error gets. Sorry.';
		} catch (message) {
			err(message, response, url);
		}
	};

	var decodeAudioData = function(e) {
		context.decodeAudioData(e.currentTarget.response, decodeSuccess, decodeError);
	}

	var load = function(url) {
		var request = new XMLHttpRequest();

		request.open('GET', url);
		request.responseType = 'arraybuffer';
		request.onload = decodeAudioData;
		request.send();

		return request;
	};

	var request = load(url);

	return request;
};
