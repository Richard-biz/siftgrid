"use strict";
var home_component_1 = require('./home.component');
var login_component_1 = require('./login.component');
var find_company_component_1 = require('./find-company.component');
var logintocompany_component_1 = require('./logintocompany.component');
var password_reset_component_1 = require('./password-reset.component');
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'findcompany', component: find_company_component_1.FindCompanyComponent },
    { path: 'logintocompany', component: logintocompany_component_1.LoginToCompanyComponent },
    { path: 'passwordreset', component: password_reset_component_1.PasswordResetComponent }
];
//# sourceMappingURL=routes.component.js.map