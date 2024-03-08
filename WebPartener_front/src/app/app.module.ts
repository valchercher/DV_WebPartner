import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicateurModule } from './indicateur/indicateur.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    IndicateurModule,
    HttpClientModule,

  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
