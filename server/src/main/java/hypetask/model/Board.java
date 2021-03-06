package hypetask.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "board")
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private int id;
	@Column(name = "name")
	private String name;
	@Column(name = "members")
	private String members;
	@Column(name = "lists")
	private String lists;
	@Column(name = "activities")
	private String activities;
	@Column(name = "labels")
	private String labels;
	@Column(name = "info")
	private String info;
	@Column(name = "created_at")
	@CreationTimestamp
	private Date createdAt;
	@Column(name = "updated_at")
	@UpdateTimestamp
	private Date updatedAt;

	public Board() {
	}

	public Board(String name, String members, String lists, String activities, String labels, String info) {
		super();
		this.name = name;
		this.members = members;
		this.lists = lists;
		this.activities = activities;
		this.labels = labels;
		this.info = info;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMembers() {
		return members;
	}

	public void setMembers(String members) {
		this.members = members;
	}

	public String getLists() {
		return lists;
	}

	public void setLists(String lists) {
		this.lists = lists;
	}

	public String getActivities() {
		return activities;
	}

	public void setActivities(String activities) {
		this.activities = activities;
	}

	public String getLabels() {
		return labels;
	}

	public void setLabels(String labels) {
		this.labels = labels;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public int getId() {
		return id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

}
