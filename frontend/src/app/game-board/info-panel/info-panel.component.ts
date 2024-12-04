import { Component } from '@angular/core';
import {GameBoardComponent} from "../game-board.component";

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent {

  constructor(public room: GameBoardComponent) {
  }
}
