import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationProcessComponent } from './confirmation-process.component';

describe('ConfirmationProcessComponent', () => {
  let component: ConfirmationProcessComponent;
  let fixture: ComponentFixture<ConfirmationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
