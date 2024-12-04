package de.fgenz.tictactoebackend.controller;

import de.fgenz.tictactoebackend.model.Room;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/backend/room/")
@CrossOrigin(origins = {"https://tictactoe.floriangenz.de"})
public class RoomController {
    private final List<Room> roomList;
    private final List<String> loggedInIps;

    public RoomController(List<Room> roomList, List<String> loggedInIps) {
        this.roomList = roomList;
        this.loggedInIps = loggedInIps;
    }

    @GetMapping("/rooms")
    public List<Room> getAllRooms(HttpServletRequest request) {
        System.out.println("all rooms were requested");
        if (roomList.size() == 0) {
            roomList.add(new Room(1));
        }
        if (loggedInIps.contains(request.getRemoteAddr())){
            return roomList;
        }
        return null;
    }

    @GetMapping("/{roomId}/getRoom")
    public Room getRoom(@PathVariable long roomId) {
        return getRoomById(roomId);
    }

    @PutMapping("/newRoom")
    public ResponseEntity<Long> newRoom() {
        Room room = new Room();
        roomList.add(room);
        System.out.println("created new Room: " + room.getRoomId());
        return new ResponseEntity<>(room.getRoomId(), HttpStatus.OK);
    }

    @PostMapping("/{roomId}/joinRoom")
    public ResponseEntity<Integer> joinRoom(@PathVariable long roomId) {
        Room room = getRoomById(roomId);
        if (room != null) {
            if (room.getPlayerJoined()[0]) {
                room.setPlayerJoined(2);
                return new ResponseEntity<>(2, HttpStatus.OK);
            } else {
                room.setPlayerJoined(1);
                return new ResponseEntity<>(1, HttpStatus.OK);
            }

        }
        return new ResponseEntity<>(0, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{roomId}/leaveRoom")
    public ResponseEntity<Boolean> leaveRoom(@PathVariable long roomId, @RequestBody int player) {
        Room room = getRoomById(roomId);
        if (room != null) {
            if (player == 1) {
                room.removePlayer(1);
            } else {
                room.removePlayer(2);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{roomId}/changeGameBoard/{playerNr}")
    public ResponseEntity<String[][]> changeGameBoard(@PathVariable long roomId, @PathVariable int playerNr, @RequestBody int[] coords) {
        Room room = getRoomById(roomId);
        if (room != null && room.getGameResult().equals("still running") && (playerNr == 1 && room.getPlayer1Turn() || playerNr == 2 && !room.getPlayer1Turn())) {
            room.changeGameBoard(coords[0], coords[1]);
            room.evaluateGameResult();
            room.changePlayer1Turn();
            return new ResponseEntity<>(room.getGameBoard(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new String[3][3], HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{roomId}/resetGameBoard")
    public ResponseEntity<String[][]> resetGameBoard(@PathVariable long roomId) {
        Room room = getRoomById(roomId);
        if (room != null) {
            room.resetGameBoard();
            return new ResponseEntity<>(room.getGameBoard(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new String[3][3], HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{roomId}/{player}/changeName")
    public ResponseEntity<String> changePlayerName(@PathVariable long roomId, @PathVariable String player, @RequestBody String name) {
        Room room = getRoomById(roomId);
        if (room != null) {
            if (player.equals("player1")) {
                room.setPlayer1Name(name);
            } else {
                room.setPlayer2Name(name);
            }
            return new ResponseEntity<>(name, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/adminPanel/login")
    public ResponseEntity<Boolean> adminPanelLogIn(@RequestBody String[] usernamePassword, HttpServletRequest request){
        int usernameHash = usernamePassword[0].hashCode();
        int passwordHash = usernamePassword[1].hashCode();
        if(usernameHash == 92668751 && passwordHash == -737121861){
            System.out.println(request.getRemoteAddr() + " logged in");
            loggedInIps.add(request.getRemoteAddr());
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        System.out.println(request.getRemoteAddr() + " tried to log in");
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    public Room getRoomById(long id) {
        for (Room room : roomList) {
            if (room.getRoomId() == id) {
                return room;
            }
        }
        return null;
    }

}
