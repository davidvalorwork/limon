import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendarComponent } from './arrendar.component';

describe('ArrendarComponent', () => {
  let component: ArrendarComponent;
  let fixture: ComponentFixture<ArrendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
