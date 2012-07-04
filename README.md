#loadSound

Utility function for asynchronously loading a sound file into an audioBuffer to be played using an audioContext.

##Usage

Pass `loadSound` the url of a sound file, an audioContext, and a callback which will receive the decoded audioBuffer.

```javascript
var url = 'path/to/my/sound.ogg';
var context = new webkitAudioContext();
var callback = function (buffer) {
	playSound(buffer);
};

var request = loadSound(url, context, callback[, err]);
```

#loadSounds

Map function for using `loadSound` to load an array of sound files into audioBuffers to be played using an audioContext.

##Usage

Define an array of urls.

```javascript
var paths = [
  'path/to/one.ogg',
  'path/to/two.ogg',
  'path/to/three.ogg'
];
```

Execute `loadSounds` on this array to create an array of requests.

```javascript
var requests = loadSounds(paths, [callback, progressCallback]);
```

`callback` will be evoked when all the sounds have either been loaded, or have thrown an error. `progressCallback` is evoked after each sound is either loaded or throws an error. Any errors will be available in the array `requests.errors`. If there are no errors, `requests.errors` will be an empty array.

`callback` and `progressCallback` will receive an array of sounds. Each item will either be an instance of AudioBuffer, or null, if the sound has not loaded or failed to decode.

```javascript
var callback = function (sounds) {
	sounds[0] // AudioBuffer
	sounds[1] // AudioBuffer
	sounds[2] // AudioBuffer
}
```

#playSound

Utility function for playing back audioBuffers in the same audioContext.

##Usage

Play back a sound by calling the playSound function with an audioBuffer.

```javascript
playSound(sound);
```
