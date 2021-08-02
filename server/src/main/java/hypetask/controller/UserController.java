package hypetask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
	@PostMapping("/update-user")
	public User updateUser(@RequestBody User user) {
		User user1;
		user1 = userService.getUserById(user.getId());
//		if (user1){
//			if (user1.getEmail()==user.getEmail() | )
//		}
		userService.updateUser(user);
		return user;
	}
	@PostMapping("/update-pass")
	public ResponseEntity<Object> updatePass(@RequestParam("id") Integer  id,
											 @RequestParam("oldpass") String oldpass,
											 @RequestParam("newpass") String newpass
	) {
		User user1;
		user1 = userService.getUserById(id);
		if (user1.getPassword().equals(oldpass)){
			user1.setPassword(newpass);
			userService.updateUser(user1);
		}
		else{
			return new ResponseEntity<Object>("failed", HttpStatus.OK);
		}
		return new ResponseEntity<Object>("successful", HttpStatus.OK);
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
