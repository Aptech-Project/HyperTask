import { FuseUtils } from "@fuse";

class ListModel {
  constructor(data) {
    const list = data ? data : {};

    this.id = list.id || FuseUtils.generateGUID();
    this.name = list.name || "";
    this.cards = [];
  }
}

export default ListModel;
