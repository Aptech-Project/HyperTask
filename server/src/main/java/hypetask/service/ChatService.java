package hypetask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import hypetask.model.Chat;
import hypetask.repository.ChatRepository;

@Service
public class ChatService {

	Gson json = new Gson();

	@Autowired
	private ChatRepository chatRepository;

	public List<Chat> getAllChat() {
		return chatRepository.findAll();
	}

	public void createChat(Chat chat) {
		chatRepository.save(chat);
	}

	public Chat getChatById(String id) {
		return chatRepository.findById(id).get();
	}
}
