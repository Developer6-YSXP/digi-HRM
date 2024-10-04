import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationInterfaceComponent } from './payroll-configuration-interface.component';

describe('PayrollConfigurationInterfaceComponent', () => {
  let component: PayrollConfigurationInterfaceComponent;
  let fixture: ComponentFixture<PayrollConfigurationInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollConfigurationInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayrollConfigurationInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
