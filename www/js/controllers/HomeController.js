(function() {
  angular.module('regiknow').controller("HomeController", HomeController);
  HomeController.$inject = ['$scope', '$timeout', '$mdSidenav', '$mdUtil'];

  function HomeController($scope, $timeout, $mdSidenav, $mdUtil) {
    var vm = this;
    vm.sample = "Hello";
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
