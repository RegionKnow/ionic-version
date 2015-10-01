(function() {
  angular.module('regiknow').controller("MDController", MDController);
  MDController.$inject = ['$scope', '$timeout', '$mdSidenav', '$mdUtil'];

  function MDController($scope, $timeout, $mdSidenav, $mdUtil) {
    var vm = this;
    vm.sample = "Hello";
    //MD Side Nav=======================================================================================================
    vm.toggleLeft = buildToggler('left');

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
