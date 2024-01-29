import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCreateEditComponent } from './feature-create-edit/feature-create-edit.component';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureRoutingModule } from './feature-routing.module';



@NgModule({
  declarations: [
    FeatureCreateEditComponent,
    FeatureDetailComponent
  ],
  imports: [
    FeatureRoutingModule,
    CommonModule
  ]
})
export class FeatureModule { }
