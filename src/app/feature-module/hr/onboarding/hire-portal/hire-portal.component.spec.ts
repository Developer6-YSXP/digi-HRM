import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirePortalComponent } from './hire-portal.component';

describe('HirePortalComponent', () => {
  let component: HirePortalComponent;
  let fixture: ComponentFixture<HirePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HirePortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HirePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
