import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Notifications from "@/pages/Notifications.vue";
import Users from "@/pages/Users.vue";
import Registration from "@/pages/UserRegistration.vue";
import Camera from "@/pages/Camera.vue";
import Registro from "@/pages/Registros.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "users",
        name: "Lista de Usuarios",
        component: Users
      },
      {
        path: "registration",
        name: "Registrar Usuarios",
        component: Registration
      },
      {
        path: "camera",
        name: "Cámara en vivo",
        component: Camera
      },
      {
        path: "registros",
        name: "Registros",
        component: Registro
      }
    ]
  }
];

export default routes;
