myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.setPrefs = function() {
    console.log('prefs clicked, userObject is', self.userObject)
    UserService.setPrefs(self.userObject)
  }



});
