import { FuseUtils } from "@fuse";

const sampleLabels = [
  {
    id: "26022e4129ad3a5sc28b36cd",
    name: "High Priority",
    class: "bg-red text-white",
  },
  {
    id: "56027e4119ad3a5dc28b36cd",
    name: "Design",
    class: "bg-orange text-white",
  },
  {
    id: "5640635e19ad3a5dc21416b2",
    name: "App",
    class: "bg-blue text-white",
  },
  {
    id: "6540635g19ad3s5dc31412b2",
    name: "Feature",
    class: "bg-green text-white",
  },
];

// const sampleMembers = [
//   {
//     id: "56027c1930450d8bf7b10758",
//     name: "Alice Freeman",
//     avatar: "assets/images/avatars/alice.jpg",
//   },
//   {
//     id: "26027s1930450d8bf7b10828",
//     name: "Danielle Obrien",
//     avatar: "assets/images/avatars/danielle.jpg",
//   },
//   {
//     id: "76027g1930450d8bf7b10958",
//     name: "James Lewis",
//     avatar: "assets/images/avatars/james.jpg",
//   },
//   {
//     id: "36027j1930450d8bf7b10158",
//     name: "John Doe",
//     avatar: "assets/images/avatars/Velazquez.jpg",
//   },
// ];

class BoardModel {
  constructor(data) {
    const board = data ? data : {};
    //this.id = board.id || FuseUtils.generateGUID();
    this.name = board.name || "Untitled Board";
    this.members = board.members || [];
    this.lists = [];
    //this.uri = board.uri || "untitled-board";
    this.info = board.info || {
      backgroundImage: "",
      author: "1",
      type: "personalBoard",
    };
    this.activities = board.activities || [];
    this.labels = board.labels || sampleLabels;
    this.createdAt = "";
    this.updatedAt = "";
  }
}

export default BoardModel;
