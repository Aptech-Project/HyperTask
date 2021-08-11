package hypetask.service;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.*;
import hypetask.model.Friend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hypetask.model.User;
import hypetask.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	Gson gson= new Gson();
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	public void createUser(User user) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String pass=bCryptPasswordEncoder.encode(user.getPassword());
		user.setPassword(pass);
		userRepository.save(user);
	}
	public void updateUser(User User) {
		userRepository.save(User);
	}
	public User getUserById(int id) {
		return userRepository.findById(id).get();
	}
	public User login(String username, String password){
		if(userRepository.getLogin(username)==null){
			return null;
		}else{
			User u= userRepository.getLogin(username);
			BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
			if(bCryptPasswordEncoder.matches(password,u.getPassword())==true){
				return userRepository.getLogin(username);
			}
			else
				return null;
		}
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
		for(int i=0;i<listAcp.size();i++){
			JsonObject jsonObject1=new JsonParser().parse(listAcp.get(i).getInfo()).getAsJsonObject();
			String img=jsonObject1.get("avatar").getAsString();
			listAcp.get(i).setInfo(img);
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
		for(int i=0;i<listAcp.size();i++){
			JsonObject jsonObject1=new JsonParser().parse(listAcp.get(i).getInfo()).getAsJsonObject();
			String img=jsonObject1.get("avatar").getAsString();
			listAcp.get(i).setInfo(img);
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
		for(int i=0;i<listAcp.size();i++){
			JsonObject jsonObject1=new JsonParser().parse(listAcp.get(i).getInfo()).getAsJsonObject();
			String img=jsonObject1.get("avatar").getAsString();
			listAcp.get(i).setInfo(img);
		}
		return listAcp;
	}
	public  List<User> searchFriend(String textSeach,int id){
		List<User> list= userRepository.searchNewFriend(textSeach);
		for(int i=0;i<list.size();i++){
			if(list.get(i).getId()==id){
				list.remove(list.get(i));
			}
		}
		User user=userRepository.findById(id).get();
		JsonArray jsonArraySend = new JsonParser().parse(user.getContact()).getAsJsonArray();
		for (JsonElement ls : jsonArraySend) {
			JsonObject jsonObjectSend = ls.getAsJsonObject();
			int id1 = Integer.parseInt(jsonObjectSend.get("id").getAsString());
			for(int i=0;i<list.size();i++){
				if(list.get(i).getId()==id1){
					list.remove(list.get(i));
				}
			}
		}
		for(int i=0;i<list.size();i++){
			JsonObject jsonObject=new JsonParser().parse(list.get(i).getInfo()).getAsJsonObject();
			String img=jsonObject.get("avatar").getAsString();
			list.get(i).setInfo(img);
		}
		return list;
	}
    public void removeFriend(int idSend,int idReceive){
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
                listSend.remove(listSend.get(i));
            }
        }
        for (int i=0;i<listRecieve.size();i++){
            if(listRecieve.get(i).getId()==idSend){
                listRecieve.remove(listRecieve.get(i));
            }
        }
        String contactSend = gson.toJson(listSend);
        String contactReceive = gson.toJson(listRecieve);
        userSend.setContact(contactSend);
        userReceive.setContact(contactReceive);
        userRepository.save(userSend);
        userRepository.save(userReceive);
    }
    public User searchQRUser(int idSearch,int idUser){
		User u= userRepository.findById(idSearch).get();
		JsonArray jsonArraySend = new JsonParser().parse(u.getContact()).getAsJsonArray();
		for (JsonElement ls : jsonArraySend) {
			JsonObject jsonObjectSend = ls.getAsJsonObject();
			int id1 = Integer.parseInt(jsonObjectSend.get("id").getAsString());
			String status=jsonObjectSend.get("status").getAsString();
			if(id1==idUser&&status.equalsIgnoreCase("send")){
				u.setLabels("send");
			}
			else if(id1==idUser&&status.equalsIgnoreCase("receive")){
				u.setLabels("receive");
			}
			else if(id1==idUser&&status.equalsIgnoreCase("friend")){
				u.setLabels("friend");
			}else{
				u.setLabels("none");
			}
		}
		JsonObject jsonObject=new JsonParser().parse(u.getInfo()).getAsJsonObject();
		String img=jsonObject.get("avatar").getAsString();
		u.setInfo(img);
		return u;
	}
}
