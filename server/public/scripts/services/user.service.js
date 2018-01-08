myApp.factory('UserService', function($http, $location){
  console.log('UserService Loaded');

  var userObject = {};

  return {
    userObject : userObject,

    getuser : function(){
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              console.log('UserService -- getuser -- User Data: ', userObject.userName);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    },
      getIdeal : function() {
        console.log('UserService -- save ideal');
        $http.get('/user/ideal').then(function(response) {
            if(response.data) {
                return response.data;
            }
        })
      },
      saveIdeal : function(ideal) {
        var idealToSave = {
            size: ideal.size,
            age: ideal.age,
            sex: ideal.sex,
            kids: ideal.kids,
            dogs: ideal.dogs,
            cats: ideal.cats
        }
          console.log('UserService -- get ideal');
          $http.post('/user/ideal', idealToSave).then(function(response) {
              if(response.data) {
                  return response.data;
              }
          });
      }
  };
});
