import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import HomePage from "../pages/HomePage";
import SideBar from "../Components/SideBar/SideBar";
import Projects from "../pages/Projects/index";
import Companies from "../pages/Companies";
import CompanyPage from "../pages/Companies/Company";
import ProjectPage from "../pages/ProjectPage";
import CreateProject from "../pages/CreateProject";
import CreateCompany from "../pages/Companies/Create";
import Employees from "../pages/Employees";
import EmployeePage from "../pages/EmployeePage";
// import SideBar from "../components/sidebar/SideBar";
// import BookPlacePage from "../pages/HomePage/BookPlacePage";
// import HomePage from "../pages/HomePage/HomePage";
// import AddOrEditLocationsPage from "../pages/LocationsPage/AddOrEditLocationsPage";
// import LocationsPage from "../pages/LocationsPage/LocationsPage";
// import LoginPage from "../pages/LoginPage/LoginPage";
// import NotFound from "../pages/NotFound/NotFound";
// import OrdersPage from "../pages/OrdersPage/OrdersPage";
// import AddOrEditTourPage from "../pages/ToursPage/AddOrEditTourPage";
// import AddOrEditTransportPage from "../pages/ToursPage/AddOrEditTransportPage";
// import TourDetailPage from "../pages/ToursPage/TourDetailPage";
// import ToursPage from "../pages/ToursPage/ToursPage";
// import TransportDetailPage from "../pages/ToursPage/TransportDetailPage";
// import TicketsPage from "../pages/ticketsPage/LocationsPage";

interface IRoute {
    isAuth: boolean;
}

const useRoutes: React.FC<IRoute> = ({ isAuth }) => {

    if (!isAuth) {
        return (
            <Routes>
                <Route path="/" element={<SignIn />} />
            </Routes>
        );
    }

    return (
        <Grid container spacing={5}>
            <Grid item lg={2.5} md={2}>
                <SideBar />
            </Grid>
            <Grid item lg={9.5} md={10}>
                <Routes>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/" element={<Companies />} />
                    <Route path="/:id" element={<CompanyPage />}></Route>
                    <Route path="/:companyId/projects/:id" element={<ProjectPage />} />
                    <Route path=":id/createProject" element={<CreateProject />}></Route>
                    <Route path="/createCompanies" element={<CreateCompany />}></Route>
                    <Route path="/Employees" element={<Employees />}></Route>
                    <Route path="/Employees/:id" element={<EmployeePage />}></Route>
                </Routes>
            </Grid>
        </Grid >
    );
};

export default useRoutes;