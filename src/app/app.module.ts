import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureComponent } from './component/feature/feature.component';
import { TaskComponent } from './component/task/task.component';
import { UserComponent } from './component/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effcts';
import { userReducer } from './state/user.reducer';
import { taskReducer } from './state/task.reducer';
import { TaskEffects } from './state/task.effect';

@NgModule({
  declarations: [
    AppComponent,
    FeatureComponent,
    TaskComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule,
    StoreModule.forRoot({user:userReducer,task:taskReducer}),
    StoreModule.forFeature('users', userReducer),
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forRoot([UserEffects,TaskEffects]),
    EffectsModule.forFeature([UserEffects]),
    EffectsModule.forFeature([TaskEffects]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
