import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionToastComponent } from './notificacion-toast.component';

describe('NotificacionToastComponent', () => {
  let component: NotificacionToastComponent;
  let fixture: ComponentFixture<NotificacionToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionToastComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
