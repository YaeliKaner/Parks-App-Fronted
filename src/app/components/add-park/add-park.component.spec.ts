import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkComponent } from './add-park.component';

describe('AddParkComponent', () => {
  let component: AddParkComponent;
  let fixture: ComponentFixture<AddParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
