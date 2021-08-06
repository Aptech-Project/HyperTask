package hypetask.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "common")
public class Common {
	@Id
	@Column(name = "id", unique = true, nullable = false)
	private String id;
	@Column(name = "content")
	private String content;

	public Common() {
	}

	public Common(String content) {
		super();
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
