import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import User from '../models/user.model';
import { Router } from '@angular/router';
import UsersDTO from '../models/dto/usersDTO.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/Users';
  private currentUserKey = 'currentUser';
  private isLogged = false;

  constructor(private http: HttpClient, private router: Router) {}

  // SIGN UP
  // signUp(user: Partial<User>): Observable<User> {
  //   return this.http
  //     .post<User>(`${this.baseUrl}/signUp`, user, { withCredentials: true })
  //     .pipe(
  //       tap((u) => {
  //         if (u) {
  //           localStorage.setItem(this.currentUserKey, JSON.stringify(u));
  //         }
  //       })
  //     );
  // }


// זה עובד טוב אבל בלי תמונה
//   signUp(user: Partial<User>): Observable<void> {
//   return this.http.post(`${this.baseUrl}/signUp`, user, {
//     withCredentials: true,
//     responseType: 'text' as 'json'   // הטריק שמונע את "Unknown Error" על תגובה ריקה
//   }).pipe(
//     map(() => void 0),               // הופך את ההצלחה ל-void
//     tap(() => {
//       console.log('נרשמת והתחברת בהצלחה!');
//       // כאן אפשר לעדכן משתנה כללי אם רוצים, אבל לא חובה
//     }),
//     catchError(err => {
//       console.error('הרשמה נכשלה', err);
//       return throwError(() => err);
//     })
//   );
// }



// ****************************


// signUp(formData: FormData): Observable<void> {
//   return this.http.post(`${this.baseUrl}/signUp`, formData, {
//     withCredentials: true,
//     responseType: 'text' as 'json'   // הטריק שמונע את "Unknown Error" על תגובה ריקה
//   }).pipe(
//     map(() => void 0),               // הופך את ההצלחה ל-void
//     tap(() => {
//       console.log('נרשמת והתחברת בהצלחה!');
//       // כאן אפשר לעדכן משתנה כללי אם רוצים, אבל לא חובה
//     }),
//     catchError(err => {
//       console.error('הרשמה נכשלה', err);
//       return throwError(() => err);
//     })
//   );
// }

signUp(formData: FormData): Observable<void> {
  return this.http.post(`${this.baseUrl}/signUp`, formData, {
    withCredentials: true,
            responseType: 'text', 
        observe: 'response', 
    // responseType: 'text' as 'json'
  }).pipe(
    map(() => void 0),
    tap(() => {
      console.log('נרשמת והתחברת בהצלחה!');
      this.isLogged = true; // ← הוסף את זה!
    }),
    catchError(err => {
      console.error('הרשמה נכשלה', err);
      return throwError(() => err);
    })
  );
}




// *****************************

  // SIGN IN
  // signIn(user: Partial<User>): Observable<User> {
  //   return this.http.post<User>(
  //     `${this.baseUrl}/signIn`,
  //     user,
  //     { withCredentials: true }
  //   )
  //   .pipe(
  //     tap(u => {
  //       if (u) {
  //         localStorage.setItem(this.currentUserKey, JSON.stringify(u));
  //       }
  //     })
  //   );
  // }

  // SIGN IN
  // signIn(user: Partial<User>): Observable<User> {
  //   return (this.http.post(
  //     `${this.baseUrl}/signIn`,
  //     user,
  //     {
  //         withCredentials: true,
  //         responseType: 'text'
  //     }
  //   ) as any)
  //   .pipe(
  //     tap((u: string) => {
  //       if (u) {
  //         localStorage.setItem(this.currentUserKey, u);
  //       }
  //     })
  //   ) as Observable<User>;
  // }

  signIn(credentials: Partial<User>): Observable<void> {
    return this.http
      .post(`${this.baseUrl}/signIn`, credentials, {
        withCredentials: true,
        responseType: 'text', 
        observe: 'response', 
      })
      .pipe(
        map(() => void 0),
        catchError((err) => {
          console.error('Sign in failed', err);
          return throwError(() => err);
        })
      );
  }

  // SIGN OUT – גם לשרת וגם לנקות לוקאל־סטורג'
  // signOut(): Observable<any> {
  //   return this.http
  //     .post(
  //       `${this.baseUrl}/signOut`,
  //       {},
  //       { withCredentials: true, responseType: 'text' }
  //     )
  //     .pipe(
  //       tap(() => {
  //         localStorage.removeItem(this.currentUserKey);
  //       })
  //     );
  // }

