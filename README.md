#loadSounds

Slim helper for loading a one or more sound files into audioBuffers to be played using an audioContext.

##Usage

Define a hash of named paths.

```javascript
var paths = {
  one: 'path/to/one.ogg',
  two: 'path/to/two.ogg',
  three: 'path/to/three.ogg'
};
```

Create a `sounds` object using this hash.

```javascript
var sounds = loadSounds(paths, [callback, progressCallback]);
```

`callback` will be evoked when all the sounds have either been loaded, or have thrown an error. `progressCallback` is evoked after each sound is either loaded or throws an error. Any errors will be available in the array `sounds.errors`. If there are no errors, `sounds.errors` will be an empty array.

Once the loading process completes, each sound will exist as a named property of `sounds` as an instance of AudioBuffer.

```javascript
sounds.one
// > AudioBuffer
sounds.two
// > AudioBuffer
```

#playSound

Slim helper for playing back audioBuffers in the same audioContext.

##Usage

Play back a sound by calling the playSound function with an audioBuffer.

```javascript
playSound(sounds.one);
```
