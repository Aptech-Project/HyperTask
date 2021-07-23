package hypetask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hypetask.model.Board;
import hypetask.service.BoardService;

@CrossOrigin
@RestController
@RequestMapping("/api/")
public class BoardController {

	@Autowired
	private BoardService boardService;

	// Get all Boards
	@GetMapping("/get-all-Boards")
	public List<Board> getAllBoard() {
		return boardService.getAllBoard();
	}

	@PostMapping("/create-Board")
	public Board saveBoard(@RequestBody Board Board) {
		boardService.createBoard(Board);
		return Board;
	}

	@GetMapping("/get-Board/{id}")
	public Board getBoard(@PathVariable("id") int id) {
		return boardService.getBoardById(id);
	}
}
