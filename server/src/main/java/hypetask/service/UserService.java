package hypetask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hypetask.model.User;
import hypetask.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	public void createUser(User User) {
		userRepository.save(User);
	}

	public User getUserById(int id) {
		return userRepository.findById(id).get();
	}
	public User login(String username, String password){
		return userRepository.getLogin(username,password);
	}
	public List<User> getUsernameEmail(){
		return userRepository.getUserNameEmail();
	}
}
