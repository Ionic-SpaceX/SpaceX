webpackJsonp([2],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__launches_launches__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angularfire2_auth__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, spaceXProvider, localNotifications, aFauth, toastCtrl) {
        this.navCtrl = navCtrl;
        this.spaceXProvider = spaceXProvider;
        this.localNotifications = localNotifications;
        this.aFauth = aFauth;
        this.toastCtrl = toastCtrl;
        this.isUser = false;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.getNextLaunch();
        this.aFauth.authState.subscribe(function (user) {
            if (user) {
                _this.scheduleNotifications();
                if (!_this.isUser) {
                    _this.isUser = true;
                }
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Please login to be notified for the next launch',
                    position: 'botton',
                    duration: 5000,
                });
                toast.present();
                if (_this.isUser) {
                    _this.isUser = false;
                }
            }
        });
    };
    HomePage.prototype.getNextLaunch = function () {
        var _this = this;
        this.spaceXProvider.getNextLaunch().subscribe(function (data) {
            _this.nextLaunch = data;
            _this.launchTime = data.launch_date_utc;
            _this.initRefreshCountDown();
        });
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.stopRefresh();
    };
    HomePage.prototype.initRefreshCountDown = function () {
        var _this = this;
        this.refresh();
        this.interval = setInterval(function () { return _this.refresh(); }, 1000);
    };
    HomePage.prototype.stopRefresh = function () {
        clearInterval(this.interval);
    };
    HomePage.prototype.refresh = function () {
        var currentDate = new Date().getTime();
        var timeToLaunchTime = new Date(this.launchTime).getTime() - currentDate;
        var day, hour, minute, seconds;
        seconds = Math.floor(timeToLaunchTime / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        var result = {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
        this.launchTimeCountDown = result;
    };
    HomePage.prototype.seeLaunchDetails = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__launches_launches__["a" /* LaunchDetailsPage */], this.nextLaunch);
    };
    HomePage.prototype.scheduleNotifications = function () {
        var _this = this;
        this.localNotifications.isScheduled(1).then(function (data) {
            if (!data) {
                _this.localNotifications.schedule({
                    id: 0,
                    title: 'You will be notified',
                    text: 'A notification has been scheduled to infrom about the next launch',
                    trigger: { at: new Date(new Date().getTime() + 10 * 1000) },
                });
                _this.localNotifications.schedule({
                    id: 1,
                    title: "Next launch in 1 hour",
                    text: 'The next Space X launch is in 1 hour from now !',
                    trigger: { at: new Date(new Date(_this.launchTime).getTime() - 3600000) },
                });
                _this.localNotifications.schedule({
                    id: 2,
                    title: "Space X launch RIGHT NOW !!!",
                    text: 'That it, Space X is launching a rocket just now',
                    trigger: { at: new Date(new Date(_this.launchTime).getTime()) },
                });
            }
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle icon-only>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      <img src="assets/imgs/about/logo.png" alt="Logo SpaceX">\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="spinner" *ngIf="launchTimeCountDown === undefined">\n    <ion-spinner color="primary" name=\'crescent\'></ion-spinner>\n  </div>\n  <div class="nextLaunchCountDown" *ngIf="launchTimeCountDown">\n    <h4 ion-text color="light" text-center>Next Launch</h4>\n    <h2 ion-text color="light" text-center> {{ nextLaunch.mission_name }} </h2>\n    <ion-row text-center class="countDown">\n      <ion-col>\n        <h1 ion-text color="light">{{ launchTimeCountDown.day }}</h1>\n        <p ion-text color="light">DAYS</p>\n      </ion-col>\n\n      <ion-col>\n        <h1 ion-text color="light">{{ launchTimeCountDown.hour }}</h1>\n        <p ion-text color="light">HOURS</p>\n      </ion-col>\n\n      <ion-col>\n        <h1 ion-text color="light">{{ launchTimeCountDown.minute }}</h1>\n        <p ion-text color="light">MINUTES</p>\n      </ion-col>\n\n      <ion-col>\n        <h1 ion-text color="light">{{ launchTimeCountDown.seconds }}</h1>\n        <p ion-text color="light">SECONDS</p>\n      </ion-col>\n    </ion-row>\n\n    <ion-row text-center>\n      <ion-col>\n        <button ion-button color="light" round (click)="seeLaunchDetails()">See Details</button>\n      </ion-col>\n    </ion-row>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RocketDetailsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RocketsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RocketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RocketDetailsPage = /** @class */ (function () {
    function RocketDetailsPage(params) {
        this.rocket = params.data;
        this.cost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(params.data.cost_per_launch);
    }
    RocketDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/rockets/rocket-details.html"*/'<!--\n  Generated template for the RocketsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary" *ngIf="rocket">\n    <ion-title>{{ rocket.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-card>\n\n      <img *ngIf="rocket.name === \'Falcon 1\'" src="assets/imgs/rockets/falcon1.jpeg">\n      <img *ngIf="rocket.name === \'Falcon 9\'" src="assets/imgs/rockets/falcon9.jpg">\n      <img *ngIf="rocket.name === \'Falcon Heavy\'" src="assets/imgs/rockets/falcon_heavy.jpg">\n\n      <div class="cardContent" text-justify>\n        <ion-card-header text-center color="primary">\n          {{ rocket.name }}\n          <p>\n            <ion-badge [color]="rocket.active ? \'secondary\' : \'danger\'">\n              {{ rocket.active ? \'Active\' : \'Inactive\' }}\n            </ion-badge>\n          </p>\n          <p>\n            <ion-badge color="primary">\n              {{ rocket.success_rate_pct }}% Success Rate\n            </ion-badge>\n          </p>\n        </ion-card-header>\n\n        <ion-card-content>\n          {{ rocket.description }}\n          <ion-row text-center>\n            <ion-col col-6>\n              <ion-badge [color]="rocket.boosters > 0 ? \'secondary\' : \'danger\'">\n                {{ rocket.boosters > 0 ? rocket.boosters + \' Boosters\' : \'No Boosters\' }}\n              </ion-badge>\n            </ion-col>\n\n            <ion-col col-6>\n              <ion-badge color="primary">\n                {{ rocket.stages }} Stages\n              </ion-badge>\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n\n        <ion-item>\n          <ion-icon color="primary" name="flag" item-start large></ion-icon>\n          <h2 ion-text color="primary">Country</h2>\n          <p>{{ rocket.country }}</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-icon color="primary" name="jet" item-start large></ion-icon>\n          <h2 ion-text color="primary">First Flight</h2>\n          <p>{{ rocket.first_flight }}</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-icon color="primary" name="clipboard" item-start large></ion-icon>\n          <h2 ion-text color="primary">Payload</h2>\n          <p>\n            <strong>Mass: </strong>{{ rocket.mass.kg }} kg / {{ rocket.mass.lb }} lb</p>\n          <p>\n            <strong>Height: </strong>{{ rocket.height.meters }} m / {{ rocket.mass.feet }} feet</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-icon color="primary" name="logo-usd" item-start large></ion-icon>\n          <h2 ion-text color="primary">Cost Per Launch</h2>\n          <p>{{ cost }}</p>\n        </ion-item>\n      </div>\n\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/rockets/rocket-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], RocketDetailsPage);
    return RocketDetailsPage;
}());

var RocketsPage = /** @class */ (function () {
    function RocketsPage(navCtrl, navParams, spaceXProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXProvider = spaceXProvider;
        this.getAllRockets();
    }
    RocketsPage.prototype.getAllRockets = function () {
        var _this = this;
        this.spaceXProvider.getAllRockets().subscribe(function (data) {
            _this.rocketList = data;
            _this.spaceXProvider.dismissLoader();
        });
    };
    RocketsPage.prototype.goToRocketDetails = function (rocket) {
        this.navCtrl.push(RocketDetailsPage, rocket);
    };
    RocketsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rockets',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/rockets/rockets.html"*/'<!--\n  Generated template for the RocketsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Rocket List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list *ngIf="rocketList">\n    <button ion-item *ngFor="let rocket of rocketList" (click)="goToRocketDetails(rocket)">\n      {{ rocket.name }}\n      <ion-badge [color]="rocket.active ? \'secondary\' : \'danger\'" item-end>\n        {{ rocket.active ? \'Active\' : \'Inactive\' }}\n      </ion-badge>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/rockets/rockets.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], RocketsPage);
    return RocketsPage;
}());

//# sourceMappingURL=rockets.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaunchpadDetailsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LaunchpadsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LaunchpadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LaunchpadDetailsPage = /** @class */ (function () {
    function LaunchpadDetailsPage(params) {
        this.launchpad = params.data;
    }
    LaunchpadDetailsPage.prototype.ionViewDidEnter = function () {
        if (this.launchpad) {
            this.loadmap();
        }
    };
    LaunchpadDetailsPage.prototype.loadmap = function () {
        this.map = __WEBPACK_IMPORTED_MODULE_3_leaflet___default.a.map("launchpadMap").fitWorld();
        __WEBPACK_IMPORTED_MODULE_3_leaflet___default.a.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        var markerGroup = __WEBPACK_IMPORTED_MODULE_3_leaflet___default.a.featureGroup();
        var marker = __WEBPACK_IMPORTED_MODULE_3_leaflet___default.a.marker([this.launchpad.location.latitude, this.launchpad.location.longitude]);
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
        this.map.setView([this.launchpad.location.latitude, this.launchpad.location.longitude], 10);
        this.map.scrollWheelZoom.disable();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('launchpadMap'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], LaunchpadDetailsPage.prototype, "mapContainer", void 0);
    LaunchpadDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launchpads/launchpad-details.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle icon-only>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>{{launchpad.location.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-card>\n      <div id="launchpadMap" style="width: 100%; height: 350px;"></div>\n\n      <div class="cardContent" text-justify>\n        <ion-card-header text-wrap text-center color="primary">\n          {{ launchpad.full_name }}\n          <p>\n            <ion-badge [color]="launchpad.status ? \'secondary\' : \'danger\'">\n              {{ launchpad.status ? \'Active\' : \'Retired\' }}\n            </ion-badge>\n          </p>\n        </ion-card-header>\n\n        <ion-card-content>\n          {{ launchpad.details }}\n        </ion-card-content>\n\n        <ion-item>\n          <ion-icon color="primary" name="pin" item-start large></ion-icon>\n          <h2 ion-text color="primary">Location</h2>\n          <p>{{ launchpad.location.region }}</p>\n          <p>{{ launchpad.location.name }}</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-icon color="primary" name="jet" item-start large></ion-icon>\n          <h2 ion-text color="primary">Vehicules launched</h2>\n          <p *ngFor="let rocket of launchpad.vehicles_launched">{{ rocket }}</p>\n        </ion-item>\n      </div>\n\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launchpads/launchpad-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], LaunchpadDetailsPage);
    return LaunchpadDetailsPage;
}());

var LaunchpadsPage = /** @class */ (function () {
    function LaunchpadsPage(navCtrl, navParams, spaceXprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXprovider = spaceXprovider;
        this.getLaunchpads();
    }
    LaunchpadsPage.prototype.getLaunchpads = function () {
        var _this = this;
        this.spaceXprovider.getlaunchpads().subscribe(function (data) {
            _this.launchpads = data;
            _this.spaceXprovider.dismissLoader();
        });
    };
    LaunchpadsPage.prototype.goToLaunchpadDatails = function (launchpad) {
        this.navCtrl.push(LaunchpadDetailsPage, launchpad);
    };
    LaunchpadsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-launchpads',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launchpads/launchpads.html"*/'<!--\n  Generated template for the LaunchpadsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle icon-only>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Launchpad List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list *ngIf="launchpads">\n    <button text-wrap ion-item *ngFor="let launchpad of launchpads" (click)="goToLaunchpadDatails(launchpad)">\n      {{ launchpad.location.name }}\n      <p>{{ launchpad.full_name }}</p>\n      <ion-badge [color]="launchpad.status === \'active\' ? \'secondary\' : \'danger\'" item-end>\n        {{ launchpad.status === \'active\' ? \'Active\' : \'Retired\' }}\n      </ion-badge>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launchpads/launchpads.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], LaunchpadsPage);
    return LaunchpadsPage;
}());

//# sourceMappingURL=launchpads.js.map

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 200;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/capsules/capsules.module": [
		244
	],
	"../pages/history/history.module": [
		248
	],
	"../pages/launches/launches-filters-modal/launches-filters-modal.module": [
		250
	],
	"../pages/launches/launches.module": [
		252
	],
	"../pages/launches/past-launches/past-launches.module": [
		256
	],
	"../pages/launches/upcoming-launches/upcoming-launches.module": [
		257
	],
	"../pages/launchpads/launchpads.module": [
		258
	],
	"../pages/login/login.module": [
		259
	],
	"../pages/register/register.module": [
		352
	],
	"../pages/rockets/rockets.module": [
		353
	],
	"../pages/settings/settings.module": [
		355
	],
	"../pages/stats/stats.module": [
		354
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 243;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CapsulesPageModule", function() { return CapsulesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__capsules__ = __webpack_require__(245);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CapsulesPageModule = /** @class */ (function () {
    function CapsulesPageModule() {
    }
    CapsulesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__capsules__["b" /* CapsulesPage */],
                __WEBPACK_IMPORTED_MODULE_2__capsules__["a" /* CapsuleDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__capsules__["b" /* CapsulesPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__capsules__["b" /* CapsulesPage */],
                __WEBPACK_IMPORTED_MODULE_2__capsules__["a" /* CapsuleDetailsPage */],
            ]
        })
    ], CapsulesPageModule);
    return CapsulesPageModule;
}());

//# sourceMappingURL=capsules.module.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapsuleDetailsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CapsulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CapsulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CapsuleDetailsPage = /** @class */ (function () {
    function CapsuleDetailsPage(params) {
        this.capsule = params.data;
    }
    CapsuleDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/capsules/capsule-details.html"*/'<ion-header>\n\n  <ion-navbar color="primary" *ngIf="capsule">\n    <ion-title>{{ capsule.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n\n    <img *ngIf="capsule.name === \'Dragon 1\'" src="assets/imgs/capsules/dragon1.jpg">\n    <img *ngIf="capsule.name === \'Dragon 2\'" src="assets/imgs/capsules/dragon2.jpg">\n    <img *ngIf="capsule.name === \'Crew Dragon\'" src="assets/imgs/capsules/crewdragon.jpg">\n\n    <div class="cardContent" text-justify>\n      <ion-card-header text-center color="primary">\n        {{ capsule.name }}\n        <p>\n          <ion-badge [color]="capsule.active ? \'secondary\' : \'danger\'">\n            {{ capsule.active ? \'Active\' : \'Inactive\' }}\n          </ion-badge>\n        </p>\n      </ion-card-header>\n\n      <ion-item>\n        <ion-icon color="primary" name="people" item-start large></ion-icon>\n        <h2 ion-text color="primary">Crew Capacity</h2>\n        <p>{{ capsule.crew_capacity }}</p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="planet" item-start large></ion-icon>\n        <h2 ion-text color="primary">Orbit Duration</h2>\n        <p>{{ capsule.orbit_duration_yr }} Years</p>\n      </ion-item>\n\n      <ion-item text-wrap>\n        <ion-icon color="primary" name="jet" item-start large></ion-icon>\n        <h2 ion-text color="primary">Thrusters</h2>\n        <p><strong>Type: </strong>{{ capsule.thrusters[0].amount }}x {{ capsule.thrusters[0].type }}</p>\n        <p><strong>Pods: </strong>{{ capsule.thrusters[0].pods }}</p>\n        <p text-capitalize><strong>Fuel: </strong>{{ capsule.thrusters[0].fuel_1 }} & {{ capsule.thrusters[0].fuel_2 }}</p>\n        <p><strong>Thrust: </strong>{{ capsule.thrusters[0].thrust.kN }}kN / {{ capsule.thrusters[0].thrust.lbf }}lbf</p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="flame" item-start large></ion-icon>\n        <h2 ion-text color="primary">Heatshield</h2>\n        <p><strong>Material: </strong>{{ capsule.heat_shield.material }}</p>\n        <p><strong>Max Temperature: </strong>{{ capsule.heat_shield.temp_degrees }}°F</p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="information-circle" item-start large></ion-icon>\n        <h2 ion-text color="primary">Specifications</h2>\n        <p><strong>Height: </strong>{{ capsule.height_w_trunk.meters }}m / {{ capsule.height_w_trunk.feet }}feet</p>\n        <p><strong>Diameter: </strong>{{ capsule.diameter.meters }}m / {{ capsule.diameter.feet }}feet</p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="clipboard" item-start large></ion-icon>\n        <h2 ion-text color="primary">Payload</h2>\n        <p><strong>Launch Mass: </strong>{{ capsule.launch_payload_mass.kg }}kg / {{ capsule.launch_payload_mass.lb }}lb</p>\n\n        <p><strong>Launch Volume: </strong>{{ capsule.launch_payload_vol.cubic_meters }}m<sup>3</sup> / {{ capsule.launch_payload_vol.cubic_feet }}feet<sup>3</sup></p>\n\n        <p><strong>Return Mass: </strong>{{ capsule.return_payload_mass.kg }}kg / {{ capsule.return_payload_mass.lb }}lb</p>\n\n        <p><strong>Return Volume: </strong>{{ capsule.return_payload_vol.cubic_meters }}m<sup>3</sup> / {{ capsule.return_payload_vol.cubic_feet }}feet<sup>3</sup></p>\n      </ion-item>\n\n    </div>\n\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/capsules/capsule-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], CapsuleDetailsPage);
    return CapsuleDetailsPage;
}());

var CapsulesPage = /** @class */ (function () {
    function CapsulesPage(navCtrl, navParams, spaceXProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXProvider = spaceXProvider;
        this.getAllCapsules();
    }
    CapsulesPage.prototype.getAllCapsules = function () {
        var _this = this;
        this.spaceXProvider.getAllCapsules().subscribe(function (data) {
            _this.capsuleList = data;
            _this.spaceXProvider.dismissLoader();
        });
    };
    CapsulesPage.prototype.goToCapsuleDetails = function (capsule) {
        this.navCtrl.push(CapsuleDetailsPage, capsule);
    };
    CapsulesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-capsules',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/capsules/capsules.html"*/'<!--\n  Generated template for the CapsulesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Capsule List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list *ngIf="capsuleList">\n    <button ion-item *ngFor="let capsule of capsuleList" (click)="goToCapsuleDetails(capsule)">\n      {{ capsule.name }}\n      <ion-badge [color]="capsule.active ? \'secondary\' : \'danger\'" item-end>\n        {{ capsule.active ? \'Active\' : \'Inactive\' }}\n      </ion-badge>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/capsules/capsules.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], CapsulesPage);
    return CapsulesPage;
}());

//# sourceMappingURL=capsules.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryPageModule", function() { return HistoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(249);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HistoryPageModule = /** @class */ (function () {
    function HistoryPageModule() {
    }
    HistoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */],
            ]
        })
    ], HistoryPageModule);
    return HistoryPageModule;
}());

