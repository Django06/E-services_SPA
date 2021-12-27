import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupAdminComponent } from './sup-admin.component';
import { Route, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow/workflow.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

export const supAdminRoutes: Route[] = [
    {
        path: '',
        component: SupAdminComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'demandes' },
            {
                path: 'demandes',
                loadChildren: () =>
                    import('./demandes/demandes.module').then(
                        (m) => m.DemandesModule
                    ),
            },
            {
                path: 'workflow',
                component: WorkflowComponent,
            },
        ],
    },
];
@NgModule({
    declarations: [SupAdminComponent, WorkflowComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(supAdminRoutes),
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatPaginatorModule,
        MatCardModule,
        MatDividerModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatSelectModule,
        MatSidenavModule,
    ],
    exports: [RouterModule],
})
export class SupAdminModule {}
