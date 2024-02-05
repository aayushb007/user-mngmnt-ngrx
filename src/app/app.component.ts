import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public translate: TranslateService,public authService: UserService) {
		translate.setDefaultLang('en');
	}
  logout():void {
    this.authService.logout()
  }
  title = 'Feature Management System';
}
