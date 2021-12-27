import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { NavigationService } from 'app/core/navigation/navigation.service';
import {
    catchError,
    EMPTY,
    map,
    Observable,
    of,
    Subject,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject();

    @ViewChild('signInNgForm') signInNgForm: NgForm;
    signInForm: FormGroup;
    rols$: Observable<RolsModel[]>;
    constructor(
        private _authService: AuthService,
        private _fb: FormBuilder,
        private _router: Router,
        private _navigationService: NavigationService
    ) {}

    ngOnInit(): void {
        this.rols$ = of(ROLS);
        this.signInForm = this._fb.group({
            role: [ROLS[0], [Validators.required]],
            login: ['test', [Validators.required]],
            password: ['123', Validators.required],
        });
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();
        this._authService
            .signIn(this.signInForm.value)
            .pipe(
                takeUntil(this._unsubscribe$),
                map((res) => {
                    this._navigationService.get();
                    const redirectURL = res?.role?.redirectRoute;
                    this._router.navigateByUrl(redirectURL);
                }),
                catchError((err) => {
                    this.signInForm.enable();
                    return EMPTY;
                })
            )
            .subscribe();
    }
    ngOnDestroy(): void {
        this._unsubscribe$.next(null);
        this._unsubscribe$.complete();
    }
}

const ROLS: RolsModel[] = [
    {
        id: '74947948749847',
        name: 'Super Administrateur',
        redirectRoute: 'supadmin',
    },
    {
        id: '83833993839839',
        name: 'DMP',
        redirectRoute: 'dmp',
    },
    {
        id: '00094484884844',
        name: 'Client',
        redirectRoute: 'client',
    },
];

export interface RolsModel {
    name: string;
    id: string;
    redirectRoute: string;
}
