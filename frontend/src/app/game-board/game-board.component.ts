import {Component, HostListener, OnInit} from '@angular/core';
import {Room} from "../../model/room";
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit{
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event){
    this.leaveRoom();
  }
  @HostListener('window:hashchange', ['$event'])
  reloadHandler(event: Event){
    window.location.reload();
  }

  room: Room = new Room();
  playerNr: number = 0;

  constructor(private backendService: BackendService, private router_: Router) {
  }

  ngOnInit(): void {
    let roomId: string | undefined = window.location.href.split(window.location.href.charAt(window.location.href.lastIndexOf("/"))).pop();
    if (roomId == "" || roomId == null){
      this.generateRoom();
    }else {
      this.room.roomId = +roomId;
      this.wait(1000).then(() => this.joinRoom())
    }
    setInterval(() => {
      this.getRoomUpdates();
    }, 1000);

  }

  getRoomUpdates(){
    this.backendService.getUpdates(this.room.roomId).subscribe(room => {
      if (room == null){
        window.alert("Raum nicht gefunden. \nNeuer Raum wird erstellt.");
        this.router_.navigate(["/"]).then(() =>  window.location.reload());
      }
      this.room = room;
    })
  }

  generateRoom(){
    this.leaveRoom();
    this.backendService.newRoom().subscribe((id: number): void => {
      this.room.roomId = id;
      this.router_.navigate([id]).then(() => {});
      this.joinRoom();
    });
  }

  changeGameBoard(coords: number[]){
    this.backendService.changeGameBoard(this.room.roomId, this.playerNr, coords).subscribe(gameBoard => {
      this.room.gameBoard = gameBoard;
    })
  }

  resetGameBoard(){
    this.backendService.resetGameBoard(this.room.roomId).subscribe( gameBoard => {
      this.room.gameBoard = gameBoard;
    })
  }

  changePlayerName(player: string, name: string){
    if (name == ""){
      if (player == "player1"){
        name = "Player1"
      }else{
        name = "Player2"
      }
    }
    this.backendService.changePlayerName(this.room.roomId, player, name).subscribe();
  }

  joinRoom(){
    this.backendService.joinRoom(this.room.roomId).subscribe(number => {
      this.playerNr = number;
    });
  }

  leaveRoom(){
    this.backendService.leaveRoom(this.room.roomId, this.playerNr).subscribe();
  }

  wait(timeout: number) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

}
