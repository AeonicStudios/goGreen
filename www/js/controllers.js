angular.module('starter.controllers', [])
.controller('HomeCtrl', function($scope) {})
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var geocoder = new google.maps.Geocoder();
    var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var startLocation = new google.maps.LatLng(40.893307, -73.898235);
    var waypoints = [new google.maps.LatLng(40.784334, -73.951776), new google.maps.LatLng(40.776679, -73.943514)];
    var endpoint = new google.maps.LatLng(40.787468, -73.951396);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  var waypts = [];
  for (var i = 0; i < waypoints.length; i++) {
      
      waypts.push({
        location: waypoints[i],
        stopover: true
      });
    
  
}
directionsService.route({
    origin: startLocation,
    destination: endpoint,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
       
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
          position: latLng,
          map: $scope.map,
          title: 'My Position'
        });
        //marker.setIcon("../img/car.png")

        var marker2 = new google.maps.Marker({
          position: waypoints[0],
          map: $scope.map,
          title: 'Stop 1'
        });
        var marker3 = new google.maps.Marker({
          position: waypoints[1],
          map: $scope.map,
          title: 'Stop 2'
        });
        
        var marker4 = new google.maps.Marker({
          position: endpoint,
          map: $scope.map,
          title: 'Last stop'
        });
        marker.setIcon("../img/car.png")
 
  }, function(error){
    console.log("Could not get location");
  });
})
.controller('HistoryCtrl', function($scope) {})
.controller('LoginCtrl', function($scope) {
  signupEmail = function(){
 
  //Create a new user on Parse
  var user = new Parse.User();
  user.set("username", $scope.data.username);
  user.set("password", $scope.data.password);
  user.set("email", $scope.data.email);
 
  // other fields can be set just like with Parse.Object
  user.set("somethingelse", "like this!");
 
  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("success!");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
 
};

})
.controller('DashCtrl', function($scope) {})
.controller('VerifyCtrl', function($scope, $state, $http){
  $scope.data = {
    email: "",
    password: "",
    saved_email: "",
    saved_password: ""
  }
  if ($scope.data.saved_email !== "" && $scope.data.saved_password !== "") $state.go("tab.home");
  $scope.verifyAccount = function(){
    if ($scope.data.email !== "" && $scope.data.password !== ""){

        var link = 'http://104.236.222.45/login_backend.php';

        $http.post(link, {email : $scope.data.email, password : $scope.data.password}).then(function (res){
            $scope.response = res.data;
            if ($scope.response === "error=incorrect") alert("incorrect out username or password");
            else{
              $scope.data.stored_email = $scope.data.email;
              $scope.data.stored_passwords = $scope.data.password;
             $state.go("tab.home");
           }
        });
    };
   
  }

})

/*.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
