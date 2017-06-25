(function() {
     function Profile() {
         var Profile = {};

         var SaraBilmes = {
         name: 'Sara Bilmes',
         account: 'sfdfs',
         settings: 'dsfsdfs',
         city: 'Maale Adumim',
         favoriteAlbum: 'Shlomo Katz'

     };

     Profile.getProfile = function() {
         return SaraBilmes;
     };
     return Profile;
   }

   angular
       .module('blocJams')
       .factory('Profile', Profile);
})();
