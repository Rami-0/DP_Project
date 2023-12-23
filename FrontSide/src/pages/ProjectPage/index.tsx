import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api/Api";
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SaveAltSharpIcon from '@mui/icons-material/SaveAltSharp';
import Preloader from "../../Components/Preloader/Preloader";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';



const ProjectPage = () => {

    const { id, companyId }: any = useParams()

    const navigate = useNavigate()

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
    const [employees, setEmployees] = useState<any>(null);


    const getEmployee = async () => {
        setLoading(true)
        const res = await api.get(`/api/${id}/workers`)
            .finally(() => setLoading(false));
        setEmployees(res.data)
    }

    useEffect(() => {
        getPm()
        getProject()
        getEmployee()
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
        await api.put(`api/${companyId}/projects/${id}`, JsonData);
        navigate("/")
    }

    if (isLoading) return <Preloader />
    return (
        <section>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 5, paddingTop: 3 }}>
                <Button onClick={() => setUpdate(!update)}>
                    <SettingsSharpIcon />
                </Button>
            </Grid>
            {
                update ?
                    <Grid sx={{ display: "flex", flexDirection: "column", width: 500, gap: 4 }}>
                        <Grid>
                            Name: <TextField onChange={(e) => setName(e.target.value)} />
                        </Grid>

                        <Grid>
                            EndDate: <input type="date" onChange={(e) => setDate(e.target.value)} />
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
                            <Button variant="outlined" onClick={() => onUpdate()}>
                                <SaveAltSharpIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid sx={{ padding: 3 }}>
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
                                Executor: {data?.ExecutorCompanyName}
                            </Typography>
                            <Typography>
                                Customer: {data?.CustomerCompanyName}
                            </Typography>
                        </Grid>
                        <Typography>
                            Start Date: {data?.StartDate}
                        </Typography>
                        <Typography>
                            End Date: {data?.EndDate}
                        </Typography>
                        <hr style={{ marginTop: 30, marginBottom: 30 }} />
                        <h1 style={{ marginBottom: 30 }}>Company Employees</h1>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees?.map(({ FirstName, LastName }: any) => (
                                        <TableRow key={id}>
                                            <TableCell>{FirstName} {LastName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
            }
        </section>
    )
}

export default ProjectPage;