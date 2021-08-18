DROP DATABASE IF EXISTS `hypertask`;
CREATE SCHEMA `hypertask` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `hypertask`;
--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
CREATE TABLE `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `members` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lists` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `activities` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `labels` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `info` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `board`
--

INSERT INTO `board` VALUES (1,'Beyond Pixels','[{\"userId\":\"2\",\"name\":\"Ngoc Hai\",\"role\":\"admin\",\"avatar\":\"\",\"status\":\"Stay\"},{\"userId\":\"3\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"4\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"5\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"10\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"14\",\"role\":\"member\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"Design\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"New Login UI\",\"content\":\"Design new login Ui for our App\",\"idAttachmentCover\":\"89e6ccb4\",\"members\":[2,3,5],\"labels\":[\"56027e4119ad3a5dc28b36cd\",\"26022e4129ad3a5sc28b36cd\",\"6540635g19ad3s5dc31412b2\",\"5640635e19ad3a5dc21416b2\"],\"checklist\":[{\"id\":\"44804e55\",\"name\":\"todo\",\"checkItems\":[{\"id\":\"a64577fe\",\"name\":\"Select template\",\"checked\":true},{\"id\":\"70ba08a0\",\"name\":\"Convert code\",\"checked\":true}]}],\"comment\":[],\"attachments\":[{\"id\":\"89e6ccb4\",\"name\":\"bo-hinh-nen-chat-luong-cao-53.jpg\",\"src\":\"http://localhost:4000/storage/jpg/bo-hinh-nen-chat-luong-cao-53.jpg\",\"time\":\"\\\"2021-08-09T09:03:42.307Z\\\"\",\"type\":\"image\",\"extension\":\"jpg\"},{\"id\":\"e1fca353\",\"name\":\"CM extraction logic.docx\",\"src\":\"http://localhost:4000/storage/docx/CM_extraction_logic.docx\",\"time\":\"\\\"2021-08-09T09:05:25.832Z\\\"\",\"type\":\"doc\",\"extension\":\"docx\"},{\"id\":\"70036aa6\",\"name\":\"teamwork.png\",\"src\":\"http://localhost:4000/storage/png/teamwork.png\",\"time\":\"\\\"2021-08-16T17:56:47.880Z\\\"\",\"type\":\"image\",\"extension\":\"png\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"cc1b0d7c\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image teamwork.png\",\"time\":\"12:56:47 AM Aug-17-21\"},{\"id\":\"5be9aa62\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new File CM extraction logic.docx\",\"time\":\"2021-08-05\"},{\"id\":\"35e760de\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new File CM extraction logic.docx\",\"time\":\"2021-08-06\"},{\"id\":\"c521c5cb\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-53.jpg\",\"time\":\"2021-08-07\"},{\"id\":\"b722516d\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-53.jpg\",\"time\":\"2021-08-08\"},{\"id\":\"5f50f778\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-53.jpg\",\"time\":\"2021-08-08\"},{\"id\":\"965c199f\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-10.jpg\",\"time\":\"2021-08-09\"}],\"due\":\"2021-08-13T20:15\",\"createAt\":\"2021-08-06T11:25:58.250Z\",\"isDone\":true,\"doneAt\":\"2021-08-14T15:16:30.237Z\",\"author\":\"2\"},{\"id\":\"L1C2\",\"name\":\"New Chat Application\",\"content\":\"Design Chat UI\",\"idAttachmentCover\":\"0b917399\",\"members\":[5],\"labels\":[\"5640635e19ad3a5dc21416b2\"],\"checklist\":[],\"comment\":[],\"attachments\":[{\"id\":\"d60bbd90\",\"name\":\"CM extraction logic.docx\",\"src\":\"http://localhost:4000/storage/docx/CM_extraction_logic.docx\",\"time\":\"\\\"2021-08-09T11:52:35.850Z\\\"\",\"type\":\"doc\",\"extension\":\"docx\"},{\"id\":\"0b917399\",\"name\":\"bo-hinh-nen-chat-luong-cao-10.jpg\",\"src\":\"http://localhost:4000/storage/jpg/bo-hinh-nen-chat-luong-cao-10.jpg\",\"time\":\"\\\"2021-08-09T11:52:59.100Z\\\"\",\"type\":\"image\",\"extension\":\"jpg\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"d0aa0ae1\",\"type\":\"comment\",\"idMember\":5,\"message\":\"I have done this task!\",\"time\":\"2021-08-15\"},{\"id\":\"4f38d0b9\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-10.jpg\",\"time\":\"2021-08-09\"},{\"id\":\"a3e0917c\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new File CM extraction logic.docx\",\"time\":\"2021-08-09\"}],\"due\":\"2021-08-18T17:00\",\"createAt\":\"2021-08-09T11:51:44.846Z\",\"isDone\":true,\"doneAt\":\"2021-08-15T16:01:59.518Z\",\"author\":\"2\"},{\"id\":\"L1C3\",\"name\":\"Profile management UI\",\"content\":\"Create a group of user\'s pages, so that they can manage their information!\",\"idAttachmentCover\":\"\",\"members\":[5],\"labels\":[\"56027e4119ad3a5dc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"548ea27d\",\"type\":\"comment\",\"idMember\":2,\"message\":\"Mr. Long please help me take care of this task\",\"time\":\"2021-08-11\"}],\"due\":\"2021-08-17T21:26\",\"createAt\":\"2021-08-10T17:10:34.524Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"}]},{\"id\":\"L2\",\"name\":\"Development\",\"cards\":[{\"id\":\"L2C1\",\"name\":\"Backend of login\",\"content\":\"Create API for login UI\",\"idAttachmentCover\":\"\",\"members\":[3,2],\"labels\":[\"6540635g19ad3s5dc31412b2\"],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"2021-08-14T10:00\",\"createAt\":\"2021-08-09T09:56:57.919Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"},{\"id\":\"L2C2\",\"name\":\"Backend of register\",\"content\":\"Create API for Register UI\",\"idAttachmentCover\":\"0c7c23d4\",\"members\":[3],\"labels\":[\"6540635g19ad3s5dc31412b2\"],\"checklist\":[],\"comment\":[],\"attachments\":[{\"id\":\"0c7c23d4\",\"name\":\"bo-hinh-nen-chat-luong-cao-2.jpg\",\"src\":\"http://localhost:4000/storage/jpg/bo-hinh-nen-chat-luong-cao-2.jpg\",\"time\":\"\\\"2021-08-11T14:59:17.338Z\\\"\",\"type\":\"image\",\"extension\":\"jpg\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"29000873\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-2.jpg\",\"time\":\"2021-08-11\"},{\"id\":\"d041dc9b\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-98.jpg\",\"time\":\"2021-08-11\"},{\"id\":\"39505db0\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-63.jpg\",\"time\":\"2021-08-11\"}],\"due\":\"2021-08-24T22:30\",\"createAt\":\"2021-08-11T14:52:33.000Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"},{\"id\":\"L2C3\",\"name\":\"Backend of chat app\",\"content\":\"Create API for chat app\",\"idAttachmentCover\":\"\",\"members\":[10,2],\"labels\":[\"5640635e19ad3a5dc21416b2\",\"6540635g19ad3s5dc31412b2\"],\"checklist\":[{\"id\":\"194d021a\",\"name\":\"Things todo\",\"checkItems\":[{\"id\":\"b02cfa9c\",\"name\":\"Create new chat model\",\"checked\":true},{\"id\":\"7e31fc0f\",\"name\":\"Create new chat service class\",\"checked\":true},{\"id\":\"507b2a95\",\"name\":\"Create new controller\",\"checked\":true}]}],\"comment\":[],\"attachments\":[{\"id\":\"f11f02f7\",\"name\":\"playing_dolphin-wallpaper-1920x1080.jpg\",\"src\":\"http://localhost:4000/storage/jpg/playing_dolphin-wallpaper-1920x1080.jpg\",\"time\":\"\\\"2021-08-12T17:13:49.954Z\\\"\",\"type\":\"image\",\"extension\":\"jpg\"},{\"id\":\"eb1a7f2a\",\"name\":\"New Modules Specs.docx\",\"src\":\"http://localhost:4000/storage/docx/New_Modules_Specs.docx\",\"time\":\"\\\"2021-08-12T17:14:05.009Z\\\"\",\"type\":\"doc\",\"extension\":\"docx\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"4788ebde\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new File New Modules Specs.docx\",\"time\":\"2021-08-13\"},{\"id\":\"9825e90b\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image playing_dolphin-wallpaper-1920x1080.jpg\",\"time\":\"2021-08-13\"}],\"due\":\"2021-08-17T18:00\",\"createAt\":\"2021-08-12T16:15:21.659Z\",\"isDone\":true,\"doneAt\":\"2021-08-14T15:16:10.155Z\",\"author\":\"2\"}]},{\"id\":\"L3\",\"name\":\"Testing\",\"cards\":[{\"id\":\"L3C1\",\"name\":\"Login functionalities\",\"content\":\"Check login Functionalities\",\"idAttachmentCover\":\"a302b2b5\",\"members\":[4],\"labels\":[\"26022e4129ad3a5sc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[{\"id\":\"a302b2b5\",\"name\":\"user-login-icon-29.png\",\"src\":\"http://localhost:4000/storage/png/user-login-icon-29.png\",\"time\":\"\\\"2021-08-16T10:54:37.488Z\\\"\",\"type\":\"image\",\"extension\":\"png\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"601f50ac\",\"type\":\"comment\",\"idMember\":2,\"message\":\"How\'s it going ?\",\"time\":\"10:23:55 PM Aug-16-21\"},{\"id\":\"b899ad00\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image user-login-icon-29.png\",\"time\":\"2021-08-16\"},{\"id\":\"447ac755\",\"type\":\"comment\",\"idMember\":2,\"message\":\"Please check carefully, cover all the possible cases!\",\"time\":\"2021-08-09\"}],\"due\":\"2021-08-15T10:30\",\"createAt\":\"2021-08-09T10:26:55.055Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"},{\"id\":\"L3C2\",\"name\":\"Chat app\",\"content\":\"Test the interface and functionalities of the chat app\",\"idAttachmentCover\":\"ff7acbd8\",\"members\":[4],\"labels\":[],\"checklist\":[{\"id\":\"73d98677\",\"name\":\"Test case\",\"checkItems\":[{\"id\":\"e3664d5f\",\"name\":\"Chat UI\",\"checked\":false},{\"id\":\"be52096d\",\"name\":\"Functionalities\",\"checked\":false}]}],\"comment\":[],\"attachments\":[{\"id\":\"ff7acbd8\",\"name\":\"41xbd-b4xSL.png\",\"src\":\"http://localhost:4000/storage/png/41xbd-b4xSL.png\",\"time\":\"\\\"2021-08-16T10:55:43.280Z\\\"\",\"type\":\"image\",\"extension\":\"png\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"1568379d\",\"type\":\"comment\",\"idMember\":2,\"message\":\"Chat app is merge into develop, please help me test it !\",\"time\":\"10:24:42 PM Aug-16-21\"},{\"id\":\"08739e82\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image 41xbd-b4xSL.png\",\"time\":\"2021-08-16\"}],\"due\":\"2021-08-28T13:30\",\"createAt\":\"2021-08-12T16:19:04.158Z\",\"isDone\":false,\"doneAt\":\"2021-08-14T16:07:02.714Z\",\"title\":\"Chat app\",\"time\":\"Duedate: 2021-08-31\",\"author\":\"2\"},{\"id\":\"L3C3\",\"name\":\"Test profile management UI\",\"content\":\"Testing UI and UX of profile management UI, ensure everything is working smoothly\",\"idAttachmentCover\":\"\",\"members\":[4],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"129ce7cc\",\"type\":\"comment\",\"idMember\":2,\"message\":\"Dear Mr.Phong, please help me test this task. Thank you!\",\"time\":\"2021-08-15\"}],\"due\":\"2021-08-25T22:30\",\"createAt\":\"2021-08-15T11:04:03.024Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"}]},{\"id\":\"L4\",\"name\":\"Evaluation\",\"cards\":[{\"id\":\"L4C1\",\"name\":\"Evaluation design and technical \",\"content\":\"Overview evaluation of new developed features\",\"idAttachmentCover\":\"336b6356\",\"members\":[],\"labels\":[\"26022e4129ad3a5sc28b36cd\"],\"checklist\":[{\"id\":\"d82e78f1\",\"name\":\"To do\",\"checkItems\":[{\"id\":\"ee72062e\",\"name\":\"Login page\",\"checked\":false},{\"id\":\"3b0d6628\",\"name\":\"Register page\",\"checked\":false},{\"id\":\"43fcdd7d\",\"name\":\"Chat app\",\"checked\":false}]}],\"comment\":[],\"attachments\":[{\"id\":\"336b6356\",\"name\":\"bo-hinh-nen-chat-luong-cao-16.jpg\",\"src\":\"http://localhost:4000/storage/jpg/bo-hinh-nen-chat-luong-cao-16.jpg\",\"time\":\"\\\"2021-08-12T16:36:07.407Z\\\"\",\"type\":\"image\",\"extension\":\"jpg\"},{\"id\":\"d1d61dc6\",\"name\":\"New Modules Specs.docx\",\"src\":\"http://localhost:4000/storage/docx/New_Modules_Specs.docx\",\"time\":\"\\\"2021-08-12T16:36:43.303Z\\\"\",\"type\":\"doc\",\"extension\":\"docx\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"f579b154\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new File New Modules Specs.docx\",\"time\":\"2021-08-12\"},{\"id\":\"f391f392\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-16.jpg\",\"time\":\"2021-08-12\"},{\"id\":\"58e02450\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-54.jpg\",\"time\":\"2021-08-12\"}],\"due\":\"2021-08-30T10:30\",\"createAt\":\"2021-08-12T16:33:17.025Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"}]}]','[{\"id\":\"8bb68d7d\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Test profile management UI\",\"time\":\"2021-08-15\"},{\"id\":\"4dd4ef4c\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"New member has been add to this board\",\"time\":\"2021-08-13\"}]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"url(/static/media/background4.b06e1d60.jpg)\",\"author\":\"1\",\"type\":\"personalBoard\",\"allowMemberEdit\":\"true\"}','2021-08-06 18:25:44','2021-08-17 00:57:10'),(4,'test board','[{\"userId\":\"10\",\"role\":\"admin\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"test\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"test\",\"content\":\"test card\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[\"56027e4119ad3a5dc28b36cd\",\"26022e4129ad3a5sc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-09T08:29:06.306Z\"}]}]','[]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\"}','2021-08-09 15:28:59','2021-08-09 15:29:32'),(5,'test board','[{\"userId\":\"11\",\"role\":\"admin\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"test list\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"test card\",\"content\":\"test card\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[\"5640635e19ad3a5dc21416b2\",\"56027e4119ad3a5dc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"2021-08-06\",\"createAt\":\"2021-08-09T08:32:08.693Z\"}]}]','[]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\"}','2021-08-09 15:32:01','2021-08-09 15:32:40'),(6,'test board','[{\"userId\":\"12\",\"role\":\"admin\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"test list\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"test card\",\"content\":\"test card\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"c6338950\",\"type\":\"comment\",\"idMember\":12,\"message\":\"test\",\"time\":\"2021-08-09\"}],\"due\":\"2021-08-05\",\"createAt\":\"2021-08-09T08:35:24.559Z\"}]}]','[]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\"}','2021-08-09 15:35:17','2021-08-09 15:35:37'),(7,'Hyper Task','[{\"userId\":\"2\",\"role\":\"admin\",\"status\":\"Stay\"},{\"userId\":\"3\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"4\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"5\",\"role\":\"member\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"Design\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"Create login page\",\"content\":\"Create new login UI for our app\",\"idAttachmentCover\":\"8de69f57\",\"members\":[3],\"labels\":[\"56027e4119ad3a5dc28b36cd\",\"6540635g19ad3s5dc31412b2\",\"5640635e19ad3a5dc21416b2\",\"26022e4129ad3a5sc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[{\"id\":\"8de69f57\",\"name\":\"HyperTask login.png\",\"src\":\"http://localhost:4000/storage/png/HyperTask_login.png\",\"time\":\"\\\"2021-08-09T09:12:15.817Z\\\"\",\"type\":\"image\",\"extension\":\"png\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"bfe87116\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image HyperTask login.png\",\"time\":\"2021-08-09\"}],\"due\":\"2021-08-12\",\"createAt\":\"2021-08-09T09:08:13.324Z\",\"isDone\":false,\"doneAt\":\"\"}]},{\"id\":\"L2\",\"name\":\"Development\",\"cards\":[]},{\"id\":\"L3\",\"name\":\"Testing\",\"cards\":[]},{\"id\":\"L4\",\"name\":\"Release\",\"cards\":[]}]','[]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\"}','2021-08-09 16:07:31','2021-08-15 20:24:20'),(9,'Software Developement','[{\"userId\":\"2\",\"role\":\"admin\",\"status\":\"Stay\"},{\"userId\":\"3\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"4\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"5\",\"role\":\"member\",\"status\":\"Stay\"},{\"userId\":\"10\",\"role\":\"member\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"Collect requirements\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"Customer requirements\",\"content\":\"Collect all user requirements\",\"idAttachmentCover\":\"\",\"members\":[3,4],\"labels\":[],\"checklist\":[{\"id\":\"2b8ecf8f\",\"name\":\"test\",\"checkItems\":[{\"id\":\"2e9d5351\",\"name\":\"1\",\"checked\":true},{\"id\":\"ba7c888e\",\"name\":\"2\",\"checked\":true},{\"id\":\"becdb59d\",\"name\":\"3\",\"checked\":true},{\"id\":\"cb91743d\",\"name\":\"4\",\"checked\":true}]}],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"2021-08-01\",\"createAt\":\"2021-08-09T12:12:47.293Z\",\"isDone\":false,\"doneAt\":\"\"},{\"id\":\"L1C2\",\"name\":\"Technical requirements\",\"content\":\"Find all technical requirements\",\"idAttachmentCover\":\"\",\"members\":[4],\"labels\":[\"26022e4129ad3a5sc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[{\"id\":\"285720e7\",\"name\":\"bo-hinh-nen-chat-luong-cao-2.jpg\",\"src\":\"http://localhost:4000/storage/jpg/bo-hinh-nen-chat-luong-cao-2.jpg\",\"time\":\"\\\"2021-08-09T12:15:20.896Z\\\"\",\"type\":\"image\",\"extension\":\"jpg\"}],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[{\"id\":\"7c19e975\",\"type\":\"attachment\",\"idMember\":\"2\",\"message\":\"Add new Image bo-hinh-nen-chat-luong-cao-2.jpg\",\"time\":\"2021-08-09\"}],\"due\":\"2021-08-13\",\"createAt\":\"2021-08-09T12:12:58.613Z\",\"isDone\":false,\"doneAt\":\"\"}]},{\"id\":\"L2\",\"name\":\"Technology\",\"cards\":[{\"id\":\"L2C1\",\"name\":\"For FE\",\"content\":\"Find suitable technology, prefer reactjs or angular\",\"idAttachmentCover\":\"\",\"members\":[5],\"labels\":[],\"checklist\":[{\"id\":\"fc1c2220\",\"name\":\"Requirement\",\"checkItems\":[{\"id\":\"567e94dd\",\"name\":\"Task 1\",\"checked\":false},{\"id\":\"1ee77d6f\",\"name\":\"Task 2\",\"checked\":false}]}],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-09T12:15:35.477Z\",\"isDone\":false,\"doneAt\":\"\"},{\"id\":\"L2C2\",\"name\":\"For BE\",\"content\":\"Find technology for BE. Consider Spring-Boot or .NET\",\"idAttachmentCover\":\"\",\"members\":[10],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"2021-08-19\",\"createAt\":\"2021-08-09T12:16:34.800Z\",\"isDone\":false,\"doneAt\":\"\"}]},{\"id\":\"L3\",\"name\":\"Find candidate\",\"cards\":[{\"id\":\"L3C1\",\"name\":\"Define Job description\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-09T12:18:03.980Z\",\"isDone\":false,\"doneAt\":\"\"}]},{\"id\":\"L4\",\"name\":\"Interview plan\",\"cards\":[]},{\"id\":\"L5\",\"name\":\"Design app structure\",\"cards\":[{\"id\":\"L5C1\",\"name\":\"Database structure\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[\"26022e4129ad3a5sc28b36cd\"],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-09T12:18:40.228Z\",\"isDone\":false,\"doneAt\":\"\"},{\"id\":\"L5C2\",\"name\":\"App Structure\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-09T12:18:48.450Z\",\"isDone\":false,\"doneAt\":\"\"}]},{\"id\":\"L6\",\"name\":\"Development\",\"cards\":[]},{\"id\":\"L7\",\"name\":\"Testing\",\"cards\":[]},{\"id\":\"L8\",\"name\":\"Run test\",\"cards\":[]},{\"id\":\"L9\",\"name\":\"Release\",\"cards\":[]}]','[{\"id\":\"0d67c373\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Rename Board\",\"time\":\"2021-08-14\"}]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\"}','2021-08-09 19:08:40','2021-08-14 22:13:23'),(10,'Daily Planner','[{\"userId\":\"2\",\"role\":\"admin\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"Monday\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"Company\'s work\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-15T03:04:59.746Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"}]},{\"id\":\"L2\",\"name\":\"Tuesday\",\"cards\":[]},{\"id\":\"L3\",\"name\":\"Wednesday\",\"cards\":[]},{\"id\":\"L4\",\"name\":\"Thursday\",\"cards\":[]},{\"id\":\"L5\",\"name\":\"Friday\",\"cards\":[]},{\"id\":\"L6\",\"name\":\"Saturday\",\"cards\":[]},{\"id\":\"L7\",\"name\":\"Sunday\",\"cards\":[]}]','[{\"id\":\"a469221d\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Sunday\",\"time\":\"11:28:04 PM Aug-16-21\"},{\"id\":\"466462b1\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Saturday\",\"time\":\"11:27:56 PM Aug-16-21\"},{\"id\":\"fbfcff4a\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Friday\",\"time\":\"11:27:45 PM Aug-16-21\"},{\"id\":\"0f2675da\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Thursday\",\"time\":\"11:27:35 PM Aug-16-21\"},{\"id\":\"41602ede\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Wednesday\",\"time\":\"11:26:32 PM Aug-16-21\"},{\"id\":\"556d13b3\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Tuesday\",\"time\":\"11:26:23 PM Aug-16-21\"},{\"id\":\"83da2a22\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Company\'s work\",\"time\":\"2021-08-15\"},{\"id\":\"4ff8663d\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Monday\",\"time\":\"2021-08-15\"}]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\",\"allowMemberEdit\":\"true\"}','2021-08-15 10:04:23','2021-08-16 23:28:04'),(14,'Things to do this week','[{\"userId\":\"2\",\"role\":\"admin\",\"status\":\"Stay\"}]','[{\"id\":\"L1\",\"name\":\"To do list\",\"cards\":[{\"id\":\"L1C4\",\"name\":\"Meet with production team\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-17T03:12:07.580Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"},{\"id\":\"L1C5\",\"name\":\"Write project report\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-17T03:12:21.606Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"}]},{\"id\":\"L2\",\"name\":\"Doing\",\"cards\":[{\"id\":\"L1C3\",\"name\":\"Edit video\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"\",\"createAt\":\"2021-08-17T03:11:57.977Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"},{\"id\":\"L1C2\",\"name\":\"Edit chat app\",\"content\":\"\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"2021-08-23T10:13\",\"createAt\":\"2021-08-17T03:11:51.528Z\",\"isDone\":false,\"doneAt\":\"\",\"author\":\"2\"}]},{\"id\":\"L3\",\"name\":\"Done\",\"cards\":[{\"id\":\"L1C1\",\"name\":\"Create monthly schedule\",\"content\":\"Create list of things todo this month !\",\"idAttachmentCover\":\"\",\"members\":[],\"labels\":[],\"checklist\":[],\"comment\":[],\"attachments\":[],\"subscribed\":true,\"checkItems\":0,\"checkItemsChecked\":0,\"activities\":[],\"due\":\"2021-08-24T10:12\",\"createAt\":\"2021-08-17T03:11:44.042Z\",\"isDone\":true,\"doneAt\":\"2021-08-17T03:13:20.355Z\",\"author\":\"2\"}]}]','[{\"id\":\"6de0f831\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Reorder Card\",\"time\":\"10:13:46 AM Aug-17-21\"},{\"id\":\"1bf0c6c4\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Write project report\",\"time\":\"10:12:21 AM Aug-17-21\"},{\"id\":\"8514a4cf\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Meet with production team\",\"time\":\"10:12:07 AM Aug-17-21\"},{\"id\":\"c1ad59d4\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Edit video\",\"time\":\"10:11:57 AM Aug-17-21\"},{\"id\":\"ca140a88\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Edit chat app\",\"time\":\"10:11:51 AM Aug-17-21\"},{\"id\":\"7aced5f8\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create Card Create monthly schedule\",\"time\":\"10:11:44 AM Aug-17-21\"},{\"id\":\"69d7a0b5\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Done\",\"time\":\"10:11:32 AM Aug-17-21\"},{\"id\":\"89285292\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List Doing\",\"time\":\"10:11:29 AM Aug-17-21\"},{\"id\":\"9ce65311\",\"type\":\"comment\",\"idMember\":\"2\",\"message\":\"Create List To do list\",\"time\":\"10:11:25 AM Aug-17-21\"}]','[{\"id\":\"26022e4129ad3a5sc28b36cd\",\"name\":\"High Priority\",\"class\":\"bg-red text-white\"},{\"id\":\"56027e4119ad3a5dc28b36cd\",\"name\":\"Design\",\"class\":\"bg-orange text-white\"},{\"id\":\"5640635e19ad3a5dc21416b2\",\"name\":\"App\",\"class\":\"bg-blue text-white\"},{\"id\":\"6540635g19ad3s5dc31412b2\",\"name\":\"Feature\",\"class\":\"bg-green text-white\"}]','{\"backgroundImage\":\"\",\"author\":\"1\",\"type\":\"personalBoard\",\"allowMemberEdit\":\"true\"}','2021-08-17 10:11:19','2021-08-17 10:13:46');

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dialog` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` VALUES ('27433416','[{\"who\":2,\"message\":\"Hello\",\"time\":\"2021-08-07T12:41:25.238Z\"},{\"who\":2,\"message\":\"Have you tested our new chat app ?\",\"time\":\"2021-08-07T12:41:35.086Z\"},{\"who\":4,\"message\":\"Im using it right now :D\",\"time\":\"2021-08-08T19:14:57.440Z\"},{\"who\":2,\"message\":\"Hello Phong\",\"time\":\"2021-08-09T11:55:40.323Z\"},{\"who\":4,\"message\":\"How do you do\",\"time\":\"2021-08-15T17:15:26.776Z\"},{\"who\":2,\"message\":\"Im good :D\",\"time\":\"2021-08-15T17:15:31.739Z\"},{\"who\":2,\"message\":\"Have you done testing new features in Beyond pixels boards ?\",\"time\":\"2021-08-16T16:15:36.829Z\"},{\"who\":4,\"message\":\"Almost done\",\"time\":\"2021-08-16T16:15:49.074Z\"},{\"who\":4,\"message\":\"I will try to complete it as soon as posible\",\"time\":\"2021-08-16T16:16:01.512Z\"},{\"who\":2,\"message\":\"Ok good :D\",\"time\":\"2021-08-16T16:16:15.607Z\"}]'),('3b7814b0','[{\"who\":2,\"message\":\"Hello Long :D\",\"time\":\"2021-08-07T12:41:57.613Z\"},{\"who\":2,\"message\":\"how do you do\",\"time\":\"2021-08-07T12:42:00.213Z\"}]'),('61141da9','[{\"who\":2,\"message\":\"Hello Khang\",\"time\":\"2021-08-07T12:40:54.401Z\"},{\"who\":3,\"message\":\"Hello my friend\",\"time\":\"2021-08-07T12:41:04.644Z\"}]'),('b26d76a0','[{\"who\":10,\"message\":\"Hi Ngoc Hai\",\"time\":\"2021-08-08T14:08:32.263Z\"},{\"who\":10,\"message\":\"Im your clone\",\"time\":\"2021-08-08T14:08:41.767Z\"},{\"who\":2,\"message\":\"wow\",\"time\":\"2021-08-08T14:09:36.621Z\"},{\"who\":10,\"message\":\"surprise :D\",\"time\":\"2021-08-08T14:09:53.751Z\"},{\"who\":10,\"message\":\"please accept my friend request\",\"time\":\"2021-08-08T14:10:20.214Z\"},{\"who\":2,\"message\":\"Ok :D\",\"time\":\"2021-08-08T14:10:28.071Z\"}]');

