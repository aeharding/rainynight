window.setTimeout(function() {
    var canvas = document.querySelector('canvas'),
            context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    }
    resizeCanvas();
}, 500);

function controller($scope, $http, $interval) {
  var image = document.getElementById('background');
  image.onload = function() {
    var engine = new RainyDay({
        image: this
    });
  engine.rain([ [1, 2, 8000] ]);
  engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);
  };
  image.crossOrigin = 'anonymous';

  var album = localStorage['album'] || 'mZtyX';
  $http({
    method: 'GET',
    url: 'https://api.imgur.com/3/album/' + album,
    headers: {
      'Authorization': 'Client-ID 033d169c409e243'
    }
  }).success(function(data) {
    var index = Math.floor(Math.random() * data.data.images.length);
    var imageMeta = data.data.images[index];

    $scope.title = imageMeta.title;

    try {
      $scope.author = imageMeta.description.split('|')[0];
      $scope.link = imageMeta.description.split('|')[1];
    } catch(e) {
      $scope.author = 'anonymous';
    }

    image.src = imageMeta.link;
  }).error(function() {
    $scope.author = 'Alexander Harding';
    image.src = 'images/offline.png'
  });

  $interval(function() {
    $scope.time = new Date();
  }, 1000);
}




// Just for fun. :-)
consoleStyles = 'color: darkblue; font-style: italic;';
console.log("%crain\nrain, rain, rain heal my heart that is broken apart\nrain, rain, rain up above from the skies\nrain, rain, rain pour here and clean my soul", consoleStyles);