import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';

import { UserEditDialogComponent } from './user-edit-dialog.component';


describe('UserEditDialogComponent', () => {
  let component: UserEditDialogComponent;
  let fixture: ComponentFixture<UserEditDialogComponent>;
  const spyMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const user = new User('user 1');


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserEditDialogComponent,
        { provide: MatDialogRef, useValue: spyMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: user },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyMatDialogRef.close.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not edit with empty name', () => {
    component.nameFormControl.setValue('');
    fixture.detectChanges();
    component.validate();
    expect(spyMatDialogRef.close).not.toHaveBeenCalled();
  });

  it('should not edit with a name with only spaces', () => {
    component.nameFormControl.setValue('  ');
    fixture.detectChanges();
    component.validate();
    expect(spyMatDialogRef.close).not.toHaveBeenCalled();
  });

  it('should edit with a right name', () => {
    component.nameFormControl.setValue('my name');
    fixture.detectChanges();
    component.validate();
    expect(spyMatDialogRef.close).toHaveBeenCalledWith('my name');
  });
});
