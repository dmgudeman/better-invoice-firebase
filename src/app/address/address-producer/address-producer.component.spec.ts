import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressProducerComponent } from './address-producer.component';

describe('AddressProducerComponent', () => {
  let component: AddressProducerComponent;
  let fixture: ComponentFixture<AddressProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
