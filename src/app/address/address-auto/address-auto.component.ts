import { 
  AfterViewInit,
  Component, 
  // ElementRef,
  EventEmitter,
  Input,
  NgZone,
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
// 3rd Party
import { 
  AgmCoreModule, 
  MapsAPILoader 
}                         from 'angular2-google-maps/core';
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
  address: string;
  myform: FormGroup;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private fb:FormBuilder,
    private addressService: AddressService,
    private ngZone: NgZone,
  ) {}
  
  ngOnInit() {
    this.buildForm(); 
    this.addressService.address.subscribe( data => {
      this.myform.patchValue({
        address: data
      });
      this.address = data;
    });
    this.addressService.publishData(this.address);

    this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(
            <HTMLInputElement>document.getElementById("address"), {
            types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.address = autocomplete.getPlace().formatted_address;
          this.addressService.publishData(this.address);
        });
      });
    })
  } 

  buildForm(address?) {
    this.myform = this.fb.group ({
      address: ''
    }) 
  }

  onSubmit(): void {
    let address = this.myform.get('address').value;
    this.addressService.publishData(address);
  }
}

// http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/
