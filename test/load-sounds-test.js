var paths = {
	'woody1': 'woody_1.ogg',
	'woody2': 'wrong_file_name.ogg',
	'woody5': 'woody_5.ogg'
};

var ready = function () {
	if (sounds.woody1) {
		playSound(sounds.woody1);
	}
	if (sounds.woody2) {
		playSound(sounds.woody2);
	}
	if (sounds.woody5) {
		setTimeout(function () {
			playSound(sounds.woody5);
		}, 500);
	}

	// test the interface
	console.log(
		sounds.errors.length === 1,
		sounds.loaded.length === 2,
		sounds.list.length === 3
	);
};

var sounds = loadSounds(paths, ready);

var testInterface = function () {
	var paths = {
		'woody1': 'woody_1.ogg',
		'woody2': 'woody_2.ogg',
		'woody3': 'woody_3.ogg',
		'woody4': 'woody_4.ogg',
		'woody5': 'woody_5.ogg',
	};

	var ready = function () {
		sounds.loaded.forEach(function (sound, i) {
			setTimeout(function () {
				playSound(sound.buffer);
			}, 100 * i);
		});
	};

	var sounds = loadSounds(paths, ready);
};

setTimeout(testInterface, 1000);