//# sourceMappingURL=history.module.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistoryPage = /** @class */ (function () {
    function HistoryPage(navCtrl, navParams, spaceXProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXProvider = spaceXProvider;
        this.filters = {
            order: 'asc',
        };
        this.getCompanyHistory(this.filters);
    }
    HistoryPage.prototype.getCompanyHistory = function (filters) {
        var _this = this;
        this.spaceXProvider.getCompanyHistory(filters).subscribe(function (data) {
            _this.histories = data;
            _this.spaceXProvider.dismissLoader();
        });
    };
    HistoryPage.prototype.changeDataOrder = function () {
        this.filters.order = this.filters.order === 'desc' ? 'asc' : 'desc';
        this.getCompanyHistory(this.filters);
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/history/history.html"*/'<!--\n  Generated template for the HistoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Space X History</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-fab top right edge>\n    <button color="danger" ion-fab mini (click)="changeDataOrder()">\n      <ion-icon [name]="filters.order === \'desc\' ? \'arrow-round-down\' : \'arrow-round-up\'"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <div *ngIf="histories">\n\n    <ion-card *ngFor="let history of histories">\n      <ion-card-header text-center text-wrap color="primary">\n        {{ history.title }}\n        <p>{{ history.event_date_utc | date: \'MMM d, y\' }}</p>\n        <p class="flight_number" *ngIf="history.flight_number">Flight number: {{ history.flight_number}}</p>\n      </ion-card-header>\n      <ion-card-content text-justify>\n        {{ history.details }}\n      </ion-card-content>\n\n      <ion-row>\n        <ion-col align-self-center text-center *ngIf="history.links.wikipedia">\n          <button ion-button icon-left clear small>\n            <ion-icon name="albums"></ion-icon>\n            <div>\n              <a href="{{ history.links.wikipedia}}">Wikipedia</a>\n            </div>\n          </button>\n        </ion-col>\n\n        <ion-col align-self-center text-center *ngIf="history.links.article">\n          <button ion-button icon-left clear small>\n            <ion-icon name="book"></ion-icon>\n            <div>\n              <a href="{{ history.links.article}}">Article</a>\n            </div>\n          </button>\n        </ion-col>\n\n        <ion-col align-self-center text-center *ngIf="history.links.reddit">\n          <button ion-button icon-left clear small>\n            <ion-icon name="logo-reddit"></ion-icon>\n            <div>\n              <a href="{{ history.links.reddit}}">Reddit</a>\n            </div>\n          </button>\n        </ion-col>\n      </ion-row>\n\n    </ion-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/history/history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaunchesFiltersModalPageModule", function() { return LaunchesFiltersModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__launches_filters_modal__ = __webpack_require__(251);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LaunchesFiltersModalPageModule = /** @class */ (function () {
    function LaunchesFiltersModalPageModule() {
    }
    LaunchesFiltersModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__launches_filters_modal__["a" /* LaunchesFiltersModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__launches_filters_modal__["a" /* LaunchesFiltersModalPage */]),
            ],
        })
    ], LaunchesFiltersModalPageModule);
    return LaunchesFiltersModalPageModule;
}());

