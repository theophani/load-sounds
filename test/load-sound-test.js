var context = new webkitAudioContext();

var callback = function (buffer) {
	playSound(buffer);
};

var err = function (message, response, url) {
	console.log(message, response, url);
};

var xhr = loadSound('woody_5.ogg',  context, callback, err);

var xhr_failed = loadSound('wrong_file_name.ogg',  context, callback, err);
