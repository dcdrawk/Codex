webpackJsonp([1],{12:function(n,e){},180:function(n,e){"use strict";function t(){return{scope:{fileread:"="},link:function(n,e,t){e.bind("change",function(e){var t=new FileReader;n.fileread=e.target.files[0],t.onload=function(e){n.$parent.$ctrl.fileblob=e.target.result,n.$apply(function(){})},t.readAsDataURL(e.target.files[0])})}}}e.__esModule=!0,e["default"]=t},181:function(n,e){"use strict";e.footer={templateUrl:"app/layout/footer.html"}},182:function(n,e,t){"use strict";t(0);var r=function(){function n(n,e,t){var r=this;this.$mdSidenav=e,this.$scope=t,this.firebaseService=n,this.userSignedOut=this.$scope.$on("USER_SIGNED_OUT",function(n){r.user=void 0,r.$scope.$apply()}),this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(n,e){r.user=angular.extend({},e),r.$scope.$apply()}),this.userUpdated=this.$scope.$on("USER_UPDATED",function(n,e){r.user=e,r.$scope.$apply()})}return n.prototype.openMenu=function(n,e){n(e)},n.prototype.toggleSidenav=function(n){this.$mdSidenav(n).toggle(),console.log(n)},n.prototype.signOut=function(){var n=this;this.firebaseService.signOut().then(function(e){n.user=n.firebaseService.currentUser})},n.$inject=["FirebaseService","$mdSidenav","$scope"],n}();e.header={controller:r,templateUrl:"app/layout/header.html"}},183:function(n,e,t){"use strict";t(0);var r=[{title:"Characters",sref:"character-list",icon:"people"},{title:"Character Info",sref:"characters",icon:"info"},{title:"Adventure Log",sref:"characters",icon:"description"}],a=function(){function n(n){this.$mdSidenav=n,this.menu=r}return n.prototype.toggleMenu=function(n){var e=$(n).find("ul");console.log(e),$(e).slideToggle("fast")},n.prototype.toggleSidenav=function(n){this.$mdSidenav(n).toggle(),console.log(n)},n.$inject=["$mdSidenav"],n}();e.sidenav={controller:a,templateUrl:"app/layout/sidenav.html"}},184:function(n,e){"use strict";e.main={templateUrl:"app/main.html"}},185:function(n,e,t){"use strict";t(0);var r=t(1),a=function(){function n(n,e,t,r,a){var i=this;this.$scope=r,this.$mdDialog=a,this.selected=[],this.gameDataService=e,this.toastService=t,this.firebaseService=n,this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(n,e){localStorage.getItem("characters")?i.characters=JSON.parse(localStorage.getItem("characters")):i.getCharacters()}),this.gameDataLoaded=this.$scope.$on("GAME_DATA_LOADED",function(n){i.gameData=i.gameDataService.gameData,i.$scope.$apply()}),this.gameDataService.gameData&&(this.gameData=this.gameDataService.gameData),this.init()}return n.prototype.init=function(){firebase.auth().currentUser&&(this.userId=firebase.auth().currentUser.uid,this.userId&&(localStorage.getItem("characters")?this.characters=JSON.parse(localStorage.getItem("characters")):this.getCharacters()))},n.prototype.showConfirmDeleteDialog=function(n,e,t){var r=this,a=this.$mdDialog.confirm().title("Confirm Character Delete").textContent("Are you sure you want to to this?").ariaLabel("Confirm Delete").targetEvent(n).ok("Delete").cancel("Cancel");this.$mdDialog.show(a).then(function(){console.log("confirm delete"),r.characters.splice(t,1),r.deleteCharacter(e)},function(){console.log("cancel delete")})},n.prototype.getCharacters=function(){var n=this,e=firebase.auth().currentUser.uid,t="characters/"+e;this.firebaseService.getData(t).then(function(e){n.characters=Object.keys(e).map(function(n){var t="id";return e[n][t]=n,e[n]}),localStorage.setItem("characters",JSON.stringify(n.characters))})},n.prototype.deleteCharacter=function(n){var e=this;this.firebaseService.deleteCharacter(n).then(function(){e.getCharacters()})},n.prototype.showNewCharacterModal=function(n){var e=this;this.$mdDialog.show({templateUrl:"./app/pages/character/new-character.modal.html",parent:r.element(document.body),targetEvent:n,clickOutsideToClose:!0,locals:{gameData:this.gameData},controller:function(n,e,t){n.gameData=t,n.selectRace=function(e){e.subraces?n.subraces=e.subraces:n.subraces=void 0},n.saveCharacter=function(n){e.hide(n)},n.close=function(){e.hide()}}}).then(function(n){e.firebaseService.saveNewCharacter(n).then(function(){e.getCharacters()})},function(){})},n.$inject=["FirebaseService","GameDataService","ToastService","$scope","$mdDialog"],n}();e.characterListComponent={controller:a,templateUrl:"app/pages/character/character-list.component.html"}},186:function(n,e,t){"use strict";t(0);var r=function(){function n(n){this.firebaseService=n,console.log(n),console.log(this)}return n.prototype.init=function(){console.log("init")},n.prototype.signIn=function(n,e){var t=this;this.firebaseService.signIn(n,e).then(function(n){console.log("sign in completed!"),console.log(n),t.user=angular.extend({},n)})},n.prototype.signOut=function(){var n=this;this.firebaseService.signOut().then(function(e){n.user=n.firebaseService.currentUser})},n.prototype.updateProfile=function(){this.firebaseService.updateProfile(this.user)},n.$inject=["FirebaseService"],n}();e.firebaseComponent={controller:r,templateUrl:"app/pages/firebase/firebase.component.html"}},187:function(n,e,t){"use strict";var r=t(1),a=function(){function n(n,e){this.$q=n,this.$rootScope=e,firebase.initializeApp(config),this.$rootScope=e,firebase.auth().onAuthStateChanged(function(n){n&&(this.currentUser=n,e.$broadcast("USER_SIGNED_IN",n))})}return n.prototype.signUp=function(n,e){return this.$q(function(t,r){firebase.auth().createUserWithEmailAndPassword(n,e).then(function(){console.log("Sign up Successful!")})["catch"](function(n){})})},n.prototype.getData=function(n){return this.$q(function(e,t){firebase.database().ref(n).on("value",function(n){e(n.val())})})},n.prototype.writeUserData=function(n,e){console.log("Write user data");var t=firebase.auth().currentUser.uid;return this.$q(function(r,a){firebase.database().ref(n+"/"+t).set(e)})},n.prototype.saveNewCharacter=function(n){var e=firebase.auth().currentUser.uid;return this.$q(function(t,r){firebase.database().ref("characters/"+e+"/").push(n).then(function(){t()})})},n.prototype.deleteCharacter=function(n){var e=firebase.auth().currentUser.uid;return this.$q(function(t,r){firebase.database().ref("characters/"+e+"/"+n.id).remove().then(function(){t()})})},n.prototype.signIn=function(n,e){return console.log("signing in..."),this.$q(function(t,r){firebase.auth().signInWithEmailAndPassword(n,e).then(function(n){console.log("sign in successful."),t(n)})["catch"](function(n){console.error("error signing in"),r()})})},n.prototype.signOut=function(){var n=this;return console.log("signing out..."),this.$q(function(e,t){firebase.auth().signOut().then(function(){console.log("sign out successful."),n.currentUser=void 0,n.$rootScope.$broadcast("USER_SIGNED_OUT"),e()},function(n){console.error("error signing out"),t()})})},n.prototype.updateProfile=function(n){var e=this;console.log("updating profile");var t=firebase.auth().currentUser;return this.$q(function(a,i){t.updateProfile(n).then(function(){console.log("updating profile successful."),e.$rootScope.$broadcast("USER_UPDATED",r.extend({},t)),a()},function(n){console.log("error updating profile."),i()})})},n.prototype.getCurrentUser=function(){var n=firebase.auth().currentUser;return n?r.extend({},n):null},n.prototype.uploadFile=function(n){console.log(n);var e=firebase.storage().ref(),t=e.child("images/"+n.name).put(n);t.on("state_changed",function(n){},function(n){console.error("upload error")},function(){console.log("upload complete");var n=t.snapshot.downloadURL;console.log(n)})},n.prototype.uploadProfilePhoto=function(n){var e=this;console.log(n);var t=firebase.storage().ref(),r=t.child("profile-photos/"+n.name).put(n);return this.$q(function(n,t){r.on("state_changed",function(n){},function(n){console.error("upload error"),t()},function(){console.log("upload complete");var t=r.snapshot.downloadURL,a=e.getCurrentUser();a.photoURL=t,e.updateProfile(a).then(function(){n()})})})},n.$inject=["$q","$rootScope"],n}();e.__esModule=!0,e["default"]=a},188:function(n,e){"use strict";var t=["alignments","armor","backgrounds","classes","skills","classFeatures","feats","languages","races","weapons"],r=function(){function n(n,e){var t=this;this.$q=n,this.$rootScope=e,this.gameData=JSON.parse(localStorage.getItem("gameData")),this.gameData?e.$broadcast("GAME_DATA_LOADED"):(this.gameData={},this.getGameData().then(function(){localStorage.setItem("gameData",JSON.stringify(t.gameData)),e.$broadcast("GAME_DATA_LOADED")}))}return n.prototype.getGameData=function(){var n=this;console.log("getting game data...");var e=t.map(function(e){return n.$q(function(t,r){firebase.database().ref("/"+e).once("value").then(function(r){n.gameData[e]=r.val(),t()})})});return this.$q.all(e)},n.$inject=["$q","$rootScope"],n}();e.__esModule=!0,e["default"]=r},189:function(n,e,t){"use strict";t(0);var r=t(1),a=function(){function n(n,e,t){var a=this;this.$scope=t,this.toastService=e,this.firebaseService=n,this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(n,e){a.user=r.extend({},e),a.$scope.$apply()}),this.init()}return n.prototype.init=function(){this.getCurrentUser()},n.prototype.getCurrentUser=function(){this.user=this.firebaseService.getCurrentUser()},n.prototype.updateProfile=function(){var n=this;this.firebaseService.updateProfile(this.user).then(function(){n.toastService.showToast("Profile Updated")})},n.prototype.uploadFile=function(n){var e=this;this.firebaseService.uploadProfilePhoto(n).then(function(){e.getCurrentUser()})},n.$inject=["FirebaseService","ToastService","$scope"],n}();e.profileComponent={controller:a,templateUrl:"app/pages/firebase/profile.component.html"}},190:function(n,e,t){"use strict";t(0);var r=function(){function n(n){this.firebaseService=n}return n.prototype.init=function(){console.log("init")},n.prototype.signUp=function(){this.firebaseService.signUp(this.email,this.password)},n.$inject=["FirebaseService"],n}();e.signUpComponent={controller:r,templateUrl:"app/pages/firebase/sign-up.component.html"}},191:function(n,e,t){"use strict";t(0);var r=function(){function n(n){this.$mdToast=n}return n.prototype.showToast=function(n){var e=this.$mdToast.simple().textContent(n).position("bottom right");this.$mdToast.show(e)},n.$inject=["$mdToast"],n}();e.__esModule=!0,e["default"]=r},192:function(n,e,t){"use strict";function r(n){n.theme("default").primaryPalette("indigo",{"default":"600"}).accentPalette("orange",{"default":"500"})}r.$inject=["$mdThemingProvider"],t(0),e.__esModule=!0,e["default"]=r},193:function(n,e){"use strict";e.title={templateUrl:"app/title.html"}},194:function(n,e){"use strict";function t(n,e,t){t.html5Mode(!0).hashPrefix("!"),e.otherwise("/"),n.state("app",{url:"/",template:"<app></app>"}).state("profile",{url:"/profile",template:"<profile></profile>"}).state("sign-in",{url:"/sign-in",template:"<firebase></firebase>"}).state("sign-up",{url:"/sign-up",template:"<signup></signup>"}).state("character-list",{url:"/character-list",template:"<characterlist></characterlist>"})}t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],e.__esModule=!0,e["default"]=t},196:function(n,e,t){t(3),n.exports=t(2)},2:function(n,e,t){"use strict";var r=t(1);r.module("app").run(["$templateCache",function(n){n.put("app/main.html",'\n<div class="main-container">  \n  <main class="main">    \n    <fountain-title></fountain-title>\n    <fountain-techs></fountain-techs>\n  </main>\n  <fountain-footer></fountain-footer>\n</div>'),n.put("app/title.html",'<div class="title">\n  <h1 class="title-h1">\'Allo, \'Allo!</h1>\n  <div>    \n    <img class="title-logo" src="http://fountainjs.io/assets/imgs/yeoman.png">\n    <img class="title-logo" src="http://fountainjs.io/assets/imgs/fountain.png">\n  </div>\n  <h2 class="title-h2">Always a pleasure scaffolding your apps.</h2>\n</div>\n'),n.put("app/layout/footer.html",'<footer class="footer">\n  Build with ♥ by the&nbsp;\n  <a href="https://github.com/orgs/FountainJS/people">\n    FountainJS team\n  </a>\n</footer>\n'),n.put("app/layout/header.html",'<md-toolbar class="app-bar md-whiteframe-2dp">\n  <div class="md-toolbar-tools">\n    <md-button ng-if="!$mdMedia(\'gt-md\')" class="md-icon-button menu-button" aria-label="Settings" ng-click="$ctrl.toggleSidenav(\'right\')">\n      <md-icon class="material-icons">menu</md-icon>\n    </md-button>\n    <h2>\n      <span>Codex</span>\n    </h2>\n    <span flex></span>\n    <md-menu md-position-mode="target-right target" class="header-menu" ng-if="$ctrl.user">\n      \n      <md-button aria-label="Open interactions menu" ng-click="$ctrl.openMenu($mdOpenMenu, $event)">\n      <span ng-if="!$ctrl.user.displayName">{{$ctrl.user.email}}</span>\n        <span ng-if="$ctrl.user.displayName">{{$ctrl.user.displayName}}</span>\n        <img class="app-bar-photo" ng-src="{{$ctrl.user.photoURL}}">\n        <md-icon md-menu-origin class="material-icons">arrow_drop_down</md-icon>\n      </md-button>\n      <md-menu-content width="4">\n        <md-menu-item>\n          <md-button ui-sref="profile">\n            <md-icon class="material-icons">account_box</md-icon>\n            Profile\n          </md-button>\n        </md-menu-item>\n        <md-menu-divider></md-menu-divider>\n        <md-menu-item>\n          <md-button ng-click="$ctrl.signOut();">\n            <md-icon class="material-icons" md-menu-align-target>exit_to_app</md-icon>\n            Sign Out\n          </md-button>\n        </md-menu-item>      \n        \n      </md-menu-content>\n    </md-menu>\n\n    <div ng-if="!$ctrl.user">\n      <md-button ui-sref="sign-up">\n        Sign Up\n      </md-button>\n      <md-button ui-sref="sign-in">\n        Sign In\n      </md-button>\n    </div>\n  </div>\n</md-toolbar>\n\n'),n.put("app/layout/sidenav.html",'<md-sidenav class="md-sidenav-left md-whiteframe-4dp" md-component-id="right" md-is-locked-open="$mdMedia(\'gt-md\')">\r\n  <!--<md-toolbar class="md-theme-light">\r\n    <h1 class="md-toolbar-tools">Menu</h1>\r\n  </md-toolbar>-->\r\n  <!--<md-content>-->\r\n\r\n    <!--Menu-->\r\n    <ul class="sidenav-menu">\r\n      <li ng-repeat="item in $ctrl.menu " id="{{item.title}}">        \r\n        <span ui-sref="{{item.sref}}" class="sidenav-button expand-button" md-ink-ripple>          \r\n          <md-icon class="menu-icon material-icons">{{item.icon}}</md-icon>{{item.title}}</span>\r\n      </li>\r\n    </ul>\r\n  <!--</md-content>-->\r\n</md-sidenav>'),n.put("app/pages/character/character-list.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Characters {{$ctrl.test}}\r\n  </h4>\r\n</section>\r\n<md-card>\r\n\r\n  <section class="md-padding" layout="row" layout-wrap layout-padding>\r\n    <!-- exact table from live demo -->\r\n    <div flex="100">\r\n      <md-button class="md-primary md-raised" ng-click="$ctrl.showNewCharacterModal($event)" ng-disabled="!$ctrl.gameData">New Character</md-button>      \r\n    </div>\r\n\r\n    <div flex="100">\r\n      <md-divider></md-divider>   \r\n    </div>\r\n    <md-table-container>\r\n      <table md-table multiple="multiple" ng-model="$ctrl.selected" md-progress="promise">\r\n        <thead md-head md-order="$ctrl.myOrder" md-on-reorder="">\r\n          <tr md-row>\r\n            <th md-column md-order-by="name"><span>Name</span></th>\r\n            <th md-column md-numeric md-order-by="level"><span>Level</span></th>\r\n            <th md-column md-numeric md-order-by="experience"><span>Experience</span></th>\r\n            <th md-column md-numeric md-order-by="class"><span>Class</span></th>\r\n            <th md-column md-numeric md-order-by="race"><span>Race</span></th>\r\n            <th md-column md-numeric md-order-by="alignment"><span>Alignment</span></th>\r\n            <th md-column md-numeric md-order-by="background"><span>Background</span></th>\r\n            <th md-column md-numeric md-order-by="adventuringGroup"><span>Adventuring Group</span></th>\r\n            <th md-column><span></span></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody md-body>\r\n          <tr md-row ng-repeat="character in $ctrl.characters | orderBy: $ctrl.myOrder track by $index">\r\n            <td md-cell>{{character.name}}</td>\r\n            <td md-cell>{{character.level}}</td>\r\n            <td md-cell>{{character.experience}}</td>\r\n            <td md-cell>{{character.class}}</td>\r\n            <td md-cell>{{character.race}}</td>\r\n            <td md-cell>{{character.alignment}}</td>\r\n            <td md-cell>{{character.background}}</td>\r\n            <td md-cell>{{character.adventuringGroup}}</td>\r\n            <td md-cell>\r\n              <md-button class="md-icon-button" aria-label="Delete Character" ng-click="$ctrl.showConfirmDeleteDialog($event, character, $index);">\r\n                <md-icon class="material-icons table-icon">delete</md-icon>\r\n              </md-button>\r\n            </td>\r\n          </tr>\r\n\r\n          <tr md-row md-select="characters" md-select-id="name" md-auto-select ng-if="$ctrl.characters.length === 0">\r\n            <td md-cell colspan="2">No Characters Found</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </md-table-container>\r\n  </section>\r\n</md-card> \r\n\r\n<!--Floating action button-->\r\n<!--<div layout="row">\r\n  <md-button class="md-primary md-fab md-fab-bottom-right">\r\n    <md-icon class="material-icons">add</md-icon>\r\n  </md-button>\r\n\r\n</div>-->'),n.put("app/pages/character/new-character.modal.html",'<md-dialog aria-label="New Character" class="modal-md">\r\n  <md-toolbar>\r\n    <div class="md-toolbar-tools">\r\n      <h2>New Character</h2>\r\n      <span flex></span>\r\n      <md-button class="md-icon-button" ng-click="close()">\r\n        <md-icon class="material-icons" aria-label="Close dialog">close</md-icon>\r\n      </md-button>\r\n    </div>\r\n  </md-toolbar>\r\n  <md-dialog-content>\r\n    <div class="md-dialog-content">\r\n      <form name="myForm">\r\n        <div layout="row">\r\n          <!--Name-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Character Name</label>\r\n            <input type="text" ng-model="character.name" required>\r\n          </md-input-container>\r\n\r\n          <!--Level-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Level</label>\r\n            <input type="number" ng-model="character.level" required>\r\n          </md-input-container>\r\n\r\n          <!--Experience-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Experience</label>\r\n            <input type="number" ng-model="character.experience">\r\n          </md-input-container>          \r\n        </div>\r\n\r\n        \r\n        <div layout="row">\r\n          <!--Class-->\r\n          <md-input-container flex>\r\n            <label>Class</label>\r\n            <md-select ng-model="character.class" required>\r\n              <md-option ng-repeat="class in gameData.classes" value="{{class.name}}">\r\n                {{class.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Race-->\r\n          <md-input-container flex>\r\n            <label>Race</label>\r\n            <md-select ng-model="character.race" required>\r\n              <md-option ng-repeat="race in gameData.races" value="{{race.name}}" ng-click="selectRace(race);">\r\n                {{race.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Subrace-->\r\n          <md-input-container flex>\r\n            <label>Subrace</label>\r\n            <md-select ng-model="character.subrace" ng-disabled="!subraces">\r\n              <md-option ng-repeat="subrace in subraces" value="{{subrace.name}}">\r\n                {{subrace.name}}\r\n              </md-option>\r\n            </md-select>\r\n            \r\n            <!--If there are no subraces-->\r\n            <md-tooltip md-direction="bottom" ng-if="character.race && !subraces">\r\n              No {{character.race}} Subraces\r\n            </md-tooltip>\r\n\r\n            <!--Tell the user to select a race-->\r\n            <md-tooltip md-direction="bottom" ng-if="!character.race">\r\n              Select a race\r\n            </md-tooltip>\r\n          </md-input-container>          \r\n        </div>\r\n\r\n        <div layout="row">\r\n          <!--Class-->\r\n          <md-input-container flex>\r\n            <label>Alignment</label>\r\n            <md-select ng-model="character.alignment">\r\n              <md-option ng-repeat="alignment in gameData.alignments" value="{{alignment.name}}">\r\n                {{alignment.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Background-->\r\n          <md-input-container flex>\r\n            <label>Background</label>\r\n            <md-select ng-model="character.background">\r\n              <md-option ng-repeat="background in gameData.backgrounds" value="{{background.name}}">\r\n                {{background.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Adventuring Group-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Adventuring Group</label>\r\n            <input type="text" ng-model="character.adventuringGroup">\r\n          </md-input-container>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </md-dialog-content>\r\n  <md-dialog-actions layout="row">\r\n    <span flex></span>\r\n    <md-button ng-click="close()">\r\n      Cancel\r\n    </md-button>\r\n    <md-button class="md-primary md-raised" ng-click="saveCharacter(character)" ng-disabled="myForm.$invalid">\r\n      Save\r\n    </md-button>\r\n  </md-dialog-actions>\r\n</md-dialog>'),n.put("app/pages/firebase/firebase.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Sign In\r\n  </h4>\r\n</section>\r\n\r\n<section class="md-padding" layout="row" layout-align="center center" layout-wrap>\r\n  <div flex="100">\r\n    <md-input-container>\r\n      <label>Email</label>\r\n      <input ng-model="$ctrl.email" type="email">\r\n    </md-input-container>\r\n\r\n    <md-input-container>\r\n      <label>Password</label>\r\n      <input ng-model="$ctrl.password" type="password">\r\n    </md-input-container>\r\n  </div>\r\n  \r\n  <div flex="100">    \r\n    <md-button class="md-raised md-primary" ng-click="$ctrl.signIn($ctrl.email, $ctrl.password)">Sign In</md-button>\r\n  </div>\r\n</section>'),n.put("app/pages/firebase/profile.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Profile\r\n  </h4>\r\n</section>\r\n\r\n<section class="md-padding" layout="row" layout-wrap layout-padding>\r\n  <div flex="33" flex-sm="50" flex-xs="100">\r\n\r\n      <!--Profile Photo-->\r\n      <div class="profile-photo text-center">\r\n        <img ng-if="!$ctrl.user.photoURL && !$ctrl.fileblob" src="http://placehold.it/200x200" class="md-whiteframe-2dp">\r\n        <img ng-if="$ctrl.fileblob" ng-src="{{$ctrl.fileblob}}" class="md-whiteframe-2dp">\r\n        <img ng-if="$ctrl.user.photoURL && !$ctrl.fileblob" ng-src="{{$ctrl.user.photoURL}}" class="md-whiteframe-2dp">\r\n      </div>\r\n\r\n      <!--Upload Image button-->\r\n      <div flex="100">\r\n        <md-button class="md-primary" ng-click="$ctrl.changeImage = true" ng-disabled="$ctrl.changeImage === true">\r\n          Change Profile Image        \r\n        </md-button>\r\n        <md-button class="md-raised" ng-if="$ctrl.changeImage === true" ng-click="$ctrl.changeImage = false; $ctrl.fileblob = null">\r\n          Cancel        \r\n        </md-button>\r\n      </div>  \r\n\r\n      <!--Select Image button-->\r\n      <div flex="100" ng-if="$ctrl.changeImage === true">\r\n        <label for="file-upload" class="md-button md-raised md-primary">\r\n            <md-icon class="material-icons">add_a_photo</md-icon>  \r\n            Select Image\r\n        </label>\r\n        <span class="file-name">{{$ctrl.file.name}}</span>\r\n        <input id="file-upload" type="file" ng-model="$ctrl.file" fileread="$ctrl.file">\r\n        \r\n      </div>\r\n\r\n      <!--Upload Image button-->\r\n      <div flex="100" ng-if="$ctrl.changeImage === true && $ctrl.file">\r\n        <md-button class="md-raised md-accent" ng-click="$ctrl.uploadFile($ctrl.file)" ng-disabled="!$ctrl.file">\r\n          <md-icon class="material-icons">file_upload</md-icon>          \r\n          Upload Image\r\n        </md-button>\r\n      </div>  \r\n  </div>\r\n\r\n  <div flex="33" flex-sm="50" flex-xs="100">\r\n    <div layout="row" layout-wrap>\r\n\r\n      <md-input-container flex="100">\r\n        <label>Email</label>\r\n        <input ng-model="$ctrl.user.email" type="email">\r\n      </md-input-container>\r\n\r\n      <md-input-container flex="100">\r\n        <label>Display Name</label>\r\n        <input ng-model="$ctrl.user.displayName" type="text">\r\n      </md-input-container>    \r\n    </div>\r\n    <div flex="100">\r\n      <md-button class="md-raised md-primary" ng-click="$ctrl.updateProfile();">\r\n        <md-icon class="material-icons">save</md-icon>          \r\n        Save Profile\r\n      </md-button>\r\n\r\n      <md-button class="md-raised md-primary" ng-click="$ctrl.writeData();">\r\n        <md-icon class="material-icons">edit</md-icon>          \r\n        Write Data\r\n      </md-button>\r\n    </div>\r\n  </div>\r\n\r\n  <div flex="33" flex-sm="100" flex-xs="100" layout="column">\r\n    Other Info coming soon...\r\n    <p>{{$ctrl.file.name}}</p>\r\n  </div>\r\n  \r\n</section>'),n.put("app/pages/firebase/sign-up.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Sign Up\r\n  </h4>\r\n</section>\r\n\r\n<section class="md-padding" layout="row" layout-align="center center" layout-wrap>\r\n  <form flex="100" autocomplete="off">\r\n    <p>Sign up with your email</p>\r\n    <md-input-container>\r\n      <label>Email</label>\r\n      <input ng-model="$ctrl.email" type="email" autocomplete="off">\r\n    </md-input-container>\r\n\r\n    <md-input-container>\r\n      <label>Password</label>\r\n      <input ng-model="$ctrl.password" type="password" autocomplete="off">\r\n    </md-input-container>\r\n\r\n    <md-input-container>\r\n      <label>Re-type Password</label>\r\n      <input ng-model="$ctrl.passwordVerification" type="password" autocomplete="off">\r\n    </md-input-container>\r\n  </form>\r\n  \r\n  <div flex="100">    \r\n    <md-button class="md-raised md-primary" ng-click="$ctrl.signUp()">Sign Up</md-button>\r\n  </div>\r\n</section>'),n.put("app/pages/styles/typography.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Typography\r\n  </h4>\r\n</section>\r\n<md-divider></md-divider>\r\n\r\n<section layout="row" layout-wrap layout-padding>\r\n  <div flex="100">\r\n    <!--Heading 1-->\r\n  <h1>\r\n    H1. Heading 1\r\n  </h1>\r\n\r\n  <div hljs hljs-language="html">\r\n    <h1>\r\n      H1. Heading 1\r\n    </h1></div>  \r\n\r\n  <!--Heading 2-->\r\n  <h2>\r\n    H2. Heading 2\r\n  </h2>\r\n\r\n  <div hljs hljs-language="html">\r\n    <h2>\r\n      H2. Heading 2\r\n    </h2></div>\r\n\r\n  <!--Heading 3-->\r\n  <h3>\r\n    H3. Heading 3\r\n  </h3>\r\n  <div hljs hljs-language="html">\r\n    <h3>\r\n      H3. Heading 3\r\n    </h3></div>\r\n\r\n  <!--Heading 4-->\r\n  <h4>\r\n    H4. Heading 4 - Headline Text\r\n  </h4>\r\n  <div hljs hljs-language="html">\r\n    <h4>\r\n      H4. Heading 4 - Headline Text\r\n    </h4></div>\r\n  \r\n  <!--Heading 5-->\r\n  <h5>\r\n    H5. Heading 5 - Title Text\r\n  </h5>\r\n  <div hljs hljs-language="html">\r\n    <h5>\r\n      H5. Heading 5 - Title Text\r\n    </h5></div>\r\n  </div>\r\n  <div flex="100">\r\n    <!--Paragraph-->\r\n    <p>\r\n      Regular Paragraph / Body Text\r\n    </p>\r\n    <div hljs hljs-language="html">\r\n      <h2>\r\n        H2. Heading 2\r\n      </h2></div>\r\n\r\n    <!--Paragraph Strong-->\r\n    <p>\r\n      <strong>Strong / Bold Paragraph</strong>\r\n    </p>\r\n    <div hljs hljs-language="html">\r\n      <p>\r\n        <strong>Strong / Bold Paragraph</strong>\r\n      </p></div>\r\n\r\n    <!--Small-->\r\n    <small>\r\n      Small Text / Caption / Figcaption\r\n    </small>\r\n    <div hljs hljs-language="html">\r\n      <small>\r\n        Small Text / Caption / Figcaption\r\n      </small></div>\r\n  </div>\r\n</section>'),n.put("app/pages/components/buttons/buttons.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Buttons\r\n  </h4>\r\n</section>\r\n\r\n<section ng-cloak class="md-padding">\r\n  <h5>Flat</h5>\r\n  <md-button>Standard</md-button>\r\n  <md-button md-no-ink class="md-primary">Primary (md-noink)</md-button>\r\n  <md-button ng-disabled="true" class="md-primary">Disabled</md-button>\r\n  <md-button class="md-warn">title4</md-button>\r\n\r\n  <div hljs hljs-language="html">\r\n    <md-button>Standard</md-button>\r\n    <md-button md-no-ink class="md-primary">Primary (md-noink)</md-button>\r\n    <md-button ng-disabled="true" class="md-primary">Disabled</md-button>\r\n    <md-button class="md-warn">title4</md-button></div>\r\n\r\n</section>\r\n\r\n<md-divider></md-divider>\r\n\r\n<section ng-cloak class="md-padding">\r\n  <h5>Raised</h5>\r\n  <md-button class="md-raised">Button</md-button>\r\n  <md-button class="md-raised md-primary">Primary</md-button>\r\n  <md-button class="md-raised md-accent">Accent</md-button>\r\n  <md-button ng-disabled="true" class="md-raised md-primary">Disabled</md-button>\r\n  <md-button class="md-raised md-warn">Warn</md-button>\r\n  <div hljs hljs-language="html">\r\n  <md-button class="md-raised">Button</md-button>\r\n  <md-button class="md-raised md-primary">Primary</md-button>\r\n  <md-button class="md-raised md-accent">Accent</md-button>\r\n  <md-button ng-disabled="true" class="md-raised md-primary">Disabled</md-button>\r\n  <md-button class="md-raised md-warn">Warn</md-button></div>\r\n</section>\r\n\r\n<md-divider></md-divider>\r\n\r\n<section ng-cloak class="md-padding">\r\n  <h5>Fab</h5>\r\n  <md-button class="md-fab" aria-label="Eat cake">\r\n    <md-icon class="material-icons">home</md-icon>\r\n  </md-button>\r\n  <md-button class="md-fab" ng-disabled="true" aria-label="Comment">\r\n    <md-icon class="material-icons">add</md-icon>\r\n  </md-button>\r\n  <md-button class="md-fab md-primary md-hue-2" aria-label="Profile">\r\n    <md-icon class="material-icons">watch_later</md-icon>\r\n  </md-button>\r\n  <md-button class="md-fab md-mini" aria-label="Eat cake">\r\n    <md-icon class="material-icons">comment</md-icon>\r\n  </md-button>\r\n  <md-button class="md-fab md-mini md-primary" aria-label="Use Android">\r\n    <md-icon class="material-icons">build</md-icon>\r\n  </md-button>\r\n  <div hljs hljs-language="html">\r\n    <md-button class="md-fab" aria-label="Eat cake">\r\n      <md-icon class="material-icons">home</md-icon>\r\n    </md-button>\r\n    <md-button class="md-fab" ng-disabled="true" aria-label="Comment">\r\n      <md-icon class="material-icons">add</md-icon>\r\n    </md-button>\r\n    <md-button class="md-fab md-primary md-hue-2" aria-label="Profile">\r\n      <md-icon class="material-icons">watch_later</md-icon>\r\n    </md-button>\r\n    <md-button class="md-fab md-mini" aria-label="Eat cake">\r\n      <md-icon class="material-icons">comment</md-icon>\r\n    </md-button>\r\n    <md-button class="md-fab md-mini md-primary" aria-label="Use Android">\r\n      <md-icon class="material-icons">build</md-icon>\r\n    </md-button></div>\r\n</section>\r\n\r\n<md-divider></md-divider>\r\n\r\n<section ng-cloak class="md-padding">\r\n  <h5>Links</h5>\r\n  <md-button ng-href="googleUrl" target="_blank">Default Link</md-button>\r\n  <md-button class="md-primary" ng-href="googleUrl" target="_blank">Primary Link</md-button>\r\n  <div hljs hljs-language="html">\r\n    <md-button ng-href="googleUrl" target="_blank">Default Link</md-button>\r\n    <md-button class="md-primary" ng-href="googleUrl" target="_blank">Primary Link</md-button></div>\r\n</section>\r\n\r\n<md-divider></md-divider>\r\n\r\n<section ng-cloak class="md-padding">\r\n  <h5>Themed</h5>\r\n  <md-button class="md-primary md-hue-1">Primary Hue 1</md-button>\r\n  <md-button class="md-warn md-raised md-hue-2">Warn Hue 2</md-button>\r\n  <md-button class="md-accent">Accent</md-button>\r\n  <md-button class="md-accent md-raised md-hue-1">Accent Hue 1</md-button>\r\n  <div hljs hljs-language="html">\r\n    <md-button class="md-primary md-hue-1">Primary Hue 1</md-button>\r\n    <md-button class="md-warn md-raised md-hue-2">Warn Hue 2</md-button>\r\n    <md-button class="md-accent">Accent</md-button>\r\n    <md-button class="md-accent md-raised md-hue-1">Accent Hue 1</md-button></div>\r\n</section>'),
n.put("app/pages/components/forms/forms.component.html","")}])},3:function(n,e,t){"use strict";var r=t(1);t(13),t(10),t(0),t(8),t(179);var a=t(194),i=t(192),o=t(184),l=t(182),s=t(183),c=t(193),d=t(181),m=t(180),u=t(191),p=t(187),h=t(188),g=t(186),f=t(189),b=t(190),v=t(185);t(12),r.module("app",["ui.router","ngMaterial","hljs","md.data.table"]).config(a["default"]).config(i["default"]).service("FirebaseService",p["default"]).service("GameDataService",h["default"]).service("ToastService",u["default"]).directive("fileread",m["default"]).component("app",o.main).component("header",l.header).component("sidenav",s.sidenav).component("fountainTitle",c.title).component("fountainFooter",d.footer).component("firebase",g.firebaseComponent).component("signup",b.signUpComponent).component("profile",f.profileComponent).component("characterlist",v.characterListComponent)}},[196]);