//# sourceMappingURL=launches-filters-modal.module.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaunchesFiltersModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LaunchesFiltersModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LaunchesFiltersModalPage = /** @class */ (function () {
    function LaunchesFiltersModalPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    LaunchesFiltersModalPage.prototype.ionViewDidLoad = function () {
        var filters = this.navParams.get('currentFilters');
        this.filters = filters;
    };
    LaunchesFiltersModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    LaunchesFiltersModalPage.prototype.resetFilters = function () {
        this.filters = { order: 'desc' };
        this.filters.launch_year = '';
        this.filters.reused = '';
        this.filters.launch_success = '';
    };
    LaunchesFiltersModalPage.prototype.submitNewFilters = function () {
        this.viewCtrl.dismiss(this.filters);
    };
    LaunchesFiltersModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-launches-filters-modal',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/launches-filters-modal/launches-filters-modal.html"*/'<!--\n  Generated template for the LaunchesFiltersModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-buttons start>\n      <button ion-button (click)="resetFilters()">\n        Reset\n      </button>\n    </ion-buttons>\n\n    <ion-title text-center>Filters</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="closeModal()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list *ngIf="filters">\n\n    <ion-item-group>\n      <ion-item-divider color="light">Order</ion-item-divider>\n      <ion-item>\n        <ion-label>\n          Order\n        </ion-label>\n        <ion-select [(ngModel)]="filters.order">\n          <ion-option value="asc">asc</ion-option>\n          <ion-option value="desc">desc</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n      <ion-item-divider color="light">Launch Settings</ion-item-divider>\n\n      <ion-item>\n        <ion-label>\n          Launch Success\n        </ion-label>\n        <ion-select [(ngModel)]="filters.launch_success">\n          <ion-option value="true">Yes</ion-option>\n          <ion-option value="false">No</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>\n          Launch Year\n        </ion-label>\n        <ion-select [(ngModel)]="filters.launch_year">\n          <ion-option value="2006">2006</ion-option>\n          <ion-option value="2007">2007</ion-option>\n          <ion-option value="2008">2008</ion-option>\n          <ion-option value="2009">2009</ion-option>\n          <ion-option value="2010">2010</ion-option>\n          <ion-option value="2011">2011</ion-option>\n          <ion-option value="2012">2012</ion-option>\n          <ion-option value="2013">2013</ion-option>\n          <ion-option value="2014">2014</ion-option>\n          <ion-option value="2015">2015</ion-option>\n          <ion-option value="2016">2016</ion-option>\n          <ion-option value="2017">2017</ion-option>\n          <ion-option value="2018">2018</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>\n          Reused Core\n        </ion-label>\n        <ion-select [(ngModel)]="filters.reused">\n          <ion-option value="true">Yes</ion-option>\n          <ion-option value="false">No</ion-option>\n        </ion-select>\n      </ion-item>\n\n    </ion-item-group>\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar color="primary" (click)="submitNewFilters()">\n    <ion-title text-center >Submit filters</ion-title>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/launches-filters-modal/launches-filters-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], LaunchesFiltersModalPage);
    return LaunchesFiltersModalPage;
}());

