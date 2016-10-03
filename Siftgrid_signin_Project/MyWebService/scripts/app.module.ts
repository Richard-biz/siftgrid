import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FindCompanyComponent} from './find-company.component';
import {routing} from './app.routes';
import { CompanyDomainComponent }   from './company-domain.component';
import {AppComponent} from './app.component';
import {SignInComponent} from './signin.component';
import {Reminder} from './reminder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_PROVIDERS, HttpModule} from '@angular/http';
import {SuccessloginComponent} from './Successlogin.Component';


@NgModule({
    imports: [BrowserModule, HttpModule, routing, ReactiveFormsModule,
        FormsModule],
    declarations: [
        AppComponent,
        CompanyDomainComponent,
        FindCompanyComponent,
        SignInComponent,
        Reminder, SuccessloginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
