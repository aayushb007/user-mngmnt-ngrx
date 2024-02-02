import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './component/user/login/login.component';

const routes: Routes = [
  // { path:'login', component: LoginComponent},
  { path: 'feature', loadChildren: () =>
  import('./component/feature/feature.module').then(
  (m) => m.FeatureModule
  ),
  },
  { path: 'task',
  loadChildren: () =>
  import('./component/task/task.module').then(
  (m) => m.TaskModule
  ),
  },
  { path: 'user',
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
