import { ACCOUNT_TYPE } from '../components/common/constant'
import {
        VscAccount,
        VscDashboard,
        VscVm,
        VscAdd,
        VscHistory,
} from "react-icons/vsc";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: <VscAccount />,
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscDashboard />,
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscVm />,
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscAdd />,
  },
  {
    id: 5,
    name: "Saved Course",
    path: "/dashboard/saved-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscAdd />,
  },
  {
    id: 5,
    name: "Enrolled Course",
    path: "/dashboard/enrolled-course",
    type: ACCOUNT_TYPE.STUDENT,
    icon: <VscAdd />,
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: <VscHistory />,
  },
];