var loadSounds = function(paths, callback, progress) {

	var context = new webkitAudioContext();

	var loaded = [];
	var errors = [];
	var sounds = [];

	var after = function() {
		var done = (loaded.length + errors.length) === paths.length;

		// callback is an optional trigger after all sounds loaded
		if (done && callback) {
			callback(sounds);
			return;
		}

		// progress is an optional intermediate callback
		if (progress) {
			progress(sounds);
		}
	};

	var stuffBuffer = function(buffer, i) {
		sounds[i] = buffer;
		loaded.push(buffer);
		after();
	};

	var handleError = function(message, request) {
		console.log(message, request);
		errors.push(request);
		after();
	};

	var requests = paths.map(function(url, i) {
		var callback = function(buffer) {
			stuffBuffer(buffer, i);
		};
		var err = function(message, request) {
			handleError(message, request);
		};

		return loadSound(url, context, callback, err);
	});

	requests.loaded = loaded;
	requests.errors = errors;

	return requests;
};
