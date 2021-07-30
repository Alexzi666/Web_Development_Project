import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarTvsComponent } from './similar-tvs.component';

describe('SimilarTvsComponent', () => {
  let component: SimilarTvsComponent;
  let fixture: ComponentFixture<SimilarTvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarTvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarTvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
