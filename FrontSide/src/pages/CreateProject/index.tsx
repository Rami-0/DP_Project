import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Api/Api";
import { Grid, TextField, Select, MenuItem, Button } from "@mui/material";

const CreateProject = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const { id }: any = useParams();

    const [pName, setPName] = useState("");
    const [PmId, setPMId] = useState(1);
    const [pms, setPms] = useState<any>(null);
    const [companies, setCompanies] = useState<any>(null);
    const [companyId, setCompanyId] = useState<any>(1);
    const [selectedDate, setSelectedDate] = useState<string>(formattedDate);
    const [loadingPms, setLoadingPms] = useState(true);

    const getPm = async () => {
        try {
            const res = await api.get(`api/${id}/employees`);
            setPms(res.data);
            setLoadingPms(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingPms(false);
        }
    };

    const getCompanies = async () => {
        try {
            const res = await api.get(`api/companies`);
            setCompanies(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const pmTimeout = setTimeout(() => {
            if (loadingPms) {
                console.log("Data retrieval timed out. No data received for pms.");
                setLoadingPms(false);
            }
        }, 3000); // Timeout set to 3 seconds (3000 milliseconds)

        getPm();
        getCompanies();

        return () => clearTimeout(pmTimeout);
    }, [id]); // Fetch data when the component mounts or when the 'id' parameter changes

    const onCreate = async () => {
        const data = {
            CompanyID: id,
            Priority: null,
            ExecutorCompanyID: companyId,
            Name: pName,
            EndDate: selectedDate,
            ProjectManagerID: PmId,
            StartDate: formattedDate
        };

        try {
            const res = await api.post(`api/${id}/projects/create`, { ...data });
            return res;
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    if (loadingPms) return <h1>Loading...</h1>;
    if (!pms?.length) return <h1>No data received for pms.</h1>;

    return (
        <Grid padding={3} sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5
        }}>
            <TextField onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPName(e.target.value)} label={"ProjectName"}></TextField>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PmId}
                label=""
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setPMId(e.target.value as number)}
            >
                {pms?.map((el: any) => <MenuItem key={el.FirstName} value={el.EmployeeID}>{el.FirstName} {el.LastName}</MenuItem>)}
            </Select>
            <input type="date" value={selectedDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}></input>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyId}
                label=""
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCompanyId(e.target.value as number)}
            >
                {companies?.map((el: any) => <MenuItem key={el.CompanyID} value={el.CompanyID}>{el.Name}</MenuItem>)}
            </Select>
            <Button onClick={() => onCreate() }>
                Create Project
            </Button>
        </Grid>
    )
}

export default CreateProject;
