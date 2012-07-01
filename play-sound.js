var playSound = (function() {

	// have just one audio context
	var context = new webkitAudioContext();

	var _playSound = function(buffer, at) {
		at = at || 0;
		var source = context.createBufferSource(); // creates a sound source
		source.buffer = buffer; // tell the source which sound to play
		source.connect(context.destination); // connect the source to the context's destination (the speakers)
		source.noteOn(at); // play the source at time 'at'
	};

	return _playSound;

})();
