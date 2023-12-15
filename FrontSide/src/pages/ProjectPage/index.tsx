import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Api/Api";


const ProjectPage = () => {

    const {id , companyId}:any = useParams()
    console.log(id , companyId);

    const [data, setData] = useState<any>(null);
    const [isLoading , setLoading] = useState(true)
    

    const getProject = async () => {
        setLoading(true)
        const res = await api.get(`/api/${companyId}/projects/${id}`).finally(() => setLoading(false));
        setData(res.data[0])
    }

    useEffect(() => {
        getProject()
    }, [])

    
if(isLoading) return <h1>Loading......</h1>
    return (
        <Grid sx={{padding:3 , }}>
             <Typography sx={{fontSize:20 , fontWeight:"700"}}>
            Project Name: {data.Name}
            </Typography>
            <Typography sx={{fontSize:20 , fontWeight:"600"}}>
            Role: {data.AccessRole}
            </Typography>
           
          <Grid sx={{
            display:"flex",
            gap:"25px",
            fontSize:20, fontWeight:"600"
          }}>
          <Typography>
            Executor: {data.ExecutorCompanyName}
            </Typography>
            <Typography>
            Customer: {data.CustomerCompanyName}
            </Typography>
          </Grid>
          <Typography>
    Start Date: {data.StartDate}
            </Typography>
            <Typography>
            End Date: {data.EndDate}
            </Typography>
        </Grid>
    )
}

export default ProjectPage;