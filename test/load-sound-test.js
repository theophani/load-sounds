var context = new webkitAudioContext();

var callback = function (buffer) {
	playSound(buffer);
};

var err = function (message, request) {
	console.log(message, request);
};

var request = loadSound('woody_5.ogg',  context, callback, err);

var request_failed = loadSound('wrong_file_name.ogg',  context, callback, err);
