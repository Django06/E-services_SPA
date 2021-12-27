import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandesComponent } from './demandes.component';
import { DemandesDetailsComponent } from './demandes-details/demandes-details.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export const demandesRoutes: Route[] = [
    {
        path: 'list',
        component: DemandesComponent,
    },
    {
        path: 'details/:id',
        component: DemandesDetailsComponent,
    },
];

@NgModule({
    declarations: [DemandesComponent, DemandesDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(demandesRoutes),
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
    ],
})
export class DemandesModule {}
