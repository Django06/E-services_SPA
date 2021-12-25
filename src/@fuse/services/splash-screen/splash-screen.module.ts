import { NgModule } from '@angular/core';
import { SplashScreenService } from '@fuse/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [SplashScreenService],
})
export class SplashScreenModule {
    constructor(private _SplashScreenService: SplashScreenService) {}
}
