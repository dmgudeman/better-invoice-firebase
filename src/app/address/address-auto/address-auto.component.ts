import { 
  Component, 
  Input,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
 }                        from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule }          from '@angular/forms';
import { MaterialModule } from '@angular/material';
// 3rd Party
import { 
  AgmCoreModule, 
  MapsAPILoader 
}                         from 'angular2-google-maps/core';
import { }                from '@types/googlemaps';

// Custom
import { Company }        from '../../company/company';
import { Address }        from '../address';


@Component({
  selector: 'app-address-auto',
  // templateUrl: './address-auto.component.html',
  template: 
  `

  <form class="example-form">
  <md-input-container class="example-full-width">
    <input mdInput id="address" placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control">
  </md-input-container>
  </form>
   
  `
  ,
  styleUrls: ['./address-auto.component.scss']
})
export class AddressAutoComponent implements OnInit {
  @Input() company: Company;
  @Input() address:Address;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  
  

  ngOnInit() {
 //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
    // this.setCurrentPosition();
    
    //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(
            <HTMLInputElement>document.getElementById("address"), {
            types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                // get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                // add map calls here
            });
        });
    });
  }
  
  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

}
