"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_service_1 = require('./user.service');
var router_1 = require('@angular/router');
var SignInComponent = (function () {
    function SignInComponent(userservice, router) {
        this.userservice = userservice;
        this.tennantId = '10001';
        this.router = router;
    }
    SignInComponent.prototype.checkLogin = function (email, password) {
        if (email === this.email && password === this.password) {
            console.log(email + " " + password);
            // this.router.navigate(['./successlogin']);
            window.location.href = 'http://bizruntime.com/';
        }
        else {
            console.log("Else condition " + email + " " + password);
        }
        console.log(email + " " + password);
    };
    SignInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userservice
            .getUserById(this.tennantId)
            .subscribe(function (data) {
            console.log(data);
            _this.email = data['email'];
            _this.password = data['password'];
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            providers: [user_service_1.UserService],
            selector: 'signin',
            templateUrl: 'views/signin.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map