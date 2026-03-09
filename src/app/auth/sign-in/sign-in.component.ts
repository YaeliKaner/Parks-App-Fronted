import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  // name: string = '';
  password: string = '';
  errorMsg: string = '';
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // onSubmit() {
  //   const user: User = {
  //     email: this.email,
  //     name: this.name,
  //     password: this.password
  //   };
//   const user: Partial<User> = {
//   email: this.email,
//   name: this.name,
//   password: this.password
// };


//     this.authService.signIn(user).subscribe({
//       next: () => {
//         // לאן את רוצה אחרי התחברות מוצלחת
//         this.router.navigate(['/parks-list']);
//       },
//       error: () => {
//         this.errorMsg = 'שם / אימייל / סיסמה לא נכונים';
//       }
//     });
  
// }
onSubmit() {
  const user: Partial<User> = {
    email: this.email,
    // name: this.name,
    password: this.password
  };

  this.authService.signIn(user).subscribe({
    next: () => {
      // 
      this.router.navigate(['/parks-list']);
       // רענון הדף כדי לעדכן את מצב ההתחברות
    },
    // error: () => {
    //   // this.errorMsg = 'שם / אימייל / סיסמה לא נכונים';
    //   console.error('Sign In Failed:', err);
    // }
    error: (err: HttpErrorResponse) =>  
       this.router.navigate(['/sign-up'])
      // console.error('Sign In Failed - Full Error Object:', err)
  });
}


 


  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }


  goToRecommended(): void {
    this.router.navigate(['/recommended']);
  }

  goToAllParks(): void {
    this.router.navigate(['/parks-list']);
  }



}
