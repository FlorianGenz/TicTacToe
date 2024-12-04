package de.fgenz.tictactoebackend.model;

import java.util.Random;

public class Room {

    private final long roomId;
    private String player1Name;
    private String player2Name;
    private boolean player1Turn = true;
    private final boolean[] playerJoined = {false, false};
    private final int[] playerWins = {0,0};
    private String gameResult = "still running";
    private int turn = 0;
    private String[][] gameBoard = {
            {" ", " ", " "},
            {" ", " ", " "},
            {" ", " ", " "}
    };

    public Room() {
        this.roomId = generateId();
    }

    public Room(int roomId) {
        this.roomId = roomId;
    }

    private long generateId() {
        Random random = new Random();
        long id = random.nextLong((long) Math.pow(10, 12));
        if (id == 0) {
            generateId();
        }
        return id;
    }

    public void changeGameBoard(int x, int y) {
        if (gameBoard[x][y].equals(" ")) {
            if (player1Turn) {
                gameBoard[x][y] = "X";
            } else {
                gameBoard[x][y] = "O";
            }
            turn++;
        }
    }

    public void resetGameBoard(){
        gameBoard = new String[][]{
                {" ", " ", " "},
                {" ", " ", " "},
                {" ", " ", " "}
        };
        turn = 0;
        gameResult = "still running";
    }

    public void evaluateGameResult(){
        for (int i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i][0].equals(gameBoard[i][1]) && gameBoard[i][1].equals(gameBoard[i][2]) && !gameBoard[i][0].equals(" ")) {
                if (gameBoard[i][0].equals("X")){
                    gameResult = "player1";
                    playerWins[0]++;
                }else{
                    gameResult = "player2";
                    playerWins[1]++;

                }
            }
            if (gameBoard[0][i].equals(gameBoard[1][i]) && gameBoard[1][i].equals(gameBoard[2][i]) && !gameBoard[0][i].equals(" ")) {
                if (gameBoard[0][i].equals("X")){
                    gameResult = "player1";
                    playerWins[0]++;
                }else{
                    gameResult = "player2";
                    playerWins[1]++;
                }
            }
        }
        if(gameBoard[0][0].equals(gameBoard[1][1]) && gameBoard[1][1].equals(gameBoard[2][2]) && !gameBoard[0][0].equals(" ")){
            if (gameBoard[0][0].equals("X")){
                gameResult = "player1";
                playerWins[0]++;
            }else{
                gameResult = "player2";
                playerWins[1]++;
            }
        }
        if(gameBoard[0][2].equals(gameBoard[1][1]) && gameBoard[1][1].equals(gameBoard[2][0]) && !gameBoard[0][2].equals(" ")){
            if (gameBoard[0][2].equals("X")){
                gameResult = "player1";
                playerWins[0]++;
            }else{
                gameResult = "player2";
                playerWins[1]++;
            }
        }
        if(gameResult.equals("still running") && turn == 9){
            gameResult = "draw";
        }

    }

    public void changePlayer1Turn() {
        player1Turn = !player1Turn;
    }

    public long getRoomId() {
        return roomId;
    }

    public String getGameResult(){
        return gameResult;
    }

    public String getPlayer1Name() {
        return player1Name;
    }

    public String getPlayer2Name() {
        return player2Name;
    }

    public String[][] getGameBoard() {
        return gameBoard;
    }

    public boolean getPlayer1Turn(){
        return player1Turn;
    }

    public boolean[] getPlayerJoined() {
        return playerJoined;
    }

    public int[] getPlayerWins(){
        return playerWins;
    }

    public void setPlayer1Name(String playerName) {
        this.player1Name = playerName;
    }

    public void setPlayer2Name(String playerName) {
        this.player2Name = playerName;
    }

    public void setPlayerJoined(int player){
        if(player == 1){
            playerJoined[0] = true;
        }else{
            playerJoined[1] = true;
        }
        System.out.println("player" + player + " joined the room (" + getRoomId() + ")");
    }

    public void removePlayer(int player){
        if (player == 1){
            playerJoined[0] = false;
        }else{
            playerJoined[1] = false;
        }
        System.out.println("player" + player + " left the room (" + getRoomId() + ")");
    }

}
