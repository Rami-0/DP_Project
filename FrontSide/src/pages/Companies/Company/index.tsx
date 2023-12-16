import React, { useEffect, useState } from 'react'
import { api } from '../../../Api/Api';
import { Link, useParams } from 'react-router-dom';
import ProjectItem from '../../../Components/projectItem';
import { Button, Grid, TextField, Typography } from '@mui/material';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

const CompanyPage = () => {

    const [isLoading, setLoading] = useState(true);

    const { id }: any = useParams()

    const [data, setData] = useState<any[]>([]);

    const [title, setTitle] = useState<any>(null);

    const [isSetting, setSettings] = useState(false);

    const getUniqCompany = async () => {
        try {
            setLoading(true)
            const res = await api.get(`api/companies/${id}`).finally(() => setLoading(false))
            setTitle(res.data[0].Name)
        } catch {
            console.log("error");
        }
    }

    const getProjects = async () => {
        try {
            setLoading(true)
            const res = await api.get(`api/${id}/projects`).finally(() => setLoading(false))
            setData(res.data)
        } catch {
            console.log("error");
        }
    }

    const onUpdate = async () => {
        const res = await api.put(`api/companies/${id}`, { CompanyID: id, CompanyName: title })
        console.log(res);
    }

    useEffect(() => {
        getUniqCompany()
        getProjects()
    }, [])

    if (isLoading && title != null) return <h1>Loading.....</h1>
    return (
        <div style={{ padding: 20 }}>
            <Grid sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
            }}>
                {
                    isSetting ?
                        <Grid sx={{ display: "flex", alignItems: "center" }}>
                            <TextField onChange={(e) => setTitle(e.target.value)} value={title}></TextField>
                            <Button onClick={() => onUpdate()}>
                                <SaveSharpIcon />
                            </Button>
                        </Grid>
                        :

                        <h1>{title}</h1>

                }
                <Grid>
                    <Button onClick={() => setSettings(!isSetting)} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <SettingsSharpIcon />
                    </Button>
                    {/* <Button onClick={() => setSettings(!isSetting)} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <DeleteOutlineSharpIcon />
                    </Button> */}
                </Grid>
            </Grid>
            <Grid mt={2} sx={{ width: "100%", display: "flex", flexFlow: "wrap", gap: 3 }}>
                {
                    data.map((el: any) =>
                        <Link style={{ textDecoration: "none", color: "gray" }} key={el.ProjectID} to={`/${id}/projects/${el.ProjectID}`}>
                            <ProjectItem name={el.Name} />
                        </Link>
                    )
                }
                <Link style={{ textDecoration: "none", color: "gray" }} to={`/${id}/createProject`}>
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
                        color: "gray",
                        '&:hover': {
                            backgroundColor: 'gray',
                            textDecoration: 'none'
                            , color: "white"
                        },
                    }}>
                        <Typography sx={{ fontSize: 25, fontWeight: "600" }}> Add new Project</Typography>
                    </Grid>
                </Link>
            </Grid>
        </div>
    )
}

export default CompanyPage;