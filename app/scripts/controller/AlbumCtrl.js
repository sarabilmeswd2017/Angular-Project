(function() {
     function AlbumCtrl() {
     this.albumData = [];
     for (var i = 0; i < 6; i++) {
     this.albumData.push(angular.copy(albumPicasso));


      }
      }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();