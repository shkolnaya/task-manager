import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit{

  initials: string = 'AA';  
  fullName: string | undefined

  constructor(private authService: AuthenticationService ){}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user != null) {
      this.fullName = user.fullName;
      this.initials = this.getInitials(user.fullName);
    }


  }

  logOut(){
    this.authService.logoutUser();
  }

  getInitials(name: string) {
    const firstLetters = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('');

    return firstLetters[0];
  }
}
