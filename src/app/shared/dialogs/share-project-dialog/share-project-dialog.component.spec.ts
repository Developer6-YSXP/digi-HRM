import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareProjectDialogComponent } from './share-project-dialog.component';

describe('ShareProjectDialogComponent', () => {
  let component: ShareProjectDialogComponent;
  let fixture: ComponentFixture<ShareProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareProjectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
