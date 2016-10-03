﻿import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import { Observable } from 'rxjs/Rx';
import { Router, Routes, RouterModule } from '@angular/router';
import {SuccessloginComponent} from './Successlogin.Component';
import { FormBuilder, Validators } from '@angular/common';


@Component({
    providers: [UserService],
    selector: 'signin',
    templateUrl: 'views/signin.template.html'
})
export class SignInComponent  {
    router: Router;
    email: string;
    password: string;
    tennantId: string = '10001';

    constructor(public userservice: UserService, router: Router) {
        this.router = router;
    }

    checkLogin(email: string, password: string): void{
        
        if (email === this.email && password === this.password) {
            console.log(email + " " + password);
           // this.router.navigate(['./successlogin']);
            window.location.href = 'http://bizruntime.com/';
        } else {
            console.log("Else condition "+email + " " + password);
        }
        console.log(email + " " + password);
    }
      
    ngOnInit() {
        this.userservice
            .getUserById(this.tennantId)
            .subscribe(data => {
                console.log(data);
                this.email = data['email'];
                this.password = data['password'];
           });
    }
}