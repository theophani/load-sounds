Slim helper for loading a number of sound files to be played using an audioContext

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

`callback` will be evoked when all the sounds has either been loaded, or have thrown an error. `progressCallback` is evoked after each sound is either loaded or throws an error. 

Once the loading process completes, each sound will exist as a named property of `sounds` as an instance of an AudioBuffer.

```javascript
sounds.one
// > AudioBuffer
sounds.two
// > AudioBuffer
```

Any errors will be available in the array `sounds.errors`. If there are no errors, `sounds.errors` will be an empty array.
