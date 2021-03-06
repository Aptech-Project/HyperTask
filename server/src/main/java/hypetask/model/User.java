package hypetask.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private int id;
	@Column(name = "email", unique = true)
	private String email;
	@Column(name = "password")
	private String password;
	@Column(name = "username", unique = true)
	private String username;
	@Column(name = "fullname")
	private String fullname;
	@Column(name = "contact")
	private String contact;
	@Column(name = "conversations")
	private String conversations;
	@Column(name = "info")
	private String info;
	@Column(name = "notes")
	private String notes;
	@Column(name = "labels")
	private String labels;

	public User(String email, String password, String username, String fullname) {
		super();
		this.email = email;
		this.password = password;
		this.username = username;
		this.fullname = fullname;
	}

	public User(String username, String email) {
		super();
		this.username = username;
		this.email = email;

	}

	public User() {
	}

	public int getId() {
		return id;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getConversations() {
		return conversations;
	}

	public void setConversations(String conversations) {
		this.conversations = conversations;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getLabels() {
		return labels;
	}

	public void setLabels(String labels) {
		this.labels = labels;
	}
}
