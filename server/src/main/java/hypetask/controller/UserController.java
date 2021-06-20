package hypetask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hypetask.model.User;
import hypetask.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	// Get all users
	@GetMapping("/get-all-users")
	public List<User> getAllUser() {
		return userRepository.findAll();
	}
}
