import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCreateEditComponent } from './feature-create-edit.component';

describe('FeatureCreateEditComponent', () => {
  let component: FeatureCreateEditComponent;
  let fixture: ComponentFixture<FeatureCreateEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureCreateEditComponent]
    });
    fixture = TestBed.createComponent(FeatureCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
