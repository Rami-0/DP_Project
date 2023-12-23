import css from "./SideBar.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CommuteIcon from "@mui/icons-material/Commute";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Typography } from "@mui/material";

const links = [
    {
        path: "/",
        title: "Companies",
        Icon: CommuteIcon,
    },
    {
        path: "/Employees",
        title: "Employees",
        Icon: CommuteIcon,
    },

];

function SideBar() {
    const location = useLocation();
    const onLogout = () => {
        alert("hello")
    }
    return (
        <div className={css.wrapper}>
            {/* <div className={css.logo}>
                <img src={logo} alt="Ак-Жол" width={100} />
            </div> */}
            <List>
                {links.map(({ path, title, Icon }) => (
                    <ListItem
                        key={path}
                        selected={path === location.pathname}
                        classes={{ selected: css.selected }}
                        disablePadding
                        component={Link}
                        to={path}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon style={path === location.pathname ? { color: '#fff' } : {}} />
                            </ListItemIcon>

                            <Typography sx={path == location.pathname ? {

                                fontFamily: "sans-serif",
                                fontWeight: 600,
                                color: "white"
                            } : {

                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                color: "black"
                            }}>
                                {title}
                            </Typography>

                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default SideBar;