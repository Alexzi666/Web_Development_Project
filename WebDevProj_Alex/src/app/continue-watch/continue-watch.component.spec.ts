import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueWatchComponent } from './continue-watch.component';

describe('ContinueWatchComponent', () => {
  let component: ContinueWatchComponent;
  let fixture: ComponentFixture<ContinueWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
