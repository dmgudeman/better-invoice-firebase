import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrePdfComponent } from './invoice-pre-pdf.component';

describe('InvoicePrePdfComponent', () => {
  let component: InvoicePrePdfComponent;
  let fixture: ComponentFixture<InvoicePrePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePrePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePrePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
