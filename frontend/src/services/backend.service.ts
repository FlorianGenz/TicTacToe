import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../model/room";


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = "https://tictactoe-backend-4t3i.onrender.com/backend/room";
  //private baseUrl = "http://localhost:8080/backend/room";

  constructor(private httpClient: HttpClient) {
  }

  getRooms(): Observable<Room[]>{
    return this.httpClient.get<Room[]>(`${this.baseUrl}/rooms`);
  }

  getUpdates(roomId: number): Observable<Room>{
    return this.httpClient.get<Room>(`${this.baseUrl}/${roomId}/getRoom`)
  }

  newRoom(): Observable<number>{
    return this.httpClient.put<number>(`${this.baseUrl}/newRoom`, "");
  }

  changeGameBoard(roomId: number, playerNr: number, coords: number[]): Observable<string[][]>{
    return this.httpClient.post<string[][]>(`${this.baseUrl}/${roomId}/changeGameBoard/${playerNr}`, coords)
  }

  resetGameBoard(roomId: number): Observable<string[][]>{
    return this.httpClient.post<string[][]>(`${this.baseUrl}/${roomId}/resetGameBoard`, "");
  }

  changePlayerName(roomId: number, player: string, name: string): Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrl}/${roomId}/${player}/changeName`, name);
  }

  joinRoom(roomId: number): Observable<number>{
    return this.httpClient.post<number>(`${this.baseUrl}/${roomId}/joinRoom`, "");
  }

  leaveRoom(roomId: number, player: number): Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.baseUrl}/${roomId}/leaveRoom`, player);
  }

  logIn(usernamePassword: string[]): Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.baseUrl}/adminPanel/login`, usernamePassword)
  }
}
