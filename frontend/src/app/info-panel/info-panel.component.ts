import { Component } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent {

  constructor(public room: AppComponent) {
  }
}
