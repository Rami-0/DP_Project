import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Api/Api";
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SaveAltSharpIcon from '@mui/icons-material/SaveAltSharp';

const ProjectPage = () => {

    const { id, companyId }: any = useParams()
    console.log(id, companyId);

    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    const [update, setUpdate] = useState(false);

    const [pms, setPms] = useState<any>(null);

    const getPm = async () => {
        try {
            const res = await api.get(`api/${id}/employees`);
            setPms(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };


    const getProject = async () => {
        setLoading(true)
        const res = await api.get(`/api/${companyId}/projects/${id}`).finally(() => setLoading(false));
        setData(res.data[0])
    }

    useEffect(() => {
        getPm()
        getProject()
    }, [])

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [PmId, setPMId] = useState(1);


    // const json__ = {
    //     ProjectId: id,
    //     Name: Name, // 
    //     ProjectManagerID: ProjectManagerID, // 
    //     StartDate: StartDate,
    //     EndDate: EndDate, //
    //     Priority: Priority, // 
    //     companyID: companyID,
    //   }


    const JsonData = {
        ProjectId: id,
        Name: name,
        ProjectManagerID: PmId,
        StartDate: data?.StartDate,
        EndDate: date,
        Priority: null,
        companyID: companyId
    }

    const onUpdate = async () => {
        const res = await api.put(`api/${companyId}/projects/${id}`, JsonData);
        console.log(res);

    }

    if (isLoading) return <h1>Loading......</h1>
    return (
        <section>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 5, paddingTop: 3 }}>
                <Button onClick={() => setUpdate(!update)}>
                    <SettingsSharpIcon />
                </Button>
            </Grid>
            {
                update ?
                    <>
                        <Grid sx={{ display: "flex", gap: 3, flexFlow: "wrap" }}>
                            <Grid>
                                Name: <TextField onChange={(e) => setName(e.target.value)} />
                            </Grid>

                            <Grid>
                                EndDate: <input type="date" onChange={(e) => setDate(e.target.value)} />
                            </Grid>
                        </Grid>
                        Project Manager ID <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={PmId}
                            label=""
                            onChange={(e: any) => setPMId(e.target.value as number)}
                        >
                            {pms?.map((el: any) => <MenuItem key={el.FirstName} value={el.EmployeeID}>{el.FirstName} {el.LastName}</MenuItem>)}
                        </Select>
                        <Grid sx={{ mt: 3 }}>
                            <Button onClick={() => onUpdate()}>
                                <SaveAltSharpIcon />
                            </Button>
                        </Grid>
                    </>

                    :
                    <Grid sx={{ padding: 3, }}>
                        <Typography sx={{ fontSize: 20, fontWeight: "700" }}>
                            Project Name: {data?.Name}
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: "600" }}>
                            Role: {data?.AccessRole}
                        </Typography>
                        <Grid sx={{
                            display: "flex",
                            gap: "25px",
                            fontSize: 20, fontWeight: "600"
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
            }
        </section>
    )
}

export default ProjectPage;