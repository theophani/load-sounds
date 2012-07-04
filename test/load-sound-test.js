var context = new webkitAudioContext();

var callback = function (buffer) {
	playSound(buffer);
};

var err = function (message, request) {
	console.log(message, request);
};

var request = loadSound('woody_5.ogg',  context, callback, err);

var second_request = setTimeout(function () {
		loadSound('woody_3.ogg',  context, callback, err);
	}, 500);

var request_failed = loadSound('wrong_file_name.ogg',  context, callback, err);

var unhandled_error = loadSound('another_wrong_file.ogg',  context, callback);
