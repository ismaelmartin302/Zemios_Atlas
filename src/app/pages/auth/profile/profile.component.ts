import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../interfaces/user-interface';
import { UsersService } from '../../../services/users.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ProfileEditComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: UserInterface = new Object() as UserInterface;
  profileEditModal = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.authService.getActualUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  toggleProfileEditModal() {
    this.profileEditModal = !this.profileEditModal;
  }

  closeProfileEditModal() {
    this.profileEditModal = false;
  }

  openProfileEditModal() {
    if (this.user) {
      this.profileEditModal = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
