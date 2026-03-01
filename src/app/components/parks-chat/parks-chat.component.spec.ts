import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksChatComponent } from './parks-chat.component';

describe('ParksChatComponent', () => {
  let component: ParksChatComponent;
  let fixture: ComponentFixture<ParksChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParksChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParksChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
