import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  private _user: User;
  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService) { }
  ngOnInit() { }
  onRegisterSubmit() {
    this._user = {
      id: 0,
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateRegister(this._user)) {
      this.flashMessage.show('All fields are needed', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(this._user.email)) {
      this.flashMessage.show('email address is invalid', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // register user
    this.authService.registerUser(this._user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registred and can login now', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Some thing went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}