//# sourceMappingURL=launches-filters-modal.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaunchesPageModule", function() { return LaunchesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__launches__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LaunchesPageModule = /** @class */ (function () {
    function LaunchesPageModule() {
    }
    LaunchesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__launches__["b" /* LaunchesPage */],
                __WEBPACK_IMPORTED_MODULE_2__launches__["a" /* LaunchDetailsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__launches__["b" /* LaunchesPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__launches__["b" /* LaunchesPage */],
                __WEBPACK_IMPORTED_MODULE_2__launches__["a" /* LaunchDetailsPage */]
            ]
        })
    ], LaunchesPageModule);
    return LaunchesPageModule;
}());

//# sourceMappingURL=launches.module.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PastLaunchesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__launches_filters_modal_launches_filters_modal__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__launches__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stats_stats__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PastLaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PastLaunchesPage = /** @class */ (function () {
    function PastLaunchesPage(navCtrl, navParams, spaceXProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXProvider = spaceXProvider;
        this.modalCtrl = modalCtrl;
        this.filters = {
            order: 'desc',
        };
        this.getPastLaunches(this.filters);
    }
    PastLaunchesPage.prototype.seeStats = function () {
        console.log('stats past launches');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__stats_stats__["a" /* StatsPage */]);
    };
    PastLaunchesPage.prototype.getPastLaunches = function (filters) {
        var _this = this;
        this.spaceXProvider.getPastLaunches(filters).subscribe(function (data) {
            _this.pastLaunches = data;
            _this.spaceXProvider.dismissLoader();
        });
    };
    PastLaunchesPage.prototype.goToLaunchDetails = function (launch) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__launches__["a" /* LaunchDetailsPage */], launch);
    };
    PastLaunchesPage.prototype.openModal = function () {
        var _this = this;
        var filtersModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__launches_filters_modal_launches_filters_modal__["a" /* LaunchesFiltersModalPage */], { currentFilters: this.filters });
        filtersModal.present();
        filtersModal.onDidDismiss(function (newFilters) {
            if (newFilters) {
                Object.keys(newFilters).forEach(function (filter) {
                    if (newFilters[filter] === '') {
                        delete newFilters[filter];
                    }
                });
                _this.filters = newFilters;
                _this.getPastLaunches(_this.filters);
            }
        });
    };
    PastLaunchesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-past-launches',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/past-launches/past-launches.html"*/'<!--\n  Generated template for the PastLaunchesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Missions</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="white" (click)="seeStats()">\n        <ion-icon name="stats"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar color="light-primary">\n    <ion-row text-center *ngIf="pastLaunches === undefined">\n      <ion-col>\n        <ion-spinner color="primary" name=\'crescent\'></ion-spinner>\n      </ion-col>\n      </ion-row>\n      <p text-center text-uppercase *ngIf="pastLaunches" ion-text color="light">\n        {{ pastLaunches.length }} entries\n      </p>\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-fab top right edge>\n    <button color="danger" ion-fab mini (click)="openModal()">\n      <ion-icon name="options"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-list *ngIf="pastLaunches">\n    <ion-item mat-ripple text-wrap *ngFor="let launch of pastLaunches" (click)="goToLaunchDetails(launch)">\n      <ion-thumbnail item-start>\n        <img src="{{launch.links.mission_patch_small}}">\n      </ion-thumbnail>\n      <h2 ion-text color="primary" class="launch_name">{{ launch.mission_name }}</h2>\n      <h3>{{ launch.rocket.rocket_type }} {{ launch.rocket.rocket_name }}</h3>\n      <ion-badge [color]="launch.launch_success ? \'secondary\' : \'danger\'"> Launch {{ launch.launch_success ? "succeed" : "failed" }}</ion-badge>\n      <p>{{ launch.launch_date_utc | date: \'MMM d, y\' }}</p>\n      <p>{{ launch.launch_date_utc | date: \'h:mm a\' }}</p>\n      <p>{{ launch.launch_site.site_name }}</p>\n      <button ion-button clear item-end>View</button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/past-launches/past-launches.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], PastLaunchesPage);
    return PastLaunchesPage;
}());

//# sourceMappingURL=past-launches.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StatsPage = /** @class */ (function () {
    function StatsPage(navCtrl, navParams, spaceXProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXProvider = spaceXProvider;
        this.successLaunches = 0;
        this.failLaunches = 0;
        this.rockets = {
            falcon1: 0,
            falcon9: 0,
            falconHeavy: 0,
            bigFalcon: 0,
        };
        this.getPastLaunches();
    }
    StatsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StatsPage');
    };
    StatsPage.prototype.getPastLaunches = function () {
        var _this = this;
        this.spaceXProvider.getPastLaunches({}).subscribe(function (data) {
            console.log(data);
            data.forEach(function (element) {
                switch (element.rocket.rocket_id) {
                    case 'falcon1':
                        _this.rockets.falcon1++;
                        break;
                    case 'falcon9':
                        _this.rockets.falcon9++;
                        break;
                    case 'falconheaver':
                        _this.rockets.falconHeavy++;
                        break;
                    default:
                        _this.rockets.bigFalcon++;
                }
                switch (element.launch_success) {
                    case true:
                        _this.successLaunches++;
                        break;
                    default:
                        _this.failLaunches++;
                }
            });
            _this.spaceXProvider.dismissLoader();
        });
    };
    StatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stats',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/stats/stats.html"*/'<!--\n  Generated template for the StatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Statistics</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n      Rockets Use\n    </ion-list-header>\n\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/rockets/falcon1.jpeg">\n      </ion-avatar>\n      <h2>Falcon 1</h2>\n      <p><strong>Number of launches: </strong>{{ rockets.falcon1 }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/rockets/falcon9.jpg">\n      </ion-avatar>\n      <h2>Falcon 9</h2>\n      <p><strong>Number of launches: </strong>{{ rockets.falcon9 }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/rockets/falcon_heavy.jpg">\n      </ion-avatar>\n      <h2>Big Falcon</h2>\n      <p><strong>Number of launches: </strong>{{ rockets.bigFalcon }}</p>\n    </ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-list-header>\n      Succeed & Failed launches\n    </ion-list-header>\n\n    <ion-item>\n      <ion-icon name="checkmark-circle" color="secondary" item-start></ion-icon>\n      <h2>Success</h2>\n      <p>{{ successLaunches }}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="close-circle" color="danger" item-start></ion-icon>\n      <h2>Failed</h2>\n      <p>{{ failLaunches }}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/stats/stats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], StatsPage);
    return StatsPage;
}());

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpcomingLaunchesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__launches__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the UpcomingLaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UpcomingLaunchesPage = /** @class */ (function () {
    function UpcomingLaunchesPage(navCtrl, navParams, spaceXProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceXProvider = spaceXProvider;
        this.getUpcominglaunches();
    }
    UpcomingLaunchesPage.prototype.getUpcominglaunches = function () {
        var _this = this;
        this.spaceXProvider.getUpcomingLaunches().subscribe(function (data) {
            _this.upcomingLaunches = data;
            _this.spaceXProvider.dismissLoader();
        });
    };
    UpcomingLaunchesPage.prototype.goToLaunchDetails = function (launch) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__launches__["a" /* LaunchDetailsPage */], launch);
    };
    UpcomingLaunchesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upcoming-launches',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/upcoming-launches/upcoming-launches.html"*/'<!--\n  Generated template for the UpcomingLaunchesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Missions</ion-title>\n  </ion-navbar>\n  <ion-toolbar color="light-primary">\n    <ion-row text-center *ngIf="upcomingLaunches === undefined">\n      <ion-col>\n        <ion-spinner color="primary" name=\'crescent\'></ion-spinner>\n      </ion-col>\n    </ion-row>\n    <p text-center text-uppercase *ngIf="upcomingLaunches" ion-text color="light">\n      {{ upcomingLaunches.length }} entries\n    </p>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list *ngIf="upcomingLaunches">\n    <ion-item *ngFor="let launch of upcomingLaunches" (click)="goToLaunchDetails(launch)">\n      <h2 ion-text color="primary" class="launch_name">{{ launch.mission_name }}</h2>\n      <h3>{{ launch.rocket.rocket_type }} {{ launch.rocket.rocket_name }}</h3>\n      <p>{{ launch.launch_date_utc | date: \'MMM d, y\' }}</p>\n      <p>{{ launch.launch_date_utc | date: \'h:mm a\' }}</p>\n      <p>{{ launch.launch_site.site_name }}</p>\n      <button ion-button clear item-end >View</button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/upcoming-launches/upcoming-launches.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], UpcomingLaunchesPage);
    return UpcomingLaunchesPage;
}());

