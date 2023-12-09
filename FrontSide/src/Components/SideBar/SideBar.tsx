import css from "./SideBar.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from '@mui/icons-material/Group';

import CommuteIcon from "@mui/icons-material/Commute";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const links = [
    {
        path: "/",
        title: "RamiGay",
        Icon: CommuteIcon,
    },
    {
        path: "/marshruts",
        title: "Pidoras",
        Icon: CommuteIcon,
    }
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
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <br />
                <br />
                <ListItem disablePadding onClick={onLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Выйти"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}

export default SideBar;