import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsUserComponent } from './accounts-user.component';

describe('AccountsUserComponent', () => {
  let component: AccountsUserComponent;
  let fixture: ComponentFixture<AccountsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
