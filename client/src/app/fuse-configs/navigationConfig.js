import { MaterialUIComponentsNavigation } from "app/main/documentation/material-ui-components/MaterialUIComponentsNavigation";
import { authRoles } from "app/auth";

const navigationConfig = [
    {
        id: "dashboards",
        title: "Dashboards",
        type: "item",
        icon: "dashboard",
        url: "/dashboard",
    },
    {
        id: "boards",
        title: "Boards",
        type: "item",
        icon: "assessment",
        url: "/apps/scrumboard",
    },
    {
        id: "features",
        title: "Features",
        type: "item",
        icon: "ac_unit",
        url: "/features",
    },
    {
        id: "about",
        title: "About Us",
        type: "item",
        icon: "library_books",
        url: "/about",
    },
    {
        id: "app",
        title: "Applications",
        type: "group",
        icon: "apps",
        children: [
            {
                id: "notes",
                title: "Notes",
                type: "item",
                icon: "note",
                url: "/apps/notes",
            },
            {
                id: "calendar",
                title: "Calendar",
                type: "item",
                icon: "today",
                url: "/apps/calendar",
            },
        ]
    },
];

export default navigationConfig;
