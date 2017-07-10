import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class CompanyService {

  companies: FirebaseListObservable<any[]>; i
  
  constructor(private db: AngularFireDatabase) {
  }


  addCompany(payload) {
    const addCompanyObservable = this.db.object('/company');  
    addCompanyObservable.set({
      payload
    } )
    return payload;

  }

}
