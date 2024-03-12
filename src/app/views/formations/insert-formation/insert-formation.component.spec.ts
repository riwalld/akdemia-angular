import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFormationComponent } from './insert-formation.component';

describe('InsertFormationComponent', () => {
  let component: InsertFormationComponent;
  let fixture: ComponentFixture<InsertFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertFormationComponent]
    });
    fixture = TestBed.createComponent(InsertFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
