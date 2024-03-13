import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSessionsComponent } from './insert-sessions.component';

describe('InsertSessionsComponent', () => {
  let component: InsertSessionsComponent;
  let fixture: ComponentFixture<InsertSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertSessionsComponent]
    });
    fixture = TestBed.createComponent(InsertSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
