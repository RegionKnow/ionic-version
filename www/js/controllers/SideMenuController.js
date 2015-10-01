(function() {
  angular.module('regiknow').controller("SideMenuController", SideMenuController);
  SideMenuController.$inject = ['$ionicSideMenuDelegate'];

  function SideMenuController($ionicSideMenuDelegate) {
    var vm = this;
    
      //MD Side Nav=======================================================================================================
      vm.toggleLeft = function() {
        console.log("toggle left is running from what you just clicked!")
        $ionicSideMenuDelegate.toggleLeft();
      };


      function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function() {
          $mdSidenav(navID)
          .toggle()
          .then(function() {
            console.log("toggle " + navID + " is done");
          });
        }, 200);
        return debounceFn;
      }

      // vm.close = function() {
      //   $mdSidenav('left').close()
      //   .then(function() {
      //     $log.debug("close LEFT is done");
      //   });
      // }



    }
  })();