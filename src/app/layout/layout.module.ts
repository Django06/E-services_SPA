import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { FuturisticLayoutModule } from 'app/layout/layouts/futuristic.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [LayoutComponent],
    imports: [SharedModule, RouterModule, FuturisticLayoutModule],
    exports: [LayoutComponent, FuturisticLayoutModule],
})
export class LayoutModule {}
