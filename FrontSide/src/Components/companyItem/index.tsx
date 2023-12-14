import React from 'react';
import { Grid } from '@mui/material';


interface ICompany {
    name: string;
}

const CompanyItem: React.FC<ICompany> = ({ name }) => {

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

            <h1 style={{ textDecoration: "none" }}>
                {name}
            </h1>
        </Grid>
    )
}

export default CompanyItem;