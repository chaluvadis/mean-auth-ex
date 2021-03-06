import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }
  ngOnInit() {
    this.authService.getUserProfile()
      .subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }
}