//# sourceMappingURL=upcoming-launches.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PastLaunchesPageModule", function() { return PastLaunchesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__past_launches__ = __webpack_require__(253);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PastLaunchesPageModule = /** @class */ (function () {
    function PastLaunchesPageModule() {
    }
    PastLaunchesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__past_launches__["a" /* PastLaunchesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__past_launches__["a" /* PastLaunchesPage */]),
            ],
        })
    ], PastLaunchesPageModule);
    return PastLaunchesPageModule;
}());

//# sourceMappingURL=past-launches.module.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpcomingLaunchesPageModule", function() { return UpcomingLaunchesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upcoming_launches__ = __webpack_require__(255);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UpcomingLaunchesPageModule = /** @class */ (function () {
    function UpcomingLaunchesPageModule() {
    }
    UpcomingLaunchesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__upcoming_launches__["a" /* UpcomingLaunchesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__upcoming_launches__["a" /* UpcomingLaunchesPage */]),
            ],
        })
    ], UpcomingLaunchesPageModule);
    return UpcomingLaunchesPageModule;
}());

//# sourceMappingURL=upcoming-launches.module.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaunchpadsPageModule", function() { return LaunchpadsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__launchpads__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LaunchpadsPageModule = /** @class */ (function () {
    function LaunchpadsPageModule() {
    }
    LaunchpadsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__launchpads__["b" /* LaunchpadsPage */],
                __WEBPACK_IMPORTED_MODULE_2__launchpads__["a" /* LaunchpadDetailsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__launchpads__["b" /* LaunchpadsPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__launchpads__["b" /* LaunchpadsPage */],
                __WEBPACK_IMPORTED_MODULE_2__launchpads__["a" /* LaunchpadDetailsPage */]
            ]
        })
    ], LaunchpadsPageModule);
    return LaunchpadsPageModule;
}());

//# sourceMappingURL=launchpads.module.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(260);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, aFauth, alertCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.aFauth = aFauth;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.user = {};
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    LoginPage.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Login error!',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.loginWithEmail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.aFauth.auth.signInWithEmailAndPassword(user.email, user.password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.showAlert(e_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="login-form">\n    <ion-item class="space">\n      <ion-input type="text" [(ngModel)]="user.email" placeholder="Email Address" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item class="space">\n      <ion-input type="password" [(ngModel)]="user.password" placeholder="Password" clearInput></ion-input>\n    </ion-item>\n\n    <button ion-button full (click)="loginWithEmail(user)">Login</button>\n\n    <p ion-text text-center>Do not have account yet ?</p>\n\n    <button ion-button clear small color="primary" (click)="register()">Register</button>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, aFauth, alertCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.aFauth = aFauth;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.user = {};
    }
    RegisterPage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    RegisterPage.prototype.ionViewWillLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    RegisterPage.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Login error!',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    RegisterPage.prototype.registerWithEmail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.aFauth.auth.createUserWithEmailAndPassword(user.email, user.password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="login-form">\n    <ion-item class="space">\n      <ion-input type="text" [(ngModel)]="user.email" placeholder="Email Address" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item class="space">\n      <ion-input type="password" [(ngModel)]="user.password" placeholder="Password" clearInput></ion-input>\n    </ion-item>\n\n    <button ion-button full (click)="registerWithEmail(user)">Register</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]
            ]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RocketsPageModule", function() { return RocketsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rockets__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RocketsPageModule = /** @class */ (function () {
    function RocketsPageModule() {
    }
    RocketsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rockets__["b" /* RocketsPage */],
                __WEBPACK_IMPORTED_MODULE_2__rockets__["a" /* RocketDetailsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rockets__["b" /* RocketsPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__rockets__["b" /* RocketsPage */],
                __WEBPACK_IMPORTED_MODULE_2__rockets__["a" /* RocketDetailsPage */]
            ]
        })
    ], RocketsPageModule);
    return RocketsPageModule;
}());

//# sourceMappingURL=rockets.module.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsPageModule", function() { return StatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stats__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StatsPageModule = /** @class */ (function () {
    function StatsPageModule() {
    }
    StatsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__stats__["a" /* StatsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stats__["a" /* StatsPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__stats__["a" /* StatsPage */],
            ]
        })
    ], StatsPageModule);
    return StatsPageModule;
}());

//# sourceMappingURL=stats.module.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_cache_details__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_3__cache_cache_details__["a" /* CacheDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_3__cache_cache_details__["a" /* CacheDetailsPage */]
            ]
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cache_cache_details__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_cache__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, cacheService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cacheService = cacheService;
        this.checkedCache = true;
    }
    SettingsPage.prototype.goToCacheDetails = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cache_cache_details__["a" /* CacheDetailsPage */]);
    };
    SettingsPage.prototype.activeCache = function (enable) {
        this.cacheService.enableCache(enable);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item text-wrap>\n      <ion-icon name="logo-buffer" item-start></ion-icon>\n      <ion-label class="cache-label" (click)="goToCacheDetails()">\n        <h2>Cache</h2>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_cache__["b" /* CacheService */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_cache__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CacheDetailsPage = /** @class */ (function () {
    function CacheDetailsPage(params, cacheService) {
        this.cacheService = cacheService;
        this.cacheItems = [];
        this.getCacheItems();
    }
    CacheDetailsPage.prototype.clearCache = function () {
        this.cacheService.clearAll();
        this.cacheItems = [];
    };
    CacheDetailsPage.prototype.getCacheItems = function () {
        var _this = this;
        this.cacheService.getRawItems().then(function (res) {
            _this.cacheItems = res;
        });
    };
    CacheDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/settings/cache/cache-details.html"*/'<!--\n  Generated template for the RocketsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Cache Preferences</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="cards-bg">\n  <div *ngIf="cacheItems.length > 0" style="padding: 10px">\n    <button ion-button icon-start full  (click)="clearCache()" color="danger">\n      <ion-icon name="trash"></ion-icon>\n      Clear cache\n    </button>\n  </div>\n  <ion-card *ngIf="cacheItems.length == 0">\n\n    <ion-card-content>\n      Empty Cache\n    </ion-card-content>\n  </ion-card>\n  <ion-card *ngFor="let cacheItem of cacheItems">\n\n    <ion-card-header>\n      {{cacheItem.key}}\n    </ion-card-header>\n\n    <ion-card-content>\n      Expire at : {{cacheItem.expires | date:\'dd-MM-yyyy HH:mm a z\'}}\n    </ion-card-content>\n\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/settings/cache/cache-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_cache__["b" /* CacheService */]])
    ], CacheDetailsPage);
    return CacheDetailsPage;
}());

