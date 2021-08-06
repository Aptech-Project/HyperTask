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
	@PostMapping(value = {"/send-friend-invitation/{id1}&{id2}","/send-friend-invitation/{id1}&{id2}/{textsearch}"})
	public List<User>  sendFriendInvitation(@PathVariable("id1") int id1, @PathVariable("id2") int id2,@PathVariable(value = "textsearch",required = false) String textSearch){
		userService.sendFriendInvitation(id1,id2);
		if(textSearch==null){
			return null;
		}else
			return userService.searchFriend(textSearch,id1);
	}
	@PostMapping("/accept-friend/{id1}&{id2}")
	public  List<User> acceptFriend(@PathVariable("id1") int id1, @PathVariable("id2") int id2){
		userService.acceptFriend(id1,id2);
		return userService.listRecieve(id2);
	}
	@PostMapping("/remove-friend-send/{id1}&{id2}")
	public List<User> removeFriendSend(@PathVariable("id1") int id1, @PathVariable("id2") int id2){
		userService.removeFriend(id1,id2);
		return userService.listSend(id2);
	}
	@PostMapping("/remove-friend-receive/{id1}&{id2}")
	public List<User> removeFriendRequest(@PathVariable("id1") int id1, @PathVariable("id2") int id2){
		userService.removeFriend(id1,id2);
		return userService.listRecieve(id2);
	}
	@PostMapping("/remove-friend/{id1}&{id2}")
	public List<User> removeFriend(@PathVariable("id1") int id1, @PathVariable("id2") int id2){
		userService.removeFriend(id1,id2);
		return userService.listFriend(id2);
	}
	@GetMapping("/get-all-friend/{id}")
	public List<User> allFriend(@PathVariable("id") int id1){
		return userService.listFriend(id1);
	}
	@GetMapping("/get-send-friend/{id}")
	public List<User> sendFriend(@PathVariable("id") int id1){
		return userService.listSend(id1);
	}
	@GetMapping("/get-receive-friend/{id}")
	public List<User> recieveFriend(@PathVariable("id") int id1){
		return userService.listRecieve(id1);
	}
	@GetMapping(value = {"/search-friend/{id}","/search-friend/", "/search-friend/{textsearch}/{id}"})
	public List<User> searchFriend(@PathVariable(value = "textsearch",required = false) String textSearch,
		@PathVariable(value = "id",required = false) int id
	){
		if(textSearch==null){
			return null;
		}else
			return userService.searchFriend(textSearch,id);
	}

}
