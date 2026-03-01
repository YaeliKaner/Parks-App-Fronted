import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import User from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
//import User, { PersonalStatus } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import Cities from '../../models/cities.model';
//import Users from '../../models/user.model';
import Users, { PersonalStatus } from '../../models/user.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public selectedFile: File | null = null;

  public citiesList!: Cities[];

  public p = PersonalStatus;

  public errorMsg: string = '';

  public successMsg: string = '';

  public newUser: Users = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: new Date(),
    id: 0,
    picturePath: '',
    city: { id: 0, name: '' },
    personalStatus: this.p.single,
  };

  public newCity: Cities = {
    id: 0,
    name: '',
  };

  constructor(
    private _citiesService: CitiesService,
    private _authService: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit(): void {
    this._citiesService.getCities().subscribe({
      next: (res) => {
        this.citiesList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const userToSend = {
      name: this.newUser.name,
      email: this.newUser.email,
      password: this.newUser.password,
      confirmPassword: this.newUser.confirmPassword,
      phone: this.newUser.phone,
        birthDate: this.newUser.birthDate,
      // birthDate: this.newUser.birthDate.toISOString().split('T')[0],
           city: {
        id: this.newUser.city.id
      },
      personalStatus: this.newUser.personalStatus
    };

    // בדיקה בסיסית – סיסמאות זהות
    if (userToSend.password !== userToSend.confirmPassword) {
      this.errorMsg = 'הסיסמאות אינן זהות';
      return;
    }

     const fd = new FormData();

    if (this.selectedFile) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
      const userJson = JSON.stringify(userToSend);
      const userBlob = new Blob([userJson], { type: 'application/json' });

      fd.append('User', userBlob);

      this._authService.signUp(fd).subscribe({
        // next: (res) => {

        
        //   console.log(res);

        //   this.router.navigate(['/parks-list']);
        // },

       next: () => {
          // רושמים בהצלחה → מנסים להתחבר מיד כדי לקבל סשן/עוגייה
         this._authService.signIn({
           email: this.newUser.email,
           password: this.newUser.password
          }).subscribe({
           next: () => this.router.navigate(['/parks-list']),
           error: (err) => {
             console.error('Sign-in after sign-up failed', err);
             // נשלח ל-sign-in כדי שהמשתמש יתחבר ידנית
             this.router.navigate(['/sign-in']);
           }
          });
       },


        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  // onSubmit() {
  //   this.errorMsg = '';
  //   this.successMsg = '';

  //   // בדיקה בסיסית – סיסמאות זהות
  //   if (this.password !== this.confirmPassword) {
  //     this.errorMsg = 'הסיסמאות אינן זהות';
  //     return;
  //   }

  //   const user: Partial<User> = {
  //     name: this.name,
  //     email: this.email,
  //     password: this.password,
  //     picturePath: ''
  //   };

  //   this.authService.signUp(user).subscribe({
  //     next: () => {
  //       this.successMsg = 'נרשמת בהצלחה! ניתן להתחבר עכשיו';
  //       // אם את רוצה להעביר ישר ל־sign-in:
  //       this.router.navigate(['/sign-in']);
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       if (err.status === 409) {
  //         this.errorMsg = 'האימייל הזה כבר קיים במערכת';
  //       } else {
  //         this.errorMsg = 'שגיאה בהרשמה, נסי שוב מאוחר יותר';
  //       }
  //     }
  //   });
  // }
}
