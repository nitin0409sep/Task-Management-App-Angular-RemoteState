import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateCore, canActivateCoreChild } from './gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/core/core.module').then((m) => m.CoreModule),
    canActivate: [canActivateCore],
    canActivateChild: [canActivateCoreChild],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