--
-- Table structure for table `common`
--

DROP TABLE IF EXISTS `common`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common` (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `common`
--

INSERT INTO `common` VALUES ('ONLINE_USER','[]');

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `contact` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `conversations` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `info` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `notes` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `labels` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES (2,'hypertaskadmin@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','hypertask','Hyper Task Admin','[{\"id\":3,\"status\":\"friend\"},{\"id\":4,\"status\":\"send\"},{\"id\":5,\"status\":\"send\"},{\"id\":10,\"status\":\"friend\"},{\"id\":15,\"status\":\"receive\"}]','[{\"chatId\":\"b26d76a0\",\"contactId\":10,\"lastMessageTime\":\"\"},{\"chatId\":\"3b7814b0\",\"contactId\":5,\"lastMessageTime\":\"\"},{\"chatId\":\"27433416\",\"contactId\":4,\"lastMessageTime\":\"\"},{\"chatId\":\"61141da9\",\"contactId\":3,\"lastMessageTime\":\"\"}]','{\"address\":\"590 CTM8 street, ward 11, distric 3, HCMC\",\"gender\":\"Male\",\"avatar\":\"assets/images/avatars/ngochai.jpg\",\"phoneNumber\":\"0123456789\",\"birthday\":\"\"}','[{\"id\":6,\"title\":\"\",\"description\":\"Prepare for the final project presentation\",\"archive\":false,\"image\":\"\",\"time\":null,\"reminder\":\"2021-08-18T00:25:00.000Z\",\"checklist\":[{\"id\":\"c36da699\",\"checked\":false,\"text\":\"Document\"},{\"id\":\"a05137ac\",\"checked\":false,\"text\":\"Source\"}],\"labels\":[]},{\"id\":5,\"title\":\"\",\"description\":\"Meeting with HyperTask team to, develop a new feature\",\"archive\":false,\"image\":\"\",\"time\":null,\"reminder\":\"2021-08-15T12:00:00.000Z\",\"checklist\":[{\"id\":\"4788775a\",\"checked\":false,\"text\":\"Login\"},{\"id\":\"5933e33c\",\"checked\":false,\"text\":\"Register\"},{\"id\":\"4ed3dd56\",\"checked\":false,\"text\":\"Chat app\"}],\"labels\":[3]},{\"id\":4,\"title\":\"\",\"description\":\"Present the 4th project at FPT aptech!\",\"archive\":false,\"image\":\"\",\"time\":null,\"reminder\":\"2021-08-18T22:30:00.000Z\",\"checklist\":[],\"labels\":[]},{\"id\":3,\"title\":\"\",\"description\":\"Meeting at the GG office, 10 am Aug 28\",\"archive\":false,\"image\":\"\",\"time\":null,\"reminder\":\"2021-08-16T03:30:00.000Z\",\"checklist\":[],\"labels\":[]},{\"id\":2,\"title\":\"\",\"description\":\"Go to Long\'s house to discuss about new task\",\"archive\":false,\"image\":\"\",\"time\":null,\"reminder\":\"2021-08-16T20:14:00.000Z\",\"checklist\":[],\"labels\":[]}]','[{\"id\":1,\"name\":\"Reminder\",\"handle\":\"reminder\"},{\"id\":2,\"name\":\"High priority\",\"handle\":\"highpriority\"},{\"id\":3,\"name\":\"Work\",\"handle\":\"work\"}]'),(3,'tuankhang@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','tuankhang','Tuan Khang','[{\"id\":2,\"status\":\"friend\"}]','[{\"chatId\":\"61141da9\",\"contactId\":2,\"lastMessageTime\":\"\"}]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/tuankhang.jpg\",\"phoneNumber\":\"\",\"birthday\":\"\"}','[]','[]'),(4,'xuanphong@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','xuanphong','Xuan Phong','[{\"id\":2,\"status\":\"receive\"}]','[{\"chatId\":\"27433416\",\"contactId\":2,\"lastMessageTime\":\"\"}]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/xuanphong.jpg\",\"phoneNumber\":\"\",\"birthday\":\"\"}','[]','[]'),(5,'hienlong@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','hienlong','Hien Long','[{\"id\":2,\"status\":\"receive\"}]','[{\"chatId\":\"3b7814b0\",\"contactId\":2,\"lastMessageTime\":\"\"}]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/hienlong.jpg\",\"phoneNumber\":\"\",\"birthday\":\"\"}','[]','[]'),(10,'ngochai2@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','ngochai2','Ngoc Hai Two','[{\"id\":2,\"status\":\"friend\"}]','[{\"chatId\":\"b26d76a0\",\"contactId\":2,\"lastMessageTime\":\"\"}]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/ngochai2.jpg\",\"phoneNumber\":\"\"}','[]','[]'),(11,'ngochai3@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','ngochai3','Ngoc Hai Three','[]','[]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/default-avatar.png\",\"phoneNumber\":\"\"}','[]','[]'),(12,'ngochai4@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','ngochai4','Ngoc Hai Four','[]','[]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/default-avatar.png\",\"phoneNumber\":\"\"}','[]','[]'),(13,'ngochai5@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','ngochai5','Ngoc Hai Five','[{\"id\":2,\"status\":\"receive\"}]','[]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/default-avatar.png\",\"phoneNumber\":\"\"}','[]','[]'),(14,'ngochai6@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','ngochai6','Ngoc Hai Six','[{\"id\":2,\"status\":\"receive\"}]','[]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/default-avatar.png\",\"phoneNumber\":\"\"}','[]','[]'),(15,'tuanhung@gmail.com','$2a$10$comv1BvkAZ.kIUY50pjmJexnXeiH2D1up..Gm9ABLl6jz6pClBBve','tuanhung','tuanhung','[{\"id\":2,\"status\":\"send\"}]','[]','{\"address\":\"\",\"gender\":\"\",\"avatar\":\"assets/images/avatars/default-avatar.png\",\"phoneNumber\":\"\"}','[]','[]');
