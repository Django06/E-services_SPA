import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    constructor() {}

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    signIn(credentials: {
        role: string;
        login: string;
        password: string;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return of({
            accessToken: TOKEN,
            role: credentials.role,
        }).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;
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
