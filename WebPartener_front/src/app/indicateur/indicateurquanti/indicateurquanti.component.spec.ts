import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurquantiComponent } from './indicateurquanti.component';

describe('IndicateurquantiComponent', () => {
  let component: IndicateurquantiComponent;
  let fixture: ComponentFixture<IndicateurquantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicateurquantiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicateurquantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
