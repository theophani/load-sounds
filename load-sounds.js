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
			sound.buffer = buffer;
			sounds[sound.key] = buffer;
			sounds.loaded.push(sound);
			after();
		};

	var handleError = function(message, request, sound) {
			console.log(message, request);
			sounds.errors.push(sound);
			after();
	 };

	sounds.list.forEach(function(sound) {
		var url = sound.url;
		var callback = function(buffer) {
			stuffBuffer(buffer, sound);
		};
		var err = function(message, request) {
			handleError(message, request, sound);
		};

		loadSound(url, context, callback, err);
	});

	return sounds;
};
