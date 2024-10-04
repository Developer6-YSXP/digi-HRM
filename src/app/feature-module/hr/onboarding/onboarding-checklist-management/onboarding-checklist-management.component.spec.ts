import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingChecklistManagementComponent } from './onboarding-checklist-management.component';

describe('OnboardingChecklistManagementComponent', () => {
  let component: OnboardingChecklistManagementComponent;
  let fixture: ComponentFixture<OnboardingChecklistManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingChecklistManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingChecklistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
