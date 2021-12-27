import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NavigationItem } from '@fuse/components/navigation';
import { clientNavigation, dmpNavigation, supAdminNavigation } from './data';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<NavigationItem[]> = new ReplaySubject<
        NavigationItem[]
    >(1);

    constructor(private _authService: AuthService) {}

    get navigation$(): Observable<NavigationItem[]> {
        return this._navigation.asObservable();
    }

    get(): Observable<NavigationItem[]> {
        console.log('NOTI', this._authService?.role);

        let selectedNavigation: NavigationItem[] = [];
        switch (this._authService?.role?.name?.toLocaleUpperCase()) {
            case 'SUPER ADMINISTRATEUR':
                selectedNavigation = supAdminNavigation;
                break;
            case 'DMP':
                selectedNavigation = dmpNavigation;
                break;
            case 'CLIENT':
                selectedNavigation = clientNavigation;
                break;
        }
        return of(selectedNavigation).pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }
}
