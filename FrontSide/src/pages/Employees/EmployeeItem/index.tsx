import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";


interface IEmloyee {
    FirstName: string;
    LastName: string;
    // Email: string;
    // CompanyName: string;
    // CompanyID: number | string;
}

const EmployeeItem: React.FC<IEmloyee> = ({ LastName, FirstName }) => {

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

            <h1 style={{ textDecoration: "none", textAlign: "center" }}>
                {FirstName} <br />
                {LastName}
            </h1>
        </Grid>
    )
}

export default EmployeeItem;