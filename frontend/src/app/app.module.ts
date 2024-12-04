import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoPanelComponent } from './game-board/info-panel/info-panel.component';
import { GameResultWindowComponent } from './game-board/game-result-window/game-result-window.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "../services/backend.service";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { LogInWindowComponent } from './admin-panel/log-in-window/log-in-window.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    GameResultWindowComponent,
    AdminPanelComponent,
    GameBoardComponent,
    LogInWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
