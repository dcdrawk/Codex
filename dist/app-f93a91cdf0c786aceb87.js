webpackJsonp([1],{16:function(e,n){},184:function(e,n){"use strict";function t(){return{scope:{fileread:"="},link:function(e,n,t){n.bind("change",function(n){var t=new FileReader;e.fileread=n.target.files[0],t.onload=function(n){e.$parent.$ctrl.fileblob=n.target.result,e.$apply(function(){})},t.readAsDataURL(n.target.files[0])})}}}n.__esModule=!0,n["default"]=t},185:function(e,n){"use strict";n.footer={templateUrl:"app/layout/footer.html"}},186:function(e,n,t){"use strict";t(0);var r=function(){function e(e,n,t){var r=this;this.$mdSidenav=n,this.$scope=t,this.firebaseService=e,this.userSignedOut=this.$scope.$on("USER_SIGNED_OUT",function(e){r.user=void 0,r.$scope.$apply()}),this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(e,n){r.user=angular.extend({},n),r.$scope.$apply()}),this.userUpdated=this.$scope.$on("USER_UPDATED",function(e,n){r.user=n,r.$scope.$apply()})}return e.prototype.openMenu=function(e,n){e(n)},e.prototype.toggleSidenav=function(e){this.$mdSidenav(e).toggle(),console.log(e)},e.prototype.signOut=function(){var e=this;this.firebaseService.signOut().then(function(n){e.user=e.firebaseService.currentUser})},e.$inject=["FirebaseService","$mdSidenav","$scope"],e}();n.header={controller:r,templateUrl:"app/layout/header.html"}},187:function(e,n,t){"use strict";t(0);var r=[{title:"Character Info",sref:"characters",icon:"person"},{title:"Adventure Group",sref:"characters",icon:"group"},{title:"Quest Log",sref:"characters",icon:"help"}],a=function(){function e(e,n,t){var a=this;this.$mdSidenav=e,this.$scope=n,this.characterService=t,this.menu=r,this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(e,n){localStorage.getItem("characters")?a.characters=JSON.parse(localStorage.getItem("characters")):a.getCharacters(),a.signedIn=!0,a.$scope.$apply()}),this.characterListUpdated=this.$scope.$on("CHARACTER_LIST_UPDATED",function(e){a.getCharacters()})}return e.prototype.getCharacters=function(){var e=this;this.characterService.getCharacters().then(function(n){e.characters=n})},e.prototype.toggleSidenav=function(e){this.$mdSidenav(e).toggle(),console.log(e)},e.$inject=["$mdSidenav","$scope","CharacterService"],e}();n.sidenav={controller:a,templateUrl:"app/layout/sidenav.html"}},188:function(e,n){"use strict";n.main={templateUrl:"app/main.html"}},189:function(e,n,t){"use strict";t(0);var r=t(1),a=function(){function e(e,n,t,r,a,i,o){var s=this;this.firebaseService=e,this.gameDataService=n,this.toastService=t,this.characterService=r,this.$scope=a,this.$mdDialog=i,this.$rootScope=o,this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(e,n){localStorage.getItem("characters")?s.characters=JSON.parse(localStorage.getItem("characters")):s.getCharacters()}),this.gameDataLoaded=this.$scope.$on("GAME_DATA_LOADED",function(e){s.gameData=s.gameDataService.gameData,s.$scope.$apply()}),this.gameDataService.gameData&&(this.gameData=this.gameDataService.gameData),this.init()}return e.prototype.init=function(){firebase.auth().currentUser&&(this.userId=firebase.auth().currentUser.uid,this.userId&&(localStorage.getItem("characters")?this.characters=JSON.parse(localStorage.getItem("characters")):this.getCharacters()))},e.prototype.showConfirmDeleteDialog=function(e,n,t){var r=this,a=this.$mdDialog.confirm().title("Confirm Character Delete").textContent("Are you sure you want to to this?").ariaLabel("Confirm Delete").targetEvent(e).ok("Delete").cancel("Cancel");this.$mdDialog.show(a).then(function(){console.log("confirm delete"),r.characters.splice(t,1),r.deleteCharacter(n)},function(){console.log("cancel delete")})},e.prototype.getCharacters=function(){var e=this;this.characterService.getCharacters().then(function(n){e.characters=n})},e.prototype.deleteCharacter=function(e){var n=this;this.firebaseService.deleteCharacter(e).then(function(){n.$rootScope.$broadcast("CHARACTER_LIST_UPDATED"),n.getCharacters()})},e.prototype.showNewCharacterModal=function(e){var n=this;this.$mdDialog.show({templateUrl:"./app/pages/character/new-character.modal.html",parent:r.element(document.body),targetEvent:e,clickOutsideToClose:!0,locals:{gameData:this.gameData},controller:function(e,n,t){e.gameData=t,e.selectRace=function(n){n.subraces?e.subraces=n.subraces:e.subraces=void 0},e.saveCharacter=function(e){n.hide(e)},e.close=function(){n.hide()}}}).then(function(e){n.firebaseService.saveNewCharacter(e).then(function(){n.$rootScope.$broadcast("CHARACTER_LIST_UPDATED"),n.getCharacters()})},function(){})},e.$inject=["FirebaseService","GameDataService","ToastService","CharacterService","$scope","$mdDialog","$rootScope"],e}();n.characterListComponent={controller:a,templateUrl:"app/pages/character/character-list.component.html"}},190:function(e,n){"use strict";var t=function(){function e(e,n,t){this.$q=e,this.$rootScope=n,this.firebaseService=t}return e.prototype.getCharacters=function(){var e=this,n=firebase.auth().currentUser.uid,t="characters/"+n;return this.$q(function(n,r){e.firebaseService.getData(t).then(function(e){var t=Object.keys(e).map(function(n){var t="id";return e[n][t]=n,e[n]});localStorage.setItem("characters",JSON.stringify(t)),n(t)})})},e.prototype.saveNewCharacter=function(e){var n=firebase.auth().currentUser.uid;return this.$q(function(t,r){firebase.database().ref("characters/"+n+"/").push(e).then(function(){t()})})},e.prototype.deleteCharacter=function(e){var n=firebase.auth().currentUser.uid;return this.$q(function(t,r){firebase.database().ref("characters/"+n+"/"+e.id).remove().then(function(){t()})})},e.$inject=["$q","$rootScope","FirebaseService"],e}();n.__esModule=!0,n["default"]=t},191:function(e,n,t){"use strict";var r=t(1);t(0),t(2);var a=function(){function e(e,n,t){var a=this;this.$scope=n,this.$state=t,this.firebaseService=e,this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(e,n){a.user=r.extend({},n),a.$scope.$apply()})}return e.prototype.init=function(){console.log("init")},e.prototype.signIn=function(e,n){var t=this;this.signingIn=!0,this.firebaseService.signIn(e,n).then(function(e){t.signingIn=!1,t.user=r.extend({},e),t.$state.go("profile")})},e.prototype.signOut=function(){var e=this;this.firebaseService.signOut().then(function(n){e.user=e.firebaseService.currentUser})},e.prototype.updateProfile=function(){this.firebaseService.updateProfile(this.user)},e.$inject=["FirebaseService","$scope","$state"],e}();n.firebaseComponent={controller:a,templateUrl:"app/pages/firebase/firebase.component.html"}},192:function(e,n,t){"use strict";var r=t(1),a=function(){function e(e,n,t){this.$q=e,this.$rootScope=n,this.$state=t,firebase.initializeApp(config),this.$rootScope=n,firebase.auth().onAuthStateChanged(function(e){e&&(this.currentUser=e,n.$broadcast("USER_SIGNED_IN",e))})}return e.prototype.signUp=function(e,n){return this.$q(function(t,r){firebase.auth().createUserWithEmailAndPassword(e,n).then(function(){t(),console.log("Sign up Successful!")})["catch"](function(e){r()})})},e.prototype.getData=function(e){return this.$q(function(n,t){firebase.database().ref(e).on("value",function(e){n(e.val())})})},e.prototype.writeUserData=function(e,n){console.log("Write user data");var t=firebase.auth().currentUser.uid;return this.$q(function(r,a){firebase.database().ref(e+"/"+t).set(n)})},e.prototype.saveNewCharacter=function(e){var n=firebase.auth().currentUser.uid;return this.$q(function(t,r){firebase.database().ref("characters/"+n+"/").push(e).then(function(){t()})})},e.prototype.deleteCharacter=function(e){var n=firebase.auth().currentUser.uid;return this.$q(function(t,r){firebase.database().ref("characters/"+n+"/"+e.id).remove().then(function(){t()})})},e.prototype.signIn=function(e,n){return console.log("signing in..."),this.$q(function(t,r){firebase.auth().signInWithEmailAndPassword(e,n).then(function(e){console.log("sign in successful."),t(e)})["catch"](function(e){console.error("error signing in"),r()})})},e.prototype.signOut=function(){var e=this;return console.log("signing out..."),this.$q(function(n,t){firebase.auth().signOut().then(function(){e.currentUser=void 0,localStorage.setItem("characters",null),e.$rootScope.$broadcast("USER_SIGNED_OUT"),e.$state.go("sign-in"),n()},function(e){console.error("error signing out"),t()})})},e.prototype.updateProfile=function(e){var n=this;console.log("updating profile");var t=firebase.auth().currentUser;return this.$q(function(a,i){t.updateProfile(e).then(function(){console.log("updating profile successful."),n.$rootScope.$broadcast("USER_UPDATED",r.extend({},t)),a()},function(e){console.log("error updating profile."),i()})})},e.prototype.getCurrentUser=function(){var e=firebase.auth().currentUser;return e?r.extend({},e):null},e.prototype.uploadFile=function(e){console.log(e);var n=firebase.storage().ref(),t=n.child("images/"+e.name).put(e);t.on("state_changed",function(e){},function(e){console.error("upload error")},function(){console.log("upload complete");var e=t.snapshot.downloadURL;console.log(e)})},e.prototype.uploadProfilePhoto=function(e){var n=this;console.log(e);var t=firebase.storage().ref(),r=t.child("profile-photos/"+e.name).put(e);return this.$q(function(e,t){r.on("state_changed",function(e){},function(e){console.error("upload error"),t()},function(){console.log("upload complete");var t=r.snapshot.downloadURL,a=n.getCurrentUser();a.photoURL=t,n.updateProfile(a).then(function(){e()})})})},e.$inject=["$q","$rootScope","$state"],e}();n.__esModule=!0,n["default"]=a},193:function(e,n){"use strict";var t=["alignments","armor","backgrounds","classes","skills","classFeatures","feats","languages","races","weapons"],r=function(){function e(e,n){var t=this;this.$q=e,this.$rootScope=n,this.gameData=JSON.parse(localStorage.getItem("gameData")),this.gameData?n.$broadcast("GAME_DATA_LOADED"):(this.gameData={},this.getGameData().then(function(){localStorage.setItem("gameData",JSON.stringify(t.gameData)),n.$broadcast("GAME_DATA_LOADED")}))}return e.prototype.getGameData=function(){var e=this;console.log("getting game data...");var n=t.map(function(n){return e.$q(function(t,r){firebase.database().ref("/"+n).once("value").then(function(r){e.gameData[n]=r.val(),t()})})});return this.$q.all(n)},e.$inject=["$q","$rootScope"],e}();n.__esModule=!0,n["default"]=r},194:function(e,n,t){"use strict";t(0);var r=t(1),a=function(){function e(e,n,t){var a=this;this.$scope=t,this.toastService=n,this.firebaseService=e,this.userSignedIn=this.$scope.$on("USER_SIGNED_IN",function(e,n){a.user=r.extend({},n),a.$scope.$apply()}),this.init()}return e.prototype.init=function(){this.getCurrentUser()},e.prototype.getCurrentUser=function(){this.user=this.firebaseService.getCurrentUser()},e.prototype.updateProfile=function(){var e=this;this.firebaseService.updateProfile(this.user).then(function(){e.toastService.showToast("Profile Updated")})},e.prototype.uploadFile=function(e){var n=this;this.firebaseService.uploadProfilePhoto(e).then(function(){n.getCurrentUser()})},e.$inject=["FirebaseService","ToastService","$scope"],e}();n.profileComponent={controller:a,templateUrl:"app/pages/firebase/profile.component.html"}},195:function(e,n,t){"use strict";t(0);var r=function(){function e(e,n,t){this.$scope=n,this.$state=t,this.firebaseService=e}return e.prototype.init=function(){console.log("init")},e.prototype.signUp=function(){var e=this;this.firebaseService.signUp(this.email,this.password).then(function(){e.$state.go("profile")})},e.$inject=["FirebaseService","$scope","$state"],e}();n.signUpComponent={controller:r,templateUrl:"app/pages/firebase/sign-up.component.html"}},196:function(e,n,t){"use strict";t(0);var r=function(){function e(e){this.$mdToast=e}return e.prototype.showToast=function(e){var n=this.$mdToast.simple().textContent(e).position("bottom right");this.$mdToast.show(n)},e.$inject=["$mdToast"],e}();n.__esModule=!0,n["default"]=r},197:function(e,n,t){"use strict";function r(e){e.theme("default").primaryPalette("indigo",{"default":"600"}).accentPalette("orange",{"default":"500"})}r.$inject=["$mdThemingProvider"],t(0),n.__esModule=!0,n["default"]=r},198:function(e,n){"use strict";n.title={templateUrl:"app/title.html"}},199:function(e,n){"use strict";function t(e,n,t){t.html5Mode(!0).hashPrefix("!"),n.otherwise("/"),e.state("app",{url:"/",template:"<firebase></firebase>"}).state("profile",{url:"/profile",template:"<profile></profile>"}).state("sign-in",{url:"/sign-in",template:"<firebase></firebase>"}).state("sign-up",{url:"/sign-up",template:"<signup></signup>"}).state("character-list",{url:"/character-list",template:"<characterlist></characterlist>"})}t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],n.__esModule=!0,n["default"]=t},201:function(e,n,t){t(4),e.exports=t(3)},3:function(e,n,t){"use strict";var r=t(1);r.module("app").run(["$templateCache",function(e){e.put("app/main.html",'\n<div class="main-container">  \n  <main class="main">    \n    <fountain-title></fountain-title>\n    <fountain-techs></fountain-techs>\n  </main>\n  <fountain-footer></fountain-footer>\n</div>'),e.put("app/title.html",'<div class="title">\n  <h1 class="title-h1">\'Allo, \'Allo!</h1>\n  <div>    \n    <img class="title-logo" src="http://fountainjs.io/assets/imgs/yeoman.png">\n    <img class="title-logo" src="http://fountainjs.io/assets/imgs/fountain.png">\n  </div>\n  <h2 class="title-h2">Always a pleasure scaffolding your apps.</h2>\n</div>\n'),e.put("app/layout/footer.html",'<footer class="footer">\n  Build with ♥ by the&nbsp;\n  <a href="https://github.com/orgs/FountainJS/people">\n    FountainJS team\n  </a>\n</footer>\n'),e.put("app/layout/header.html",'<md-toolbar class="app-bar md-whiteframe-2dp">\n  <div class="md-toolbar-tools">\n    <md-button ng-if="!$mdMedia(\'gt-md\')" class="md-icon-button menu-button" aria-label="Settings" ng-click="$ctrl.toggleSidenav(\'right\')">\n      <md-icon class="material-icons">menu</md-icon>\n    </md-button>\n    <h2>\n      <span>DnD Hub</span>\n    </h2>\n    <span flex></span>\n    <md-menu md-position-mode="target-right target" class="header-menu" ng-if="$ctrl.user">\n      \n      <md-button aria-label="Open interactions menu" ng-click="$ctrl.openMenu($mdOpenMenu, $event)">\n      <span ng-if="!$ctrl.user.displayName">{{$ctrl.user.email}}</span>\n        <span ng-if="$ctrl.user.displayName">{{$ctrl.user.displayName}}</span>\n        <img class="app-bar-photo" ng-src="{{$ctrl.user.photoURL}}">\n        <md-icon md-menu-origin class="material-icons">arrow_drop_down</md-icon>\n      </md-button>\n      <md-menu-content width="4">\n        <md-menu-item>\n          <md-button ui-sref="profile">\n            <md-icon class="material-icons">account_box</md-icon>\n            Profile\n          </md-button>\n        </md-menu-item>\n        <md-menu-item>\n          <md-button ui-sref="character-list">\n            <md-icon class="material-icons">group</md-icon>\n            Characters\n          </md-button>\n        </md-menu-item>\n        <md-menu-divider></md-menu-divider>\n        <md-menu-item>\n          <md-button ng-click="$ctrl.signOut();">\n            <md-icon class="material-icons" md-menu-align-target>exit_to_app</md-icon>\n            Sign Out\n          </md-button>\n        </md-menu-item>      \n        \n      </md-menu-content>\n    </md-menu>\n\n    <div ng-if="!$ctrl.user">\n      <md-button ui-sref="sign-up">\n        Sign Up\n      </md-button>\n      <md-button ui-sref="sign-in">\n        Sign In\n      </md-button>\n    </div>\n  </div>\n</md-toolbar>\n\n'),e.put("app/layout/sidenav.html",'<md-sidenav class="md-sidenav-left md-whiteframe-4dp" md-component-id="right" md-is-locked-open="$mdMedia(\'gt-md\')">\r\n\r\n    <section class="md-padding" ng-if="!$ctrl.signedIn || !$ctrl.characters">\r\n      <p>It looks like you haven\'t created any characters yet, <a ui-sref="character-list">go make one!</a></p>\r\n    </section>\r\n\r\n    <section class="md-padding character-select">\r\n      <md-input-container>\r\n        <label>Selected Character</label>\r\n        <md-select ng-model="$ctrl.selectedCharacterId">\r\n          <md-option ng-repeat="character in $ctrl.characters" value="{{character.id}}">\r\n            {{character.name}}\r\n          </md-option>\r\n        </md-select>\r\n      </md-input-container>\r\n    </section>\r\n\r\n    <!--Menu-->\r\n    <ul class="sidenav-menu" ng-if="$ctrl.selectedCharacterId">\r\n      <li ng-repeat="item in $ctrl.menu " id="{{item.title}}">        \r\n        <span ui-sref="{{item.sref}}" class="sidenav-button expand-button" md-ink-ripple>          \r\n          <md-icon class="menu-icon material-icons">{{item.icon}}</md-icon>{{item.title}}</span>\r\n      </li>\r\n    </ul>\r\n\r\n    <section class="md-padding">\r\n      <p>DnD Hub is an online resource for Dungeons and Dragons. Create characters, join adventuring parties, and keep track of your quests, and more.</p>\r\n      <p>DnD Hub is currently in early alpha, and will see significant changes in the weeks and months to come.</p>\r\n      <p>- Devin</p>\r\n    </section>\r\n  <!--</md-content>-->\r\n</md-sidenav>'),e.put("app/pages/character/character-list.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Characters {{$ctrl.test}}\r\n  </h4>\r\n</section>\r\n\r\n<md-button class="md-primary md-raised new-button" ng-click="$ctrl.showNewCharacterModal($event)" ng-disabled="!$ctrl.gameData">New Character</md-button>\r\n\r\n<md-card>\r\n\r\n  <section class="md-padding" layout="row" layout-wrap layout-padding>\r\n    <!-- exact table from live demo -->\r\n    <!--<div flex="100">\r\n      <md-button class="md-primary md-raised" ng-click="$ctrl.showNewCharacterModal($event)" ng-disabled="!$ctrl.gameData">New Character</md-button>      \r\n    </div>-->\r\n\r\n    <!--<div flex="100">\r\n      <md-divider></md-divider>   \r\n    </div>-->\r\n    <md-table-container>\r\n      <table md-table multiple="multiple" ng-model="$ctrl.selected" md-progress="promise">\r\n        <thead md-head md-order="$ctrl.myOrder" md-on-reorder="">\r\n          <tr md-row>\r\n            <th md-column md-order-by="name"><span>Name</span></th>\r\n            <th md-column md-numeric md-order-by="level"><span>Level</span></th>\r\n            <th md-column md-numeric md-order-by="experience"><span>Experience</span></th>\r\n            <th md-column md-numeric md-order-by="class"><span>Class</span></th>\r\n            <th md-column md-numeric md-order-by="race"><span>Race</span></th>\r\n            <th md-column md-numeric md-order-by="alignment"><span>Alignment</span></th>\r\n            <th md-column md-numeric md-order-by="background"><span>Background</span></th>\r\n            <th md-column md-numeric md-order-by="adventuringGroup"><span>Adventuring Group</span></th>\r\n            <th md-column><span></span></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody md-body>\r\n          <tr md-row ng-repeat="character in $ctrl.characters | orderBy: $ctrl.myOrder track by $index">\r\n            <td md-cell>{{character.name}}</td>\r\n            <td md-cell>{{character.level}}</td>\r\n            <td md-cell>{{character.experience}}</td>\r\n            <td md-cell>{{character.class}}</td>\r\n            <td md-cell>{{character.race}}</td>\r\n            <td md-cell>{{character.alignment}}</td>\r\n            <td md-cell>{{character.background}}</td>\r\n            <td md-cell>{{character.adventuringGroup}}</td>\r\n            <td md-cell>\r\n              <md-button class="md-icon-button" aria-label="Delete Character" ng-click="$ctrl.showConfirmDeleteDialog($event, character, $index);">\r\n                <md-icon class="material-icons table-icon">delete</md-icon>\r\n              </md-button>\r\n            </td>\r\n          </tr>\r\n\r\n          <tr md-row md-select="characters" md-select-id="name" md-auto-select ng-if="$ctrl.characters.length === 0">\r\n            <td md-cell colspan="2">No Characters Found</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </md-table-container>\r\n  </section>\r\n</md-card> \r\n\r\n<!--Floating action button-->\r\n<!--<div layout="row">\r\n  <md-button class="md-primary md-fab md-fab-bottom-right">\r\n    <md-icon class="material-icons">add</md-icon>\r\n  </md-button>\r\n\r\n</div>-->'),e.put("app/pages/character/new-character.modal.html",'<md-dialog aria-label="New Character" class="modal-md">\r\n  <md-toolbar>\r\n    <div class="md-toolbar-tools">\r\n      <h2>New Character</h2>\r\n      <span flex></span>\r\n      <md-button class="md-icon-button" ng-click="close()">\r\n        <md-icon class="material-icons" aria-label="Close dialog">close</md-icon>\r\n      </md-button>\r\n    </div>\r\n  </md-toolbar>\r\n  <md-dialog-content>\r\n    <div class="md-dialog-content">\r\n      <form name="myForm">\r\n        <div layout="row">\r\n          <!--Name-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Character Name</label>\r\n            <input type="text" ng-model="character.name" required>\r\n          </md-input-container>\r\n\r\n          <!--Level-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Level</label>\r\n            <input type="number" ng-model="character.level" required>\r\n          </md-input-container>\r\n\r\n          <!--Experience-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Experience</label>\r\n            <input type="number" ng-model="character.experience">\r\n          </md-input-container>          \r\n        </div>\r\n\r\n        \r\n        <div layout="row">\r\n          <!--Class-->\r\n          <md-input-container flex>\r\n            <label>Class</label>\r\n            <md-select ng-model="character.class" required>\r\n              <md-option ng-repeat="class in gameData.classes" value="{{class.name}}">\r\n                {{class.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Race-->\r\n          <md-input-container flex>\r\n            <label>Race</label>\r\n            <md-select ng-model="character.race" required>\r\n              <md-option ng-repeat="race in gameData.races" value="{{race.name}}" ng-click="selectRace(race);">\r\n                {{race.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Subrace-->\r\n          <md-input-container flex>\r\n            <label>Subrace</label>\r\n            <md-select ng-model="character.subrace" ng-disabled="!subraces">\r\n              <md-option ng-repeat="subrace in subraces" value="{{subrace.name}}">\r\n                {{subrace.name}}\r\n              </md-option>\r\n            </md-select>\r\n            \r\n            <!--If there are no subraces-->\r\n            <md-tooltip md-direction="bottom" ng-if="character.race && !subraces">\r\n              No {{character.race}} Subraces\r\n            </md-tooltip>\r\n\r\n            <!--Tell the user to select a race-->\r\n            <md-tooltip md-direction="bottom" ng-if="!character.race">\r\n              Select a race\r\n            </md-tooltip>\r\n          </md-input-container>          \r\n        </div>\r\n\r\n        <div layout="row">\r\n          <!--Class-->\r\n          <md-input-container flex>\r\n            <label>Alignment</label>\r\n            <md-select ng-model="character.alignment">\r\n              <md-option ng-repeat="alignment in gameData.alignments" value="{{alignment.name}}">\r\n                {{alignment.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Background-->\r\n          <md-input-container flex>\r\n            <label>Background</label>\r\n            <md-select ng-model="character.background">\r\n              <md-option ng-repeat="background in gameData.backgrounds" value="{{background.name}}">\r\n                {{background.name}}\r\n              </md-option>\r\n            </md-select>\r\n          </md-input-container>\r\n\r\n          <!--Adventuring Group-->\r\n          <md-input-container flex="33" class="md-no-error-spacer">\r\n            <label>Adventuring Group</label>\r\n            <input type="text" ng-model="character.adventuringGroup">\r\n          </md-input-container>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </md-dialog-content>\r\n  <md-dialog-actions layout="row">\r\n    <span flex></span>\r\n    <md-button ng-click="close()">\r\n      Cancel\r\n    </md-button>\r\n    <md-button class="md-primary md-raised" ng-click="saveCharacter(character)" ng-disabled="myForm.$invalid">\r\n      Save\r\n    </md-button>\r\n  </md-dialog-actions>\r\n</md-dialog>'),e.put("app/pages/firebase/firebase.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Sign In\r\n  </h4>\r\n</section>\r\n\r\n<section class="md-padding" layout="row" layout-align="center center" layout-wrap>\r\n  <div flex="33" flex-md="50" flex-sm="100" flex-xs="100">    \r\n    <md-card class="md-padding">\r\n      <div ng-if="$ctrl.user">\r\n        <p>\r\n          You are currently signed in as           \r\n          <strong ng-if="$ctrl.user.displayName">{{$ctrl.user.displayName}}</strong>\r\n          <strong ng-if="!$ctrl.user.displayName">{{$ctrl.user.email}}</strong>\r\n        </p>\r\n      </div>\r\n      <form name="signInForm" layout="column" ng-submit="$ctrl.signIn($ctrl.email, $ctrl.password)">\r\n        <md-input-container class="md-no-error-spacer">\r\n          <label>Email</label>\r\n          <input ng-model="$ctrl.email" type="email">\r\n        </md-input-container>\r\n\r\n        <md-input-container class="md-no-error-spacer">\r\n          <label>Password</label>\r\n          <input ng-model="$ctrl.password" type="password">\r\n        </md-input-container>\r\n        <input type="submit" class="md-button md-raised md-primary" value="Sign In" ng-disabled="!$ctrl.email || !$ctrl.password">\r\n        <md-button class="md-primary" ui-sref="sign-up">Sign Up</md-button>\r\n        <md-progress-circular md-mode="indeterminate" class="md-margin-auto" ng-if="$ctrl.signingIn"></md-progress-circular>        \r\n      </form>\r\n    </md-card>\r\n  </div>\r\n</section>'),e.put("app/pages/firebase/profile.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Profile\r\n  </h4>\r\n</section>\r\n\r\n<section class="md-padding" layout="row" layout-wrap layout-padding>\r\n  <div flex="33" flex-sm="50" flex-xs="100">\r\n\r\n      <!--Profile Photo-->\r\n      <div class="profile-photo text-center">\r\n        <img ng-if="!$ctrl.user.photoURL && !$ctrl.fileblob" src="http://placehold.it/200x200" class="md-whiteframe-2dp">\r\n        <img ng-if="$ctrl.fileblob" ng-src="{{$ctrl.fileblob}}" class="md-whiteframe-2dp">\r\n        <img ng-if="$ctrl.user.photoURL && !$ctrl.fileblob" ng-src="{{$ctrl.user.photoURL}}" class="md-whiteframe-2dp">\r\n      </div>\r\n\r\n      <!--Upload Image button-->\r\n      <div flex="100">\r\n        <md-button class="md-primary" ng-click="$ctrl.changeImage = true" ng-disabled="$ctrl.changeImage === true">\r\n          Change Profile Image        \r\n        </md-button>\r\n        <md-button class="md-raised" ng-if="$ctrl.changeImage === true" ng-click="$ctrl.changeImage = false; $ctrl.fileblob = null">\r\n          Cancel        \r\n        </md-button>\r\n      </div>  \r\n\r\n      <!--Select Image button-->\r\n      <div flex="100" ng-if="$ctrl.changeImage === true">\r\n        <label for="file-upload" class="md-button md-raised md-primary">\r\n            <md-icon class="material-icons">add_a_photo</md-icon>  \r\n            Select Image\r\n        </label>\r\n        <span class="file-name">{{$ctrl.file.name}}</span>\r\n        <input id="file-upload" type="file" ng-model="$ctrl.file" fileread="$ctrl.file">\r\n        \r\n      </div>\r\n\r\n      <!--Upload Image button-->\r\n      <div flex="100" ng-if="$ctrl.changeImage === true && $ctrl.file">\r\n        <md-button class="md-raised md-accent" ng-click="$ctrl.uploadFile($ctrl.file)" ng-disabled="!$ctrl.file">\r\n          <md-icon class="material-icons">file_upload</md-icon>          \r\n          Upload Image\r\n        </md-button>\r\n      </div>  \r\n  </div>\r\n\r\n  <div flex="33" flex-sm="50" flex-xs="100">\r\n    <div layout="row" layout-wrap>\r\n\r\n      <md-input-container flex="100">\r\n        <label>Email</label>\r\n        <input ng-model="$ctrl.user.email" type="email">\r\n      </md-input-container>\r\n\r\n      <md-input-container flex="100">\r\n        <label>Display Name</label>\r\n        <input ng-model="$ctrl.user.displayName" type="text">\r\n      </md-input-container>    \r\n    </div>\r\n    <div flex="100">\r\n      <md-button class="md-raised md-primary" ng-click="$ctrl.updateProfile();">\r\n        <md-icon class="material-icons">save</md-icon>          \r\n        Save Profile\r\n      </md-button>\r\n    </div>\r\n  </div>\r\n\r\n  <div flex="33" flex-sm="100" flex-xs="100" layout="column">\r\n    Other Info coming soon...\r\n    <p>{{$ctrl.file.name}}</p>\r\n  </div>\r\n  \r\n</section>'),e.put("app/pages/firebase/sign-up.component.html",'<section layout="row" layout-wrap layout-padding class="page-header">\r\n  <h4>\r\n    Sign Up\r\n  </h4>\r\n</section>\r\n\r\n<section class="md-padding" layout="row" layout-align="center center" layout-wrap>\r\n  <div flex="33" flex-md="50" flex-sm="100" flex-xs="100">\r\n    <md-card class="md-padding">\r\n      <div ng-if="$ctrl.user">\r\n        <p>\r\n          You are currently signed in as           \r\n          <strong ng-if="$ctrl.user.displayName">{{$ctrl.user.displayName}}</strong>\r\n          <strong ng-if="!$ctrl.user.displayName">{{$ctrl.user.email}}</strong>\r\n        </p>\r\n      </div>\r\n      <form name="signUpForm" layout="column" ng-submit="$ctrl.signUp()">\r\n        <p>Sign up with your email</p>\r\n        <md-input-container>\r\n          <label>Email</label>\r\n          <input required type="email" name="email" ng-model="$ctrl.email" ng-pattern="/^.+@.+\\..+$/" md-no-asterisk>\r\n          <div ng-messages="signUpForm.email.$error">\r\n            <ng-message when="required">This is required</ng-message>\r\n            <ng-message when="email">Invalid Email Address</ng-message>\r\n          </div>\r\n        </md-input-container>\r\n\r\n        <md-input-container>\r\n          <label>Password</label>\r\n          <input name="password" ng-model="$ctrl.password" type="password" required md-no-asterisk minlength="6">\r\n          <div ng-messages="signUpForm.password.$error">\r\n            <ng-message when="required">This is required</ng-message>\r\n            <ng-message when="minlength">Password must <contain></contain> at least 6 characters</ng-message>\r\n          </div>\r\n        </md-input-container>\r\n\r\n        <md-input-container>\r\n          <label>Re-type Password</label>\r\n          <input name="passwordVerification" ng-model="$ctrl.passwordVerification" type="password" autocomplete="off" required match="$ctrl.password">\r\n          <div ng-messages="signUpForm.passwordVerification.$error">\r\n            <ng-message when="required">This is required</ng-message>\r\n            <ng-message when="match">Passwords do not match</ng-message>\r\n          </div>\r\n        </md-input-container>\r\n\r\n        <input type="submit" class="md-button md-raised md-primary" value="Sign Up" ng-disabled="signUpForm.$invalid">\r\n        <!--<md-progress-circular md-mode="indeterminate" class="md-margin-auto" ng-if="$ctrl.signingIn"></md-progress-circular>        -->\r\n      </form>\r\n    </md-card>\r\n    \r\n    <!--<p>Sign up with your email</p>\r\n    <md-input-container>\r\n      <label>Email</label>\r\n      <input ng-model="$ctrl.email" type="email" autocomplete="off">\r\n    </md-input-container>\r\n\r\n    <md-input-container>\r\n      <label>Password</label>\r\n      <input ng-model="$ctrl.password" type="password" autocomplete="off">\r\n    </md-input-container>\r\n\r\n    <md-input-container>\r\n      <label>Re-type Password</label>\r\n      <input ng-model="$ctrl.passwordVerification" type="password" autocomplete="off">\r\n    </md-input-container>-->\r\n  </div>\r\n  \r\n  <!--<div flex="100" >    \r\n    <md-button class="md-raised md-primary" ng-click="$ctrl.signUp()">Sign Up</md-button>\r\n  </div>-->\r\n</section>');
}])},4:function(e,n,t){"use strict";var r=t(1);t(17),t(2),t(0),t(12),t(9),t(14),t(183);var a=t(199),i=t(197),o=t(188),s=t(186),c=t(187),l=t(198),d=t(185),u=t(184),m=t(196),p=t(192),g=t(193),h=t(190),f=t(191),b=t(194),v=t(195),$=t(189);t(16),r.module("app",["ui.router","ngMessages","ngMaterial","hljs","md.data.table","validation.match"]).config(a["default"]).config(i["default"]).service("FirebaseService",p["default"]).service("GameDataService",g["default"]).service("ToastService",m["default"]).service("CharacterService",h["default"]).directive("fileread",u["default"]).component("app",o.main).component("header",s.header).component("sidenav",c.sidenav).component("fountainTitle",l.title).component("fountainFooter",d.footer).component("firebase",f.firebaseComponent).component("signup",v.signUpComponent).component("profile",b.profileComponent).component("characterlist",$.characterListComponent)}},[201]);