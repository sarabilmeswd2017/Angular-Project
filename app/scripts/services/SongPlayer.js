(function() {
     function SongPlayer($rootScope, Fixtures) {
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
              stopSong();
              /*currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;*/
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
         });
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
           * @function stopSong
           * @desc Plays currentBuzzObject and sets playing variable to true
           * @param {Object} song
           */

           var stopSong = function(song){
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
           };

          /**
 * @desc current song playing
 * @type {Object}
 */
          SongPlayer.currentSong = null;
          /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
         SongPlayer.currentTime = null;
  /**
  * @desc Current playback time (in seconds) of currently playing song
  * @type {Number}
 */
         SongPlayer.volume = 80;

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
* @desc calls on the previous song, it will now go back one index on the song array
* @type {Array}
*/
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
          stopSong();
         /*currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;*/
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
         };

         /**
    * @desc calls on next song, it will now go forward one index on the song array
    * @type {Array}
    */
           SongPlayer.next = function(){
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             if (currentSongIndex >= currentAlbum.songs.length) {
          stopSong();
         /*currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;*/
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
           };


           /**
           * @function setCurrentTime
           * @desc Set current time (in seconds) of currently playing song
           * @param {Number} time
           */
           SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
               currentBuzzObject.setTime(time);
             }
           };

           SongPlayer.setVolume = function(volume){
             // update the song player volume to the new volume
             SongPlayer.volume = volume;
             // Use buzz to set the volume of the actual audio
             if(currentBuzzObject){
               currentBuzzObject.setVolume(volume);
             }

           };

           /**
           * @desc mutes the song when you click on the mute icon
           * @type {Button}
           */
                      SongPlayer.mute = function(volume){
                         if(currentBuzzObject.isMuted()){
                           currentBuzzObject.unmute();
                         }else{
                           currentBuzzObject.mute();
                         }
                      }

          return SongPlayer;
     }



     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
