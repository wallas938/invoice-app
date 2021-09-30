import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingStripeComponent } from './loading-stripe.component';

describe('LoadingStripeComponent', () => {
  let component: LoadingStripeComponent;
  let fixture: ComponentFixture<LoadingStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingStripeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
