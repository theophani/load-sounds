#WTF

To have full control over audio files using the latest HTML5 APIs, your content must be of type arraybuffer, which is needed so you can decode it. The only way I can see to get your content as type arraybuffer is to load it using XMLHttpRequest with content of type arraybuffer.

That means you have to deal with shit like being limited to same-origin requests, asynchronous loading of your files (actually, you could do them synchronously if you wanted), home-grown AJAX (since everyone's favorite libraries don't support the arraybuffer responseType).

So, I wrote a function called `loadSound` which does all that for a single sound file.

Likely, though, you want a bunch files to load, and once they are loaded, you want to do something really fucking awesome, so I wrote a map function called `loadSounds` to use `loadSound` on an array of sound files.

Chances are really good that you will want to play the files. (Other awesome options include adding filters and otherwise editing the files before playing them). Playing back a file requires a bunch of gymnastics involving something called an audioContext, so I wrote a function called `playSound` which plays the sound.

With these three functions, you could load one or more audio files, and play them back. I'll be using them to create a couple browser toys to show off the possible uses.

Have fun!

##loadSound

Utility function for asynchronously loading a sound file into an audioBuffer to be played using an audioContext.

###Usage

Pass `loadSound` the url of a sound file, an audioContext, and a callback which will receive the decoded audioBuffer.

```javascript
var url = 'path/to/my/sound.ogg';
var context = new webkitAudioContext();
var callback = function (buffer) {
	playSound(buffer);
};

var request = loadSound(url, context, callback[, err]);
```

##loadSounds

Map function for using `loadSound` to load an array of sound files into audioBuffers to be played using an audioContext. `loadSound` is a dependency of `loadSounds`.

###Usage

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

##playSound

Utility function for playing back audioBuffers in the same audioContext.

###Usage

Play back a sound by calling the playSound function with an audioBuffer.

```javascript
playSound(sound);
```
