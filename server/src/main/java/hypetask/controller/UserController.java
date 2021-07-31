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

import hypetask.model.User;
import hypetask.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	// Get all users
	@GetMapping("/get-all-users")
	public List<User> getAllUser() {
		return userService.getAllUser();
	}

	@PostMapping("/create-user")
	public User createUser(@RequestBody User user) {
		userService.createUser(user);
		return user;
	}

	@GetMapping("/get-user/{id}")
	public User getUser(@PathVariable("id") int id) {
		return userService.getUserById(id);
	}
    @GetMapping("/check")
    public List<User> getUsernameEmail() {
        return userService.getUsernameEmail();
    }
	@PostMapping("login/{username}&{password}")
	public User getLogin(@PathVariable("username") String username,@PathVariable("password") String password){
		return  userService.login(username,password);
	}
}
