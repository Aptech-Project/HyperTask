import React from "react";
import { Redirect } from "react-router-dom";

export const ScrumboardAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/scrumboard/boards/:boardId",
      component: React.lazy(() => import("./board/Board")),
    },
    {
      path: "/apps/scrumboard/boards",
      component: React.lazy(() => import("./boards/Boards")),
    },
    {
      path: "/apps/scrumboard",
      component: () => <Redirect to="/apps/scrumboard/boards" />,
    },
  ],
};