signOut(): Observable<any> {
  return this.http.post(`${this.baseUrl}/signOut`, {}, {
    withCredentials: true,
    responseType: 'text'
  });
}

  getCurrentUser(): User | null {
    const json = localStorage.getItem(this.currentUserKey);
    return json ? (JSON.parse(json) as User) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  //   isAuthenticated(): Observable<boolean> {
  //   return this.http.get('http://localhost:8080/api/Users/isLoggedIn', {
  //     withCredentials: true,
  //     observe: 'response'
  //   }).pipe(
  //     map(() => true),
  //     catchError((err) => {
  //       // טיפול שקט - זה לא באג, זה flow רגיל
  //       if (err.status === 401 || err.status === 403) {
  //         this.router.navigate(['/sign-in']);
  //       }
  //       return of(false);  // תמיד החזר false בשקט
  //     })
  //   );
  // }

  // isAuthenticated(): Observable<boolean> {
  //   return this.http.get(`${this.baseUrl}/isLoggedIn`, {
  //     withCredentials: true,
  //     observe: 'response'
  //   }).pipe(
  //     // בדיקה על סטטוס 2xx — רק אז נחשב כמחובר
  //     map(res => res.status >= 200 && res.status < 300),
  //     // בכל שגיאה נחזיר false במקום לזרוק כדי שלא יופיע error לא מטופל
  //     catchError((err) => {
  //       console.warn('isAuthenticated error', err);
  //       return of(false);
  //     })
  //   );
  // }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get('http://localhost:8080/api/Users/isLoggedIn', {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map(() => true),
        catchError((err) => {
          if (err.status === 401 || err.status === 403) {
            return of(false); // רק מחזירים false
          }
          return throwError(() => err);
        })
      );
  }

  // checkLoginStatus() {
  //   // הוספת withCredentials — אחרת השרת יחזיר 401 כי אין cookie
  //   return this.http.get(`${this.baseUrl}/isLoggedIn`, { withCredentials: true, observe: 'response' }).pipe(
  //     tap(res => {
  //       this.isLogged = res.status >= 200 && res.status < 300;
  //     }),
  //     catchError((err) => {
  //       this.isLogged = false;
  //       return of(null);
  //     })
  //   );
  // }

  checkLoginStatus() {
    return this.http.get('http://localhost:8080/api/Users/isLoggedIn').pipe(
      tap(() => (this.isLogged = true)),
      catchError(() => {
        this.isLogged = false;
        return of(null);
      })
    );
  }

  getLoginState(): boolean {
    return this.isLogged;
  }

  // getLoggedUser(): Observable<UsersDTO> {
  //   return this.http.get<UsersDTO>(`http://localhost:8080/api/Users/me`, {
  //     withCredentials: true
  //   });
  // }

  getLoggedUser(): Observable<UsersDTO> {
  return this.http.get<UsersDTO>(
    'http://localhost:8080/api/Users/me',
    { withCredentials: true }
  );
}

}

// isAuthenticated(): Observable<boolean> {
//   return this.http.get('http://localhost:8080/api/Users/isLoggedIn', {
//     withCredentials: true,
//     observe: 'response'
//   }).pipe(
//     map(() => true),
//     catchError((err) => {
//       // כל שגיאה - פשוט החזר false בלי לזרוק
//       console.log('Authentication check failed silently');
//       return of(false);
//     })
//   );
// }

// isAuthenticated(): Observable<boolean> {
//   return this.http.get('http://localhost:8080/api/Users/isLoggedIn', {
//     withCredentials: true,
//     observe: 'response'   // חשוב!
//   }).pipe(
//    map(() => true),
//   catchError((err) => {
//     if (err.status === 401 || err.status === 403) {
//       return of(false);
//     }
//     return throwError(() => err);
//   })
// );
// }
