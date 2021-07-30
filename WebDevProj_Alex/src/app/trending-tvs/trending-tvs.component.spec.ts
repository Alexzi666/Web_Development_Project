import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingTvsComponent } from './trending-tvs.component';

describe('TrendingTvsComponent', () => {
  let component: TrendingTvsComponent;
  let fixture: ComponentFixture<TrendingTvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingTvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingTvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
