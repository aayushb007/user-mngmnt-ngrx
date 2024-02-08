import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/user/login/login.component';
import { AuthGuard } from './component/user/login/auth.guard';

const routes: Routes = [
  { path:'login', component: LoginComponent},
  {path: '',   redirectTo: '/user', pathMatch: 'full'},
  { path: 'feature', canActivate: [AuthGuard], loadChildren: () =>
  import('./component/feature/feature.module').then(
  (m) => m.FeatureModule
  ),
  },
  { path: 'task',  canActivate: [AuthGuard],
  loadChildren: () =>
  import('./component/task/task.module').then(
  (m) => m.TaskModule
  ),
  },
  { path: 'user',  canActivate: [AuthGuard],
    loadChildren: () =>
    import('./component/user/user.module').then(
    (m) => m.UserModule
  ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
