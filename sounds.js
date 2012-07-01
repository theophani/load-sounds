var loadSounds = function(soundHash, callback, progress) {

	var context = new webkitAudioContext();

	var sounds = {
		loaded: [],
		errors: [],
		list: (function() {
			var array = [];
			for (sound in soundHash) {
				array.push({
					key: sound,
					url: soundHash[sound]
				});
			}
			return array;
		}())
	};

	var after = function() {
			var done = (sounds.loaded.length + sounds.errors.length) === sounds.list.length;

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

	var stuffBuffer = function(buffer, sound, after) {
			sounds[sound.key] = buffer;
			sounds.loaded.push(sound);
			after();
		};

	var falsifyBuffer = function(response, sound, after) {
			var message = 'Error with sound "' + sound.key + ': ' + sound.url + '". \nThis is as good as the error gets. Sorry.';
			sounds.errors.push(sound);
			after();
			throw (message);
		};

	sounds.list.forEach(function(sound) {
		var request = new XMLHttpRequest();

		request.open('GET', sound.url, true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			context.decodeAudioData(
				request.response,
				// onSuccess
				function(buffer) {
					stuffBuffer(buffer, sound, after);
				},
				// onError
				function(response) {
					falsifyBuffer(response, sound, after);
				});
		};

		request.send();
	});

	sounds.getByUrl = (function() {
		var keys = {};
		sounds.list.forEach(function(sound) {
			keys[sound.url] = sound.key;
		});

		return function(url) {
			return sounds[keys[url]];
		}
	}());

	return sounds;
};
