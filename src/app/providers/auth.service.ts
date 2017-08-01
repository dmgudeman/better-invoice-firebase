import { Injectable }        from '@angular/core';
import {
  AngularFireAuth,
  AngularFireAuthProvider
}                            from 'angularfire2/auth'
import * as firebase         from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

@Injectable()
export class AuthService {
  google = new firebase.auth.GoogleAuthProvider();
  facebook = new firebase.auth.FacebookAuthProvider();
  email;
  password;
  private provider;
  private user;
  private credential;
  private currentUser;
  private prevUser;

  constructor(
    public afAuth: AngularFireAuth,
  ) { 
    
  }

  register() {
    let email = this.email;
    let password = this.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error =>{
        console.log('register error', error);
        if(error.message === "auth/email-already-in-use"){
          let credential = firebase.auth.EmailAuthProvider.credential(email,password);
        // Using a popup.
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        });
    }});
  }

  signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
  }
  login(provider) {
    var auth = this.afAuth;
    if (provider === 'f') {
      this.provider = this.google;
      console.log('this.provider', this.provider);
      this.linker();
      // if (firebase.auth.FacebookAuthProvider){
      //   this.afAuth.auth.currentUser
      //     .linkAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(this.afAuth.auth.currentUser.email, 'password'))
      // }
    }
    if (provider === 'g') {
      this.provider = this.facebook;
      console.log('this.providerrrrrrrr', this.provider);
      this.linker();
    }
   
      //  this.afAuth.auth.currentUser.linkWithRedirect(this.provider);
    
  }
    linker(){
    this.afAuth.auth.currentUser.linkWithPopup(this.provider).then(function(result) {
      console.log('this.provider', this.provider);
    // Accounts successfully linked.
    this.credential = result.credential;
    this.user = result.user;
    console.log('this.credential', this.credential );
    console.log('this.user', this.user );
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    // ...
  });
    }

//     firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // Accounts successfully linked.
//     this.credential = result.credential;
//     this.user = result.user;
//     // ...
//   }
// }).catch(function(error) {
//   // Handle Errors here.
//   // ...
// });
//==========================================================
// // Get reference to the currently signed-in user
// this.prevUser = this.afAuth.auth.currentUser;
// // Sign in user with another account
// this.afAuth.auth.signInWithCredential(this.credential).then(function(user) {
//   console.log("Sign In Success", user);
//    this.currentUser = user;
//   // Merge prevUser and currentUser data stored in Firebase.
//   // Note: How you handle this is specific to your application

//   // After data is migrated delete the duplicate user
//   return user.delete().then(function() {
//     // Link the OAuth Credential to original account
//     return this.prevUser.linkWithCredential(this.credential);
//   }).then(function() {
//     // Sign in with the newly linked credential
//     return this.afAuth.auth.signInWithCredential(this.credential);
//   });
// }).catch(function(error) {
//   console.log("Sign In Error", error);
// });
//   }
//=======================================================
  //   this.afAuth.auth.signInWithPopup(this.facebook).then(authState=>{
  //     console.log('AFTER LOGIN', authState);
  //     return authState;    
  //   });
  //   this.afAuth.auth.currentUser.linkWithPopup(this.facebook).then(result=>{
  //     let credential = result.credential;
  //     let user = result.user;
  //   })
  // }

  // loginWithGoogle() {
  //   this.afAuth.auth.signInWithPopup(this.google).then(authState=>{
  //     console.log('AFTER LOGIN', authState);
  //     return authState
  //   })
  // }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
