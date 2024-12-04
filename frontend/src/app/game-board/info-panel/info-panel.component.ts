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

  copyLink(): void {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
    }).catch(err => {
      console.error('Fehler beim Kopieren der URL: ', err);
    });
  }
}
