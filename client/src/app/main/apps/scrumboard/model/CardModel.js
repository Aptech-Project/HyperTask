import { FuseUtils } from "@fuse";

class CardModel {
  constructor(data) {
    const card = data ? data : {};

    this.id = card.id || FuseUtils.generateGUID();
    this.name = card.name || "";
    this.content = card.content || "";
    this.idAttachmentCover = card.idAttachmentCover || "";
    this.members = card.members || [];
    this.labels = card.labels || [];
    this.checklist = card.checklist || [];
    this.comment = card.comment || [];
    this.attachments = card.attachments || [];
    this.subscribed = card.subscribed || true;
    this.checkItems = card.checkItems || 0;
    this.checkItemsChecked = card.checkItemsChecked || 0;
    this.activities = card.activities || [];
    this.due = card.due || "";
    this.createAt = card.createAt || new Date();
    this.isDone = false;
    this.doneAt = "";
    this.author = card.author;
  }
}

export default CardModel;
