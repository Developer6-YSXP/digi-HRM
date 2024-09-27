import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSettingsComponent } from './access-settings.component';

describe('AccessSettingsComponent', () => {
  let component: AccessSettingsComponent;
  let fixture: ComponentFixture<AccessSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
