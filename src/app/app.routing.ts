import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'supadmin' },
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
        ],
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'supadmin',
                loadChildren: () =>
                    import('app/modules/sup-admin/sup-admin.module').then(
                        (m) => m.SupAdminModule
                    ),
            },
            {
                path: 'client',
                loadChildren: () =>
                    import('app/modules/client/client.module').then(
                        (m) => m.ClientModule
                    ),
            },
            {
                path: 'dmp',
                loadChildren: () =>
                    import('app/modules/client/client.module').then(
                        (m) => m.ClientModule
                    ),
            },
        ],
    },
];
