try {
	var context = new webkitAudioContext();
} catch (e) {
	var el = document.createElement('p');
	el.innerHTML = 'Sorry, this does not work in this browser yet.';
	document.body.appendChild(el);
}

// requires context to exist in global scope
var playSound = function(buffer, at) {
	at = at || 0;
	var source = context.createBufferSource(); // creates a sound source
	source.buffer = buffer; // tell the source which sound to play
	source.connect(context.destination); // connect the source to the context's destination (the speakers)
	source.noteOn(at); // play the source at time 'a'
};

var soundHash = {
	'woody1': 'woody_1.ogg'
};

var ready = function () {
	playSound(sounds.woody1);
};

var sounds = loadSounds(soundHash, ready);
