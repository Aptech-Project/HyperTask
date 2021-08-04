package hypetask.service;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.*;
import hypetask.model.Friend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hypetask.model.User;
import hypetask.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	Gson gson= new Gson();
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	public void createUser(User User) {
		userRepository.save(User);
	}
	public void updateUser(User User) {
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
	public void sendFriendInvitation(int idSend,int idReceive){
		User userSend=userRepository.findById(idSend).get();
		User userReceive=userRepository.findById(idReceive).get();
		List<Friend> listSend= new ArrayList<>();
		JsonArray jsonArraySend = new JsonParser().parse(userSend.getContact()).getAsJsonArray();
		for (JsonElement ls : jsonArraySend) {
			JsonObject jsonObjectSend = ls.getAsJsonObject();
			int id = Integer.parseInt(jsonObjectSend.get("id").getAsString());
			String status = jsonObjectSend.get("status").getAsString();
			Friend f= new Friend(id,status);
			listSend.add(f);
		}
		List<Friend> listRecieve= new ArrayList<>();
		JsonArray jsonArrayRecieve = new JsonParser().parse(userReceive.getContact()).getAsJsonArray();
		for (JsonElement lr : jsonArrayRecieve) {
			JsonObject jsonObjectSend = lr.getAsJsonObject();
			int id = Integer.parseInt(jsonObjectSend.get("id").getAsString());
			String status = jsonObjectSend.get("status").getAsString();
			Friend f= new Friend(id,status);
			listRecieve.add(f);
		}
		listSend.add(new Friend(idReceive,"send"));
		listRecieve.add(new Friend(idSend,"receive"));
		String contactSend = gson.toJson(listSend);
		String contactReceive = gson.toJson(listRecieve);
		userSend.setContact(contactSend);
		userReceive.setContact(contactReceive);
		userRepository.save(userSend);
		userRepository.save(userReceive);
	}
	public void acceptFriend(int idSend,int idReceive){
		User userSend=userRepository.findById(idSend).get();
		User userReceive=userRepository.findById(idReceive).get();
		List<Friend> listSend= new ArrayList<>();
		JsonArray jsonArraySend = new JsonParser().parse(userSend.getContact()).getAsJsonArray();
		for (JsonElement ls : jsonArraySend) {
			JsonObject jsonObjectSend = ls.getAsJsonObject();
			int id = Integer.parseInt(jsonObjectSend.get("id").getAsString());
			String status = jsonObjectSend.get("status").getAsString();
			Friend f= new Friend(id,status);
			listSend.add(f);
		}
		List<Friend> listRecieve= new ArrayList<>();
		JsonArray jsonArrayRecieve = new JsonParser().parse(userReceive.getContact()).getAsJsonArray();
		for (JsonElement lr : jsonArrayRecieve) {
			JsonObject jsonObjectSend = lr.getAsJsonObject();
			int id = Integer.parseInt(jsonObjectSend.get("id").getAsString());
			String status = jsonObjectSend.get("status").getAsString();
			Friend f= new Friend(id,status);
			listRecieve.add(f);
		}
		for (int i=0;i<listSend.size();i++){
			if(listSend.get(i).getId()==idReceive){
				listSend.get(i).setStatus("friend");
			}
		}
		for (int i=0;i<listRecieve.size();i++){
			if(listRecieve.get(i).getId()==idSend){
				listRecieve.get(i).setStatus("friend");
			}
		}
		String contactSend = gson.toJson(listSend);
		String contactReceive = gson.toJson(listRecieve);
		userSend.setContact(contactSend);
		userReceive.setContact(contactReceive);
		userRepository.save(userSend);
		userRepository.save(userReceive);
	}
	public List<User> listFriend(int idUser){
		User userSend=userRepository.findById(idUser).get();
		List<Friend> list= new ArrayList<>();
		JsonArray jsonObject = new JsonParser().parse(userSend.getContact()).getAsJsonArray();
		for (JsonElement pa : jsonObject) {
			JsonObject paymentObj = pa.getAsJsonObject();
			int id = Integer.parseInt(paymentObj.get("id").getAsString());
			String status = paymentObj.get("status").getAsString();
			Friend f= new Friend(id,status);
			list.add(f);
		}
		List<User> listAcp= new ArrayList<>();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getStatus().equalsIgnoreCase("friend")){
				User user=userRepository.findById(list.get(i).getId()).get();
				listAcp.add(user);
			}
		}
		return listAcp;
	}
	public List<User> listSend(int idUser){
		User userSend=userRepository.findById(idUser).get();
		List<Friend> list= new ArrayList<>();
		JsonArray jsonObject = new JsonParser().parse(userSend.getContact()).getAsJsonArray();
		for (JsonElement pa : jsonObject) {
			JsonObject paymentObj = pa.getAsJsonObject();
			int id = Integer.parseInt(paymentObj.get("id").getAsString());
			String status = paymentObj.get("status").getAsString();
			Friend f= new Friend(id,status);
			list.add(f);
		}
		List<User> listAcp= new ArrayList<>();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getStatus().equalsIgnoreCase("send")){
				User user=userRepository.findById(list.get(i).getId()).get();
				listAcp.add(user);
			}
		}
		return listAcp;
	}
	public List<User> listRecieve(int idUser){
		User userSend=userRepository.findById(idUser).get();
		List<Friend> list= new ArrayList<>();
		JsonArray jsonObject = new JsonParser().parse(userSend.getContact()).getAsJsonArray();
		for (JsonElement pa : jsonObject) {
			JsonObject paymentObj = pa.getAsJsonObject();
			int id = Integer.parseInt(paymentObj.get("id").getAsString());
			String status = paymentObj.get("status").getAsString();
			Friend f= new Friend(id,status);
			list.add(f);
		}
		List<User> listAcp= new ArrayList<>();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getStatus().equalsIgnoreCase("receive")){
				User user=userRepository.findById(list.get(i).getId()).get();
				listAcp.add(user);
			}
		}
		return listAcp;
	}
	public  List<User> searchFriend(String textSeach){
		return userRepository.searchNewFriend(textSeach);
	}
}
