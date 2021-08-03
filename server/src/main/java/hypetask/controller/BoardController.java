package hypetask.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hypetask.model.Board;
import hypetask.service.BoardService;

@CrossOrigin
@RestController
@RequestMapping("/api/board/")
public class BoardController {

	Gson json = new Gson();

	@Autowired
	private BoardService boardService;

	// Get all Boards
	@GetMapping("/get-all-boards")
	public List<Board> getAllBoards() {
		return boardService.getAllBoard();
	}

	@GetMapping("/get-user-boards/{id}")
	public List<Board> getUserBoards(@PathVariable("id") int userId) {
		return boardService.getUserBoards(userId);
	}

	@PostMapping("/create-board")
	public Board saveBoard(@RequestBody Board Board) {
		boardService.createBoard(Board);
		return Board;
	}

	@GetMapping("/get-board/{id}")
	public Board getBoard(@PathVariable("id") int id) {
		return boardService.getBoardById(id);
	}

	@PutMapping("/update-board")
	public Board updateBoard(@RequestBody Board Board) {
		boardService.createBoard(Board);
		return Board;
	}

	@PutMapping("/delete-board/{userId}&{boardId}")
	public List<Board> deleteBoard(@PathVariable("userId") int userId, @PathVariable("boardId") int boardId) {
		return boardService.deleteBoard(userId, boardId);
	}

}
