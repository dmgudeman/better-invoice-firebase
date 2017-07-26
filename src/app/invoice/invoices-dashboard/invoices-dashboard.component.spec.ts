import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesDashboardComponent } from './invoices-dashboard.component';

describe('InvoicesDashboardComponent', () => {
  let component: InvoicesDashboardComponent;
  let fixture: ComponentFixture<InvoicesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
