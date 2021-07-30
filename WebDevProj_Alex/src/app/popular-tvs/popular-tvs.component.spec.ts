import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTvsComponent } from './popular-tvs.component';

describe('PopularTvsComponent', () => {
  let component: PopularTvsComponent;
  let fixture: ComponentFixture<PopularTvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularTvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
