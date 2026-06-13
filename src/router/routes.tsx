import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import SearchHome from "@/pages/SearchHome"
import EntityList from "@/pages/EntityList"
import PersonDetail from "@/pages/PersonDetail"
import OrganizationDetail from "@/pages/OrganizationDetail"
import DealList from "@/pages/DealList"
import DealDetail from "@/pages/DealDetail"
import SourceList from "@/pages/SourceList"
import SourceDetail from "@/pages/SourceDetail"

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <SearchHome /> },
        { path: "/persons", element: <EntityList type="persons" /> },
        { path: "/persons/:id", element: <PersonDetail /> },
        { path: "/organizations", element: <EntityList type="organizations" /> },
        { path: "/organizations/:id", element: <OrganizationDetail /> },
        { path: "/deals", element: <DealList /> },
        { path: "/deals/:id", element: <DealDetail /> },
        { path: "/sources", element: <SourceList /> },
        { path: "/sources/:id", element: <SourceDetail /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
