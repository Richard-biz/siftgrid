
export class User {
     _id;
    _tennatid;
    _company;
    _email;
    _password;

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get tennatid() {
        return this._tennatid;
    }
    set tennatid(value) {
        this._tennatid = value;
    }
    get company() {
        return this._company;
    }
    set company(value) {
        this._company = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    } 

    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
}

