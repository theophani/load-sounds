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

	var stuffBuffer = function(buffer, sound) {
			sounds[sound.key] = buffer;
			sounds.loaded.push(sound);
			after();
		};

	var falsifyBuffer = function(response, sound) {
			var message = 'Error with sound "' + sound.key + ': ' + sound.url + '". \nThis is as good as the error gets. Sorry.';
			sounds.errors.push(sound);
			after();
			throw (message);
		};

	sounds.list.forEach(function(sound) {
		var url = sound.url;
		var callback = function (buffer) {
			stuffBuffer(buffer, sound);
		};
		var err = function (message, response, url) {
			falsifyBuffer(response, sound);
		};

		loadSound(url, context, callback, err);
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
