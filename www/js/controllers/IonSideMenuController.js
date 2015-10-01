(function() {
    angular.module('regiknow').controller("IonSideMenuController", IonSideMenuController);
    IonSideMenuController.$inject = ['$ionicSideMenuDelegate'];

    function IonSideMenuController($ionicSideMenuDelegate) {
      var vm = this;
      vm.sample = "Hello";
      //MD Side Nav=======================================================================================================
      vm.toggleLeft = function() {
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

  vm.close = function() {
    $mdSidenav('left').close()
      .then(function() {
        $log.debug("close LEFT is done");
      });
  }



}
})();
