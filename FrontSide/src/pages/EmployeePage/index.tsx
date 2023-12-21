import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../Api/Api";
import Preloader from "../../Components/Preloader/Preloader";
import { Button, Grid, TextField, Typography } from "@mui/material";
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';


const EmployeePage = () => {

    const { id } = useParams();

    const [data, setData] = useState<any>(null);

    const [isLoading, setLoading] = useState(true);

    const [update, setUpdate] = useState(false);

    const [email, setEmail] = useState('');

    const navigate = useNavigate()

    const getEmployee = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/employees/${id}`).finally(() => setLoading(false))
            setData(res.data[0])
            setEmail(res.data[0].Email)
        } catch {
            setLoading(true);
        }
    }

    useEffect(() => {
        getEmployee()
    }, [])

    const removeFromCompany = async () => {
        await api.post(`api/employees/${data.EmployeeID}/leave`)
            .then(() =>
                navigate("/Employees")
            );
    }

    const onSave = async () => {
        await api.put(`api/employees/${data.EmployeeID}`, {
            FirstName: data.FirstName, LastName: data.LastName, MiddleName: data.MiddleName, Email: email
        }).then(() =>
            navigate("/Employees")
        );
    }

    if (isLoading) return <Preloader />
    return (
        <div>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 5, paddingTop: 3 }}>
                <Button onClick={() => setUpdate(!update)}>
                    <SettingsSharpIcon />
                </Button>
            </Grid>

            {
                update ?
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column"
                        , gap: 2,
                        width: 500
                    }}>
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email"></TextField>
                        <Button onClick={() => onSave()} variant="contained">Save</Button>
                        <Button onClick={() => removeFromCompany()} variant="contained">Delete Employee From Project</Button>
                    </Grid>
                    :
                    <Grid sx={{ padding: 3, }}>
                        <Typography sx={{ fontSize: 20, fontWeight: "700" }}>
                            Name: {data?.FirstName} {data?.LastName}
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: "600" }}>
                            Email: {data?.Email}
                        </Typography>
                        <Typography>
                            Company Name: {data.CompanyName == null ? "Job Finding" : data.CompanyName}
                        </Typography>
                    </Grid>

            }

        </div>
    )
}

export default EmployeePage;