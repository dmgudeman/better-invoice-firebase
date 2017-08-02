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
      // Step 3.
      // If the user has several providers,
      // the first provider in the list will be the "recommended" provider to use.
      // if (providers[0] === 'password') {
      //   // Asks the user his password.
      //   // In real scenario, you should handle this asynchronously.
      //   // var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
      //   auth.signInWithEmailAndPassword(email, password).then(function(user) {
      //     // Step 4a.
      //     return user.link(pendingCred);
      //   }).then(function() {
      //     // Google account successfully linked to the existing Firebase user.
      //     goToApp();
      //   });
      //   return;
      // }
      // All the other cases are external providers.
      // Construct provider object for that provider.
      // TODO: implement getProviderForProviderId.
      // var provider = getProviderForProviderId(providers[0]);
      var provider = new firebase.auth.FacebookAuthProvider();
      // At this point, you should let the user know that he already has an account
      // but with a different provider, and let him validate the fact he wants to
      // sign in with this provider.
      // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      // so in real scenario you should ask the user to click on a "continue" button
      // that will trigger the signInWithPopup.
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // Remember that the user may have signed in with an account that has a different email
        // address than the first one. This can happen as Firebase doesn't control the provider's
        // sign in flow and the user is free to login using whichever account he owns.
        // Step 4b.
        // Link to Google credential.
        // As we have access to the pending credential, we can directly call the link method.
        result.user.link(pendingCred).then(function() {
          // Google account successfully linked to the existing Firebase user.
          // goToApp();
        });
      });
    });
  }
});

    // })
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
        })

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

