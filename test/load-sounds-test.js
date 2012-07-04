var paths = [
	'woody_1.ogg',
	'wrong_file_name.ogg',
	'woody_5.ogg'
];

var ready = function (sounds) {
	if (sounds[0]) {
		playSound(sounds[0]);
	}
	if (sounds[1]) {
		playSound(sounds[1]);
	}
	if (sounds[2]) {
		setTimeout(function () {
			playSound(sounds[2]);
		}, 500);
	}

	// test the interface
	console.log(
		requests.errors.length === 1,
		requests.loaded.length === 2
	);
};

var requests = loadSounds(paths, ready);

var testInterface = function () {
	var paths = [
		'woody_1.ogg',
		'woody_2.ogg',
		'woody_3.ogg',
		'woody_4.ogg',
		'woody_5.ogg',
	];

	var ready = function (sounds) {
		sounds.forEach(function (sound, i) {
			setTimeout(function () {
				playSound(sound);
			}, 100 * i);
		});
	};

	var requests = loadSounds(paths, ready);
};

setTimeout(testInterface, 1000);
