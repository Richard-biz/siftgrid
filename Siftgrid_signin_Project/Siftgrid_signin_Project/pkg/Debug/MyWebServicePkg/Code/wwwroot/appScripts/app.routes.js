"use strict";
var router_1 = require('@angular/router');
var find_company_component_1 = require('./find-company.component');
var company_domain_component_1 = require('./company-domain.component');
var signin_component_1 = require('./signin.component');
var reminder_component_1 = require('./reminder.component');
var Successlogin_Component_1 = require('./Successlogin.Component');
exports.routes = [
    { path: '', component: company_domain_component_1.CompanyDomainComponent },
    { path: 'findcompany', component: find_company_component_1.FindCompanyComponent },
    { path: 'signin', component: signin_component_1.SignInComponent },
    { path: 'reminder', component: reminder_component_1.Reminder },
    { path: 'successlogin', component: Successlogin_Component_1.SuccessloginComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map