//# sourceMappingURL=cache-details.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, spaceXProvider) {
        this.navCtrl = navCtrl;
        this.spaceXProvider = spaceXProvider;
        this.getSpaceXInfo();
    }
    AboutPage.prototype.getSpaceXInfo = function () {
        var _this = this;
        this.spaceXProvider.getCompagnyInfo().subscribe(function (data) {
            _this.spaceXInfo = data;
            _this.spaceXProvider.dismissLoader();
        });
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-card *ngIf="spaceXInfo" no-padding>\n\n    <img src="assets/imgs/about/spaceXposter.jpg">\n\n    <div class="cardContent" text-justify>\n      <ion-card-header text-center color="primary">\n        {{ spaceXInfo.name }}\n      </ion-card-header>\n\n      <ion-card-content>\n        {{ spaceXInfo.summary }}\n      </ion-card-content>\n\n      <ion-item>\n        <ion-icon color="primary" name="home" item-start large></ion-icon>\n        <h2 ion-text color="primary">Foundation</h2>\n        <p>Founded by {{ spaceXInfo.founder }} in {{ spaceXInfo.founded }}</p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="pin" item-left large></ion-icon>\n        <h2 ion-text color="primary">Headquarter</h2>\n        <p> {{ spaceXInfo.headquarters.state}}, {{ spaceXInfo.headquarters.city }} </p>\n        <p> {{ spaceXInfo.headquarters.address }} </p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="people" item-left large></ion-icon>\n        <h2 ion-text color="primary">Employees</h2>\n        <p> {{ spaceXInfo.employees}} </p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="jet" item-left large></ion-icon>\n        <h2 ion-text color="primary">Launch Sites</h2>\n        <p> {{ spaceXInfo.launch_sites}} </p>\n        <p> Test Sites: {{ spaceXInfo.test_sites}} </p>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon color="primary" name="car" item-left large></ion-icon>\n        <h2 ion-text color="primary">Vehicles</h2>\n        <p> {{ spaceXInfo.vehicles}} </p>\n      </ion-item>\n    </div>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(414);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_firebase_config__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_space_x_space_x__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_capsules_capsules_module__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_rockets_rockets_module__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_launches_launches_module__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_launches_upcoming_launches_upcoming_launches_module__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_launches_past_launches_past_launches_module__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_launches_launches_filters_modal_launches_filters_modal_module__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_cache__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings_module__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_stats_stats_module__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login_module__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_register_register_module__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_platform_browser_animations__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__material_module__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_launchpads_launchpads_module__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_screen_orientation__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_history_history_module__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__node_modules_ionic_native_local_notifications__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_24__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_25__material_module__["a" /* MaterialModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_13__pages_capsules_capsules_module__["CapsulesPageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_rockets_rockets_module__["RocketsPageModule"],
                __WEBPACK_IMPORTED_MODULE_15__pages_launches_launches_module__["LaunchesPageModule"],
                __WEBPACK_IMPORTED_MODULE_16__pages_launches_upcoming_launches_upcoming_launches_module__["UpcomingLaunchesPageModule"],
                __WEBPACK_IMPORTED_MODULE_17__pages_launches_past_launches_past_launches_module__["PastLaunchesPageModule"],
                __WEBPACK_IMPORTED_MODULE_18__pages_launches_launches_filters_modal_launches_filters_modal_module__["LaunchesFiltersModalPageModule"],
                __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings_module__["SettingsPageModule"],
                __WEBPACK_IMPORTED_MODULE_28__pages_history_history_module__["HistoryPageModule"],
                __WEBPACK_IMPORTED_MODULE_19_ionic_cache__["a" /* CacheModule */].forRoot({ keyPrefix: 'my-spacex-cache' }),
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_23__pages_register_register_module__["RegisterPageModule"],
                __WEBPACK_IMPORTED_MODULE_26__pages_launchpads_launchpads_module__["LaunchpadsPageModule"],
                __WEBPACK_IMPORTED_MODULE_21__pages_stats_stats_module__["StatsPageModule"],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {
                    tabsPlacement: 'bottom',
                }, {
                    links: [
                        { loadChildren: '../pages/capsules/capsules.module#CapsulesPageModule', name: 'CapsulesPage', segment: 'capsules', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/history/history.module#HistoryPageModule', name: 'HistoryPage', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/launches/launches-filters-modal/launches-filters-modal.module#LaunchesFiltersModalPageModule', name: 'LaunchesFiltersModalPage', segment: 'launches-filters-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/launches/launches.module#LaunchesPageModule', name: 'LaunchesPage', segment: 'launches', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/launches/past-launches/past-launches.module#PastLaunchesPageModule', name: 'PastLaunchesPage', segment: 'past-launches', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/launches/upcoming-launches/upcoming-launches.module#UpcomingLaunchesPageModule', name: 'UpcomingLaunchesPage', segment: 'upcoming-launches', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/launchpads/launchpads.module#LaunchpadsPageModule', name: 'LaunchpadsPage', segment: 'launchpads', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rockets/rockets.module#RocketsPageModule', name: 'RocketsPage', segment: 'rockets', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stats/stats.module#StatsPageModule', name: 'StatsPage', segment: 'stats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["b" /* AngularFireAuthModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */]
                },
                __WEBPACK_IMPORTED_MODULE_12__providers_space_x_space_x__["a" /* SpaceXProvider */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_29__node_modules_ionic_native_local_notifications__["a" /* LocalNotifications */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpaceXProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_cache__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the SpaceXProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SpaceXProvider = /** @class */ (function () {
    function SpaceXProvider(http, cache, loadingCtrl) {
        this.http = http;
        this.cache = cache;
        this.loadingCtrl = loadingCtrl;
        this.apiUrl = 'https://api.spacexdata.com/v2';
    }
    SpaceXProvider.prototype.showLoader = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        this.loader.present();
    };
    SpaceXProvider.prototype.dismissLoader = function () {
        if (this.loader !== undefined) {
            this.loader.dismiss();
            this.loader = undefined;
        }
    };
    SpaceXProvider.prototype.getCompagnyInfo = function () {
        var _this = this;
        var cacheKey = this.apiUrl + '/info';
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getCompanyHistory = function (filters) {
        var _this = this;
        var receivedFilters = '';
        var filtersKeys = filters != null ? Object.keys(filters) : null;
        if (filtersKeys != null && filtersKeys.length > 0) {
            filtersKeys.forEach(function (filter, index) {
                if (index === 0) {
                    receivedFilters += "?" + filter + "=" + encodeURIComponent(filters[filter]);
                }
                else {
                    receivedFilters += "&" + filter + "=" + encodeURIComponent(filters[filter]);
                }
            });
        }
        var cacheKey = this.apiUrl + "/info/history/" + receivedFilters;
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromDelayedObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getAllRockets = function () {
        var _this = this;
        var cacheKey = this.apiUrl + '/rockets';
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getAllCapsules = function () {
        var _this = this;
        var cacheKey = this.apiUrl + '/capsules';
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getlaunchpads = function () {
        var _this = this;
        var cacheKey = this.apiUrl + "/launchpads";
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromDelayedObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getAllLaunches = function (filters) {
        var receivedFilters = '';
        var filtersKeys = filters != null ? Object.keys(filters) : null;
        if (filtersKeys != null && filtersKeys.length > 0) {
            filtersKeys.forEach(function (filter, index) {
                if (index === 0) {
                    receivedFilters += "?" + filter + "=" + encodeURIComponent(filters[filter]);
                }
                else {
                    receivedFilters += "&" + filter + "=" + encodeURIComponent(filters[filter]);
                }
            });
        }
        var cacheKey = this.apiUrl + ("/launches/" + receivedFilters);
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getPastLaunches = function (filters) {
        var _this = this;
        var receivedFilters = '';
        var filtersKeys = filters != null ? Object.keys(filters) : null;
        if (filtersKeys != null && filtersKeys.length > 0) {
            filtersKeys.forEach(function (filter, index) {
                if (index === 0) {
                    receivedFilters += "?" + filter + "=" + encodeURIComponent(filters[filter]);
                }
                else {
                    receivedFilters += "&" + filter + "=" + encodeURIComponent(filters[filter]);
                }
            });
        }
        var cacheKey = this.apiUrl + ("/launches/" + receivedFilters);
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getUpcomingLaunches = function () {
        var _this = this;
        var cacheKey = this.apiUrl + "/launches/upcoming";
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getNextLaunch = function () {
        var cacheKey = this.apiUrl + "/launches/next";
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getSpecificInformationWithId = function (information, id) {
        var _this = this;
        var cacheKey = this.apiUrl + "/" + information + "/" + id;
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromDelayedObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.getLatestLaunch = function () {
        var _this = this;
        var cacheKey = this.apiUrl + "/launches/latest";
        this.isCached(cacheKey).then(function (result) {
            if (!result) {
                _this.showLoader();
            }
        });
        var request = this.http.get(cacheKey);
        return this.cache.loadFromObservable(cacheKey, request);
    };
    SpaceXProvider.prototype.isCached = function (key) {
        var result = this.cache.itemExists(key);
        return result;
    };
    SpaceXProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], SpaceXProvider);
    return SpaceXProvider;
}());

//# sourceMappingURL=space-x.js.map

/***/ }),

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_rockets_rockets__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_capsules_capsules__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_launches_launches__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_cache__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_launchpads_launchpads__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_screen_orientation__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_history_history__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(260);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, aFauth, cache, screenOrientation) {
        this.statusBar = statusBar;
        this.aFauth = aFauth;
        this.cache = cache;
        this.screenOrientation = screenOrientation;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.isUser = false;
        this.platform = platform;
        this.initializeApp();
        this.cache.setDefaultTTL(60 * 60);
        this.activePage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.isUserConnected();
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */], icon: 'home' },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */], icon: 'information-circle' },
            { title: 'History', component: __WEBPACK_IMPORTED_MODULE_13__pages_history_history__["a" /* HistoryPage */], icon: 'bookmarks' },
            { title: 'Rockets', component: __WEBPACK_IMPORTED_MODULE_5__pages_rockets_rockets__["b" /* RocketsPage */], icon: 'jet' },
            { title: 'Capsule', component: __WEBPACK_IMPORTED_MODULE_6__pages_capsules_capsules__["b" /* CapsulesPage */], icon: 'moon' },
            { title: 'Missions', component: __WEBPACK_IMPORTED_MODULE_7__pages_launches_launches__["b" /* LaunchesPage */], icon: 'planet' },
            { title: 'Launchpads', component: __WEBPACK_IMPORTED_MODULE_11__pages_launchpads_launchpads__["b" /* LaunchpadsPage */], icon: 'pin' },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */], icon: 'cog' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.backgroundColorByHexString("#575fcf");
            _this.statusBar.styleLightContent();
            _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
        this.activePage = page;
    };
    MyApp.prototype.isActivePage = function (page) {
        return this.activePage == page;
    };
    MyApp.prototype.logout = function () {
        this.aFauth.auth.signOut();
    };
    MyApp.prototype.login = function () {
        console.log('login');
        this.nav.push(__WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.isUserConnected = function () {
        var _this = this;
        this.aFauth.authState.subscribe(function (user) {
            if (user) {
                _this.isUser = true;
            }
            else {
                _this.isUser = false;
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-content>\n    <div class="header-nav">\n      <div class="header-overlay"></div>\n      <h3 id="menuTitle">Space X</h3>\n    </div>\n\n    <mat-nav-list>\n      <mat-nav-list>\n        <mat-list-item [class.active]="isActivePage(pages[0])" menuClose (click)="openPage(pages[0])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[0].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[0].title}}</h3>\n        </mat-list-item>\n\n        <mat-list-item  [class.active]="isActivePage(pages[1])" menuClose (click)="openPage(pages[1])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[1].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[1].title}}</h3>\n        </mat-list-item>\n\n        <mat-list-item  [class.active]="isActivePage(pages[2])" menuClose (click)="openPage(pages[2])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[2].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[2].title}}</h3>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <h3 mat-subheader>Vehicules</h3>\n        <mat-list-item  [class.active]="isActivePage(pages[3])" menuClose (click)="openPage(pages[3])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[3].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[3].title}}</h3>\n        </mat-list-item>\n\n        <mat-list-item  [class.active]="isActivePage(pages[4])" menuClose (click)="openPage(pages[4])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[4].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[4].title}}</h3>\n        </mat-list-item>\n\n        <mat-list-item [class.active]="isActivePage(pages[5])"  menuClose (click)="openPage(pages[5])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[5].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[5].title}}</h3>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <h3 mat-subheader>Others</h3>\n        <mat-list-item [class.active]="isActivePage(pages[6])"  menuClose (click)="openPage(pages[6])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[6].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[6].title}}</h3>\n        </mat-list-item>\n\n        <mat-list-item [class.active]="isActivePage(pages[7])"  menuClose (click)="openPage(pages[7])">\n          <mat-icon matListIcon>\n            <ion-icon color="primary" name="{{pages[7].icon}}">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="primary">{{pages[7].title}}</h3>\n        </mat-list-item>\n\n        <mat-list-item *ngIf="isUser" menuClose (click)="logout()">\n          <mat-icon matListIcon>\n            <ion-icon color="danger" name="person">\n            </ion-icon></mat-icon>\n          <h3 ion-text matLine color="danger">Logout</h3>\n        </mat-list-item>\n\n        <mat-list-item *ngIf="!isUser" menuClose (click)="login()">\n          <mat-icon matListIcon>\n            <ion-icon color="secondary" name="person">\n            </ion-icon>\n          </mat-icon>\n          <h3 ion-text matLine color="secondary">Login</h3>\n        </mat-list-item>\n\n      </mat-nav-list>\n    </mat-nav-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_8_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyC2fh6l42TmwP2AyHGCViraiBWhHip2jUw",
    authDomain: "esgispacex.firebaseapp.com",
    databaseURL: "https://esgispacex.firebaseio.com",
    projectId: "esgispacex",
    storageBucket: "esgispacex.appspot.com",
    messagingSenderId: "321576493316"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_cdk_table__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_cdk_accordion__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_a11y__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_bidi__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_overlay__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_cdk_observers__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_cdk_portal__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["D" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatDividerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["z" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["B" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["C" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["E" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["G" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_cdk_table__["m" /* CdkTableModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_cdk_a11y__["a" /* A11yModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_cdk_bidi__["a" /* BidiModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_cdk_accordion__["c" /* CdkAccordionModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_cdk_observers__["a" /* ObserversModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_cdk_overlay__["e" /* OverlayModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["b" /* PlatformModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_cdk_portal__["g" /* PortalModule */],
            ],
            declarations: []
        })
    ], MaterialModule);
    return MaterialModule;
}());

//# sourceMappingURL=material.module.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaunchDetailsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LaunchesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__past_launches_past_launches__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upcoming_launches_upcoming_launches__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_space_x_space_x__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rockets_rockets__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__launchpads_launchpads__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LaunchDetailsPage = /** @class */ (function () {
    function LaunchDetailsPage(navParams, navCtrl, spaceXProvider) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.spaceXProvider = spaceXProvider;
        this.launch = navParams.data;
        this.sourcePageLaunch = this.navCtrl.getActive().name;
    }
    LaunchDetailsPage.prototype.ionViewDidEnter = function () {
        this.launchTime = this.navParams.data.launch_date_utc;
        if (this.sourcePageLaunch === 'UpcomingLaunchesPage' || this.sourcePageLaunch === "HomePage") {
            this.initRefreshCountDown();
        }
    };
    LaunchDetailsPage.prototype.ionViewDidLeave = function () {
        this.stopRefresh();
    };
    LaunchDetailsPage.prototype.getSpecificInformation = function (info, id) {
        var _this = this;
        this.spaceXProvider.getSpecificInformationWithId(info, id).subscribe(function (data) {
            switch (info) {
                case 'rockets':
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__rockets_rockets__["a" /* RocketDetailsPage */], data);
                    break;
                case 'launchpads':
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__launchpads_launchpads__["a" /* LaunchpadDetailsPage */], data);
                    break;
                default:
                    return;
            }
            _this.spaceXProvider.dismissLoader();
        });
    };
    LaunchDetailsPage.prototype.initRefreshCountDown = function () {
        var _this = this;
        this.refresh();
        this.interval = setInterval(function () { return _this.refresh(); }, 1000);
    };
    LaunchDetailsPage.prototype.stopRefresh = function () {
        clearInterval(this.interval);
    };
    LaunchDetailsPage.prototype.refresh = function () {
        var currentDate = new Date().getTime();
        var timeToLaunchTime = new Date(this.launchTime).getTime() - currentDate;
        var day, hour, minute, seconds;
        seconds = Math.floor(timeToLaunchTime / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        var result = {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
        this.launchTimeCountDown = result;
    };
    LaunchDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/launch-details.html"*/'<!--\n  Generated template for the RocketsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>{{ launch.mission_name }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="launch_details">\n  <ion-card no-padding>\n\n    <img class="launchPatch" *ngIf="launch.links.mission_patch" src="{{launch.links.mission_patch}}">\n    <ion-card class="nextLaunchTimerCard" *ngIf="sourcePageLaunch === \'UpcomingLaunchesPage\' || sourcePageLaunch === \'HomePage\'">\n      <ion-card-header text-center>\n        <h2 ion-text color="primary" class="launch_name">{{ launch.mission_name }}</h2>\n      </ion-card-header>\n\n      <ion-card-content>\n        <ion-row text-center *ngIf="launchTimeCountDown === undefined">\n          <ion-col>\n            <ion-spinner name=\'crescent\'></ion-spinner>\n          </ion-col>\n        </ion-row>\n        <div *ngIf="launchTimeCountDown" class="launchCountDown">\n          <ion-row text-center>\n            <ion-col>\n              <h1>{{ launchTimeCountDown.day }}</h1>\n              <sub ion-text color="primary">DAYS</sub>\n            </ion-col>\n            <ion-col>\n              <h1>{{ launchTimeCountDown.hour }}</h1>\n              <sub ion-text color="primary">HOURS</sub>\n            </ion-col>\n            <ion-col>\n              <h1>{{ launchTimeCountDown.minute }}</h1>\n              <sub ion-text color="primary">MINUTES</sub>\n            </ion-col>\n            <ion-col>\n              <h1>{{ launchTimeCountDown.seconds }}</h1>\n              <sub ion-text color="primary">SECONDS</sub>\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-card-content>\n    </ion-card>\n\n    <div class="cardContent" text-justify>\n      <ion-card-header text-center color="primary">\n        <ion-badge *ngIf="launch.launch_success !== null" [color]="launch.launch_success ? \'secondary\' : \'danger\'">\n          Launch {{ launch.launch_success ? \'succeed\' : \'failed\' }}\n        </ion-badge>\n      </ion-card-header>\n\n      <ion-card-content *ngIf="launch.details">\n        <p class="launch_details">\n          {{ launch.details }}\n        </p>\n      </ion-card-content>\n\n      <ion-item text-wrap text-center>\n        <ion-badge [color]="launch.reuse.capsule ? \'secondary\' : \'danger\'">Capsule</ion-badge>\n        <ion-badge [color]="launch.reuse.core ? \'secondary\' : \'danger\'">Core</ion-badge>\n        <ion-badge [color]="launch.reuse.fairings ? \'secondary\' : \'danger\'">Fairings</ion-badge>\n        <ion-badge [color]="launch.reuse.side_core1 ? \'secondary\' : \'danger\'">Side Core 1</ion-badge>\n        <ion-badge [color]="launch.reuse.side_core2 ? \'secondary\' : \'danger\'">Side Core 2</ion-badge>\n      </ion-item>\n\n      <ion-item text-wrap>\n        <ion-icon color="primary" name="jet" item-start></ion-icon>\n        <h2 ion-text color="primary">Rocket</h2>\n        <button ion-item (click)="getSpecificInformation(\'rockets\', launch.rocket.rocket_id)">\n          <p>{{ launch.rocket.rocket_type }} {{ launch.rocket.rocket_name }}</p>\n        </button>\n      </ion-item>\n\n      <ion-item text-wrap>\n        <ion-icon color="primary" name="pin" item-start></ion-icon>\n        <h2 ion-text color="primary">Launch Site</h2>\n        <button ion-item (click)="getSpecificInformation(\'launchpads\', launch.launch_site.site_id)">\n          <p>{{ launch.launch_site.site_name_long }}</p>\n        </button>\n      </ion-item>\n\n      <ion-item text-wrap *ngIf="sourcePageLaunch === \'PastLaunchesPage\'">\n        <ion-icon color="primary" name="time" item-start></ion-icon>\n        <h2 ion-text color="primary">Launch Time</h2>\n        <p>{{ launch.launch_date_utc | date: \'MMM d, y h:mm a\' }}</p>\n      </ion-item>\n\n      <ion-row>\n        <ion-col align-self-center text-center *ngIf="launch.links.video_link">\n          <button ion-button icon-left clear small>\n            <ion-icon name="logo-youtube"></ion-icon>\n            <div>\n              <a href="{{ launch.links.video_link}}">Video</a>\n            </div>\n          </button>\n        </ion-col>\n\n        <ion-col align-self-center text-center *ngIf="launch.links.article_link">\n          <button ion-button icon-left clear small>\n            <ion-icon name="book"></ion-icon>\n            <div>\n              <a href="{{ launch.links.article_link}}">Article</a>\n            </div>\n          </button>\n        </ion-col>\n\n        <ion-col align-self-center text-center *ngIf="launch.links.reddit_launch">\n          <button ion-button icon-left clear small>\n            <ion-icon name="logo-reddit"></ion-icon>\n            <div>\n              <a href="{{ launch.links.reddit_launch}}">Reddit</a>\n            </div>\n          </button>\n        </ion-col>\n      </ion-row>\n\n    </div>\n\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/launch-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_space_x_space_x__["a" /* SpaceXProvider */]])
    ], LaunchDetailsPage);
    return LaunchDetailsPage;
}());

var LaunchesPage = /** @class */ (function () {
    function LaunchesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__past_launches_past_launches__["a" /* PastLaunchesPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__upcoming_launches_upcoming_launches__["a" /* UpcomingLaunchesPage */];
    }
    LaunchesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-launches',template:/*ion-inline-start:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/launches.html"*/'<!--\n  Generated template for the LaunchesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content>\n  <ion-tabs color="primary">\n    <ion-tab [root]="tab1Root" tabTitle="Past"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="Upcoming"></ion-tab>\n  </ion-tabs>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/Ionic-SpaceX/SpaceX/src/pages/launches/launches.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], LaunchesPage);
    return LaunchesPage;
}());

//# sourceMappingURL=launches.js.map

/***/ })

},[409]);
//# sourceMappingURL=main.js.map