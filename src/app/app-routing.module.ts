import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/core/core.module').then((m) => m.CoreModule),
    canActivate: [],
    canActivateChild: [],
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
