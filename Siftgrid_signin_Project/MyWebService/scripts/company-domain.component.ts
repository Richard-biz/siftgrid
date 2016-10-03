﻿import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import { Observable } from 'rxjs/Rx';
import { Router, Routes, RouterModule } from '@angular/router';

@Component({
    providers: [UserService],
    selector: 'companydomain',
    templateUrl: 'views/companydomain.template.html'
})
export class CompanyDomainComponent implements OnInit {
    invalidCompany: boolean=false;
    router: Router;
    domainname: string;
    tennantId: string = '10001';
    constructor(public userservice: UserService, router: Router) {
        this.invalidCompany;
        this.router = router;

    }

    checkCompanyName(comapnyName: string) {
        if (comapnyName === this.domainname) {
            this.router.navigate(['./signin']);
            this.invalidCompany = false;
        } else {
            this.invalidCompany = true;
        }
        console.log(comapnyName);
    }

    ngOnInit() {

        this.userservice
            .getUserById(this.tennantId)
            .subscribe(data => {
                console.log(data);
                for (var key in data)
                {
                    console.log(data[key])
                }
                this.domainname = data['company'];
            });
    }
}