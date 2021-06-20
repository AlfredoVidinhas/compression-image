import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeFotoComponent } from './take-foto.component';

describe('TakeFotoComponent', () => {
  let component: TakeFotoComponent;
  let fixture: ComponentFixture<TakeFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
