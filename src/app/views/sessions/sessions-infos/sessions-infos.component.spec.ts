import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsInfosComponent } from './sessions-infos.component';

describe('SessionsInfosComponent', () => {
  let component: SessionsInfosComponent;
  let fixture: ComponentFixture<SessionsInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionsInfosComponent]
    });
    fixture = TestBed.createComponent(SessionsInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
