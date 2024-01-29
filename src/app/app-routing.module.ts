import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
