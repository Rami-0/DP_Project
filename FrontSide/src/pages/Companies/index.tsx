import React, { useEffect, useState } from "react";
import { api } from './../../Api/Api';
import CompanyItem from "../../Components/companyItem";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Companies = () => {

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState<any>(null);

    const getCompanies = async () => {
        setLoading(true)
        try {
            const res = await api.get("/api/companies").finally(() => setLoading(false));
            setData(res.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getCompanies()
    }, [])

    if (isLoading) return <h1>Loading....</h1>
    return (
        <section style={{ padding: 20 }}>
            <Grid sx={{
                display: "flex",
                flexFlow: "wrap",
                gap: "20px"
            }}>
                {
                    data?.map((el: any, i: number) =>
                        <Link style={{ textDecoration: "none", color: "gray" }} to={`${el.CompanyID}`}>
                            <CompanyItem name={el.Name} key={`${el.CompanyID}_${i}`} />
                        </Link>
                    )
                }
            </Grid>
        </section>
    )
}


export default Companies;