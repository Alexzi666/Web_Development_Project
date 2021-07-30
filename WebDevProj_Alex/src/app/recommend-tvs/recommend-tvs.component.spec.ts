import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendTvsComponent } from './recommend-tvs.component';

describe('RecommendTvsComponent', () => {
  let component: RecommendTvsComponent;
  let fixture: ComponentFixture<RecommendTvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendTvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendTvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
