package hypetask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
	@PostMapping("/create-user")
	public User saveUser(@RequestBody User user) {
		userRepository.save(user);
		return user;
	}
	@GetMapping("/get-user/{id}")
	public User getUser(@PathVariable("id") Long id) {
		return userRepository.findById(id).get();
	}
}
