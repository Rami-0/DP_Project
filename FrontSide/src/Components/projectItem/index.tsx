import { Grid } from "@mui/material";
import React from "react";

interface IProject {
    name: string;
    // CustomerCompanyID: number;
    // EndDate: string;
    // ExecutorCompanyID: number;
    // Priority: number;
    // ProjectID: number;
    // ProjectManagerID: number;
    // StartDate: string;
}

const ProjectItem: React.FC<IProject> = ({ name }) => {
    return (
        <Grid borderRadius={3} boxShadow={2} sx={{
            width: "230px",
            height: "200px",
            display: "flex",
            justifyContent: "center"
            , alignItems: "center",
            cursor: "pointer",
            transition: 'background-color 0.3s',
            textDecoration: 'none',
            flex: 1,

            '&:hover': {
                backgroundColor: 'gray',
                textDecoration: 'none'
                , color: "white"
            },
        }}>
            <h1>{name}</h1>
        </Grid>
    )
}

export default ProjectItem;