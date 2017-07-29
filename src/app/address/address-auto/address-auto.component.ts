import { 
  AfterViewInit,
  Component, 
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
 }                        from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule }          from '@angular/forms';
import { MaterialModule } from '@angular/material';
// // 3rd Party
// import { 
//   AgmCoreModule, 
//   MapsAPILoader 
// }                         from 'angular2-google-maps/core';
// import { }                from '@types/googlemaps';

// Custom
import { Company }        from '../../company/company';
import { Address }        from '../address';
import { AddressService } from '../address.service';


@Component({
  selector: 'app-address-auto',
  templateUrl: './address-auto.component.html',
  styleUrls: ['./address-auto.component.scss']
})
export class AddressAutoComponent {
  // @Input() company: Company;
  // @Input() address;
  // @Output() onAddress = new EventEmitter<any>();

  
  searchAddress: any = '';;

  // public latitude: number;
  // public longitude: number;
  // public searchControl: FormControl;
  // public zoom: number;
  myform: FormGroup;
  
  public searchElementRef: ElementRef;
  
  constructor(
    private fb:FormBuilder,
    private addressService: AddressService,
  ) {}
  
  ngOnInit() {

    this.buildForm(); 
    this.addressService.address.subscribe( data => {
      console.log('address-auto received from company-edit', data);
      this.searchAddress = data;
      this.myform.patchValue({
        address: data
      });
    });
  } 

  buildForm(address?) {
    this.myform = this.fb.group ({
      address: ''
    }) 
  }

  onSubmit(): void {
        // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
        console.log('Form submitted-sibling1Form');
        let address = this.myform.get('address').value;
        this.searchAddress = address;
        this.addressService.publishData(address);
    }
}
  // ngAfterViewInit() {
 //set google maps defaults
    // this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    
    //create search FormControl
    // console.log('TTHHHHHUSSSSSSSS ADDRESSSSSSSSSSS', this.address);
    //set current position
    // this.setCurrentPosition();
    
    //load Places Autocomplete
    //  this.mapsAPILoader.load().then(() => {
    //     let autocomplete = new google.maps.places.Autocomplete(
    //         <HTMLInputElement>document.getElementById("address"), {
    //         types: ['address']
    //     });
    //     autocomplete.addListener('place_changed', () => {
    //         this.ngZone.run(() => {
    //             // get the place result
    //             let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //             this.onAddress.emit(place);
    //             // add map calls here
    //         });
    //     });
    // });
  // }
  
  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }



// http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/
