import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFormateurComponent } from './insert-formateur.component';

describe('InsertFormateurComponent', () => {
  let component: InsertFormateurComponent;
  let fixture: ComponentFixture<InsertFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertFormateurComponent]
    });
    fixture = TestBed.createComponent(InsertFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
