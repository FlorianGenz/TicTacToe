export class Room {

  roomId: number = 0;
  player1Name: string = "";
  player2Name: string = "";
  gameResult: string = "still running";
  player1Turn: boolean = true;
  playerJoined: boolean[] = [false, false];
  playerWins: number[] = [0,0];
  gameBoard: string[][] = [
    [" "], [" "], [" "],
    [" "], [" "], [" "],
    [" "], [" "], [" "]
  ]

}
