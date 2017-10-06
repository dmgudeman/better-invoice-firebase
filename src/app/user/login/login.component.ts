import { 
  AfterViewInit,
  Component, 
  OnInit,
 }                            from '@angular/core';
import { Router, }            from '@angular/router';
// 3rd party
import { AngularFireAuth }    from 'angularfire2/auth';
import * as firebase          from 'firebase/app';
import { Observable }         from 'rxjs/Observable';
// Custom
import { AuthService }        from '../../providers/auth.service';
import { MyIcons }            from '../../shared/my-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  displayName: string;
  photoURL;
  user: Observable<firebase.User>
  userId: string;
  fUserId: string;
  icons = ['chevron-right', 'facebook', 'google', 'logoff'];
  loggedState: String

  constructor(
    public  afAuth: AngularFireAuth,
    public  authService: AuthService,
    private router:Router,
    private myIcons:MyIcons,
  ) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if(user) {
        console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLOGIN user', user);
        this.fUserId = user.providerData[0].uid
        console.log('this.fUserId', this.fUserId);
        this.goToCompanies();
      } else {
          this.loggedState = "Please Login"
        return;

      }
    });
   }

   ngOnInit() {
    this.myIcons.makeIcons(this.icons);
  }
  
  loginWithGoogle() {
    let auth = this.afAuth.auth;
    // Step 1.
    // User tries to sign in to Google.
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
      console.log('error.code', error['code']);
      // An error happened.
      if (error['code'] === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending Google credential.
        var pendingCred = error['credential'];
        // The provider account's email address.
        var email = error['email'];
        // Get registered providers for this email.
        firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
          console.log('providers', providers);
          if (providers[0] === 'facebook.com'){
            auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(error =>{
              console.log('Error in loginWithFacebook', error);
            });
          }
        })
      }
    })
  }
loginWithFacebook() {
  let auth = this.afAuth.auth;
  // Step 1.
// User tries to sign in to Facebook.
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function(error) {
   console.log('error.code', error['code']);
  // An error happened.
  if (error['code'] === 'auth/account-exists-with-different-credential') {
    // Step 2.
    // User's email already exists.
    // The pending Facebook credential.
    var pendingCred = error['credential'];
    // The provider account's email address.
    var email = error['email'];
    // Get registered providers for this email.
    firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
      console.log('providers', providers);
      if (providers[0] === 'google.com'){
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(error =>{
          console.log('Error in loginWithFacebook', error);
        });
      }
    })
    }
  })

  }
  logout() {
    this.afAuth.auth.signOut();
  }

  goToCompanies() {
    if(this.user)
    this.router.navigate(['/companies']);

  }
}

