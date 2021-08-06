import { FuseUtils } from "@fuse";
// "id": "67027cahbe3b52ecf2dc631c",
// "name": "mail.jpg",
// "src": "assets/images/scrumboard/mail.jpg",
// "time": "Added Nov 3 at 15:22AM",
// "type": "image"

class AttachmentModel {
  constructor(data) {
    const item = data ? data : {};

    this.id = item.id || FuseUtils.generateGUID();
    this.name = item.name || "";
    this.src = item.src || "";
    this.time = item.time || "";
    this.type = item.type || "";
    this.extension = item.extension || "";
  }
}

export default AttachmentModel;
