import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }
  ngOnInit() { }
  onLoginSubmit = () => {
    if (!this.validateService.validateLogin(this.username, this.password)) {
      this.flashMessage.show('Invalid User', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/login']);
    } else {
      let user = {
        username: this.username,
        password: this.password
      }
      this.authService.loginUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show('Login Success', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
