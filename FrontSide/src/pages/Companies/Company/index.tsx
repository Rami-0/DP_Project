import React, { useEffect, useState } from 'react'
import { api } from '../../../Api/Api';
import { Link, useParams } from 'react-router-dom';
import ProjectItem from '../../../Components/projectItem';
import { Grid } from '@mui/material';



const CompanyPage = () => {

    const [isLoading, setLoading] = useState(true);

    const { id }: any = useParams()

    const [data, setData] = useState<any[]>([]);

    const [title, setTitle] = useState<any>(null);

    const getUniqCompany = async () => {
        try {
            setLoading(true)
            const res = await api.get(`api/companies/${id}`).finally(() => setLoading(false))
            setTitle(res.data[0])
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

    useEffect(() => {
        getUniqCompany()
        getProjects()
    }, [])

    console.log(data);


    if (isLoading) return <h1>Loading.....</h1>
    return (
        <div style={{ padding: 20 }}>
            <h1>{title?.Name}</h1>
            <Grid mt={2} sx={{ width: "100%", display: "flex", flexFlow: "wrap", gap: 3 }}>
                {
                    data.map((el: any) =>
                        <Link style={{ textDecoration: "none", color: "gray" }} to="">
                            <ProjectItem name={el.Name} />
                        </Link>
                    )
                }
            </Grid>
        </div>
    )
}

export default CompanyPage;