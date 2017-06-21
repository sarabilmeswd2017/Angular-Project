(function() {
  function ProfileCtrl(Profile) {
      this.profileData = Profile.getProfile();

      }


     angular
         .module('blocJams')
         .controller('ProfileCtrl', ['Profile', ProfileCtrl]);
 })();
