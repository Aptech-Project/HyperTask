package hypetask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import hypetask.model.Chat;
import hypetask.service.ChatService;

@CrossOrigin
@RestController
@RequestMapping("/api/chat/")
public class ChatController {

	Gson json = new Gson();

	@Autowired
	private ChatService chatService;

	// Get all Boards
	@GetMapping("/get-all-chats")
	public List<Chat> getAllBoards() {
		return chatService.getAllChat();
	}

	@PostMapping("/create-chat")
	public Chat saveChat(@RequestBody Chat chat) {
		chatService.createChat(chat);
		return chat;
	}

	@GetMapping("/get-chat/{id}")
	public Chat getChat(@PathVariable("id") String id) {
		return chatService.getChatById(id);
	}

	@PutMapping("/update-chat")
	public Chat updateChat(@RequestBody Chat chat) {
		chatService.createChat(chat);
		return chat;
	}

}
