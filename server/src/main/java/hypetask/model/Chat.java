package hypetask.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class Chat {
	@Id
	@Column(name = "id", unique = true, nullable = false)
	private String id;
	@Column(name = "dialog")
	private String dialog;

	public Chat() {
	}

	public Chat(String dialog) {
		super();
		this.dialog = dialog;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDialog() {
		return dialog;
	}

	public void setDialog(String dialog) {
		this.dialog = dialog;
	}
}
