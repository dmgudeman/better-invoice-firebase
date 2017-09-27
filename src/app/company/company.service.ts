import {
  Injectable,
  OnInit,
} from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable,
} from 'angularfire2/database';
// 3rd party
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase       from 'firebase/app';
import { Observable }      from 'rxjs/Observable';
import { Subject }         from 'rxjs/Subject';
// Custom
import { Company }         from './company';

@Injectable()
export class CompanyService implements OnInit {
  company: Company;
  companies: FirebaseListObservable<any[]>;
  companiesArray: Company[];
  companyObs: FirebaseObjectObservable<any>;

  user: Observable<firebase.User>
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
    if (!this.user) {
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.db.list('/companies-by-user/' + this.userId, {
          query: {
            orderByChild: 'name'
          }
        }).subscribe(x => {
          this.companiesArray = x;
        })
      }
    });
  }

  getCompaniesByUserId() {
    if (!this.user) {
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log('this.userId', this.userId)
        this.db.list('/companies-by-user/' + this.userId, {
          query: {
            orderByChild: 'name'
          }
        }).subscribe(x => {

          this.companiesArray = x;
          return this.companies;
        })
      }
    });
  
  }
  getCompanyByCoId(coId):FirebaseObjectObservable<any>{
    // this.db.object('/companies-by-user/' + this.userId +'/' + coId);

    if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe ( user => {
      if (user) {
      this.userId = user.uid;
      console.log('this.userId', this.userId)
      this.companyObs = this.db.object('/companies-by-user/' + this.userId + '/' + coId);
      console.log('this.companyObs', this.companyObs);
      return this.companyObs;
      }
    });
  }

  addCompany(payload) {
    const addCompanyObservable = this.db.object('/company');
    addCompanyObservable.set({
      payload
    })
    return payload;
  }

}
