import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {FindCompanyComponent} from './find-company.component';
import {CompanyDomainComponent} from './company-domain.component';
import {SignInComponent} from './signin.component';
import {Reminder} from './reminder.component';
import {SuccessloginComponent} from './Successlogin.Component';

export const routes: Routes = [
    { path: '', component: CompanyDomainComponent },
    { path: 'findcompany', component: FindCompanyComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'reminder', component: Reminder },
    { path: 'successlogin', component: SuccessloginComponent }

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
