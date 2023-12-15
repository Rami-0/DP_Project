import { Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../../Api/Api";


const CreateCompany = () => {

    const [pName, setPName] = useState("");





    const onCreate = async () => {
        const res = await api.post(`api/companies`, {name:pName})
        console.log(res);

        return res;

    }


    return (
        <Grid padding={3} sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5
        }}>
            <TextField onChange={(e: any) => setPName(e.target.value)} label={"ProjectName"}></TextField>


            <Button onClick={() => onCreate()}>
                Create Project
            </Button>
        </Grid>
    )
}

export default CreateCompany;