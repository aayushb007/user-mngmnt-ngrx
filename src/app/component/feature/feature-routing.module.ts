import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureCreateEditComponent } from '../feature/feature-create-edit/feature-create-edit.component';
import { FeatureDetailComponent } from '../feature/feature-detail/feature-detail.component';
import { FeatureComponent } from '../feature/feature.component';



const routes: Routes = [
      {
      path: 'add',
      component: FeatureCreateEditComponent,
      },
      {
        path: 'edit/:id',
        component: FeatureCreateEditComponent,
      },
      {
        path: 'details/:id',
        component: FeatureDetailComponent,
      },
      {
        path: '',
        component: FeatureComponent,
      },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}