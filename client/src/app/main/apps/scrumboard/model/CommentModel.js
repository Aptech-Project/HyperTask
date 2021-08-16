import { FuseUtils } from "@fuse";
import moment from "moment";

class CommentModel {
  constructor(data) {
    const item = data ? data : {};

    this.id = item.id || FuseUtils.generateGUID();
    this.type = item.type || "comment";
    this.idMember = item.idMember || null;
    this.message = item.message || "";
    // this.time = item.time || moment().format(moment.HTML5_FMT.DATE);
    this.time = item.time || moment().format("hh:mm:ss A MMM-DD-YY");
  }
}

export default CommentModel;
