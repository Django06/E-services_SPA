import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { SearchModule } from 'app/layout/common/search/search.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { FuturisticLayoutComponent } from 'app/layout/layouts/futuristic.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
    declarations: [FuturisticLayoutComponent],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        MatBadgeModule,
        SearchModule,

        UserModule,
        SharedModule,
    ],
    exports: [FuturisticLayoutComponent],
})
export class FuturisticLayoutModule {}
