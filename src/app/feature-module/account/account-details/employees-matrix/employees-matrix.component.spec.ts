import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesMatrixComponent } from './employees-matrix.component';

describe('EmployeesMatrixComponent', () => {
  let component: EmployeesMatrixComponent;
  let fixture: ComponentFixture<EmployeesMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
