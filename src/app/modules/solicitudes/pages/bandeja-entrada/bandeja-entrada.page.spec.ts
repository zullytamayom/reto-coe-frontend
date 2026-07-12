import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaEntradaPage } from './bandeja-entrada.page';

describe('BandejaEntradaPage', () => {
  let component: BandejaEntradaPage;
  let fixture: ComponentFixture<BandejaEntradaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejaEntradaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaEntradaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
