import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { NavigationService } from '../navigation/navigation.service';
import { RolsModel } from 'app/modules/auth/sign-in/sign-in.component';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private _role: RolsModel = {
        id: 'dsfzfzfz',
        name: 'Super Administrateur',
        redirectRoute: 'supadmin',
    };
    constructor() {}

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set role(role: RolsModel) {
        this._role = role;
    }
    get role(): RolsModel {
        return this._role;
    }

    signIn(credentials: {
        role: RolsModel;
        login: string;
        password: string;
    }): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return of({
            accessToken: TOKEN,
            role: credentials.role,
        }).pipe(
            switchMap((response: any) => {
                this.accessToken = response.accessToken;
                this.role = credentials?.role;
                this._authenticated = true;
                return of(response);
            })
        );
    }

    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }

    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }
        if (this.accessToken) {
            return of(true);
        }
        // check if token expired
        // if (AuthUtils.isTokenExpired(this.accessToken)) {
        //     console.log('Expired');

        //     return of(false);
        // }
        console.log('err');
        return of(false);
    }
}

const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxOTE2MjM5MDIyfQ.DGme0_qbXW79j7VftKA1L1b6qugxEJ6-nqcmnvmi7DA';
