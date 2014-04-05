function controller($scope) {
  if(typeof localStorage['album'] !== 'string') {
    $scope.album = 'mZtyX';
  } else {
    $scope.album = localStorage['album'];
  }

  $scope.submit = function() {
    localStorage['album'] = $scope.album;
  }
  $scope.reset = function() {
    localStorage.clear();
    $scope.album = 'mZtyX';
  }
}