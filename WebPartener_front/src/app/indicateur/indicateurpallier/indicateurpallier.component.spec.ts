import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurpallierComponent } from './indicateurpallier.component';

describe('IndicateurpallierComponent', () => {
  let component: IndicateurpallierComponent;
  let fixture: ComponentFixture<IndicateurpallierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicateurpallierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicateurpallierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
