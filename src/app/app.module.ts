import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureComponent } from './component/feature/feature.component';
import { TaskComponent } from './component/task/task.component';
import { UserComponent } from './component/user/user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effcts';
import { userReducer } from './state/user.reducer';
import { taskReducer } from './state/task.reducer';
import { TaskEffects } from './state/task.effect';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
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
 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    StoreModule.forRoot({user:userReducer,task:taskReducer}),
    StoreModule.forFeature('users', userReducer),
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forRoot([UserEffects,TaskEffects]),
    EffectsModule.forFeature([UserEffects]),
    EffectsModule.forFeature([TaskEffects]),
    
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
