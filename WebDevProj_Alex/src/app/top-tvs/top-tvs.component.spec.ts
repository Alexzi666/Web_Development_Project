import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTvsComponent } from './top-tvs.component';

describe('TopTvsComponent', () => {
  let component: TopTvsComponent;
  let fixture: ComponentFixture<TopTvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
