import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCreateEditComponent } from './feature-create-edit/feature-create-edit.component';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FeatureCreateEditComponent,
    FeatureDetailComponent
  ],
  imports: [
    FeatureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class FeatureModule { }
