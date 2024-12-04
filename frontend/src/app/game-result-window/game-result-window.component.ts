import { Component } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-game-result-window',
  templateUrl: './game-result-window.component.html',
  styleUrls: ['./game-result-window.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-150%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-150%)'}))
      ])
    ])
  ]
})
export class GameResultWindowComponent {

  constructor(public room: AppComponent) {}

}
