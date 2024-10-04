import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPayrollComplianceComponent } from './multi-payroll-compliance.component';

describe('MultiPayrollComplianceComponent', () => {
  let component: MultiPayrollComplianceComponent;
  let fixture: ComponentFixture<MultiPayrollComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiPayrollComplianceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiPayrollComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
