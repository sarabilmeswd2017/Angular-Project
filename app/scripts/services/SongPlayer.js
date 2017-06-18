(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          /**
  * @desc currentAlbum variable calling on the getAlbum function in Fixtures
  * @type {function}
  */
          var currentAlbum = Fixtures.getAlbum();

          /**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;

          /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

          var setSong = function(song) {
            if (currentBuzzObject) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
            });

             SongPlayer.currentSong = song;
          };
          /**
        * @function playSong
        * @desc Plays currentBuzzObject and sets playing variable to true
        * @param {Object} song
        */
          var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
          };
          /**
          * @function getSongIndex
          * @desc gets the current song in the album
          * @param {Object} song
          */
          var getSongIndex = function(song) {
               return currentAlbum.songs.indexOf(song);
           };

          /**
 * @desc current song playing
 * @type {Object}
 */
          SongPlayer.currentSong = null;

          SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if ( SongPlayer.currentSong  !== song) {
             setSong(song);
             playSong(song);
       } else if ( SongPlayer.currentSong  === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();

         }
     }
     };

         SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        /**
* @desc previous song is will now go back one index on the song array
* @type {Array}
*/
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
         };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
