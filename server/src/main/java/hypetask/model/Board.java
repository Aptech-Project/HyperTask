package hypetask.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "board")
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private int id;
	@Column(name = "name")
	private int name;
	@Column(name = "members")
	private String members;
	@Column(name = "lists")
	private String lists;
	@Column(name = "labels")
	private String labels;
	@Column(name = "info")
	private String info;

	public Board() {
	}

	public Board(int name, String members, String lists, String labels, String info) {
		super();
		this.name = name;
		this.members = members;
		this.lists = lists;
		this.labels = labels;
		this.info = info;
	}
}
