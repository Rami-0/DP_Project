import React, { useEffect, useState } from 'react'
import { api } from '../../Api/Api'
import Preloader from '../../Components/Preloader/Preloader';
import { Grid } from '@mui/material';
import EmployeeItem from './EmployeeItem';
import { Link } from 'react-router-dom';

const Employees = () => {

    const [data, setData] = useState<any>(null);

    const [isLoading, setLoading] = useState(true);

    const getEmployees = async () => {
        setLoading(true)
        try {
            const res = await api.get("api/employees").finally(() => setLoading(false))
            setData(res.data)
        } catch {
            setLoading(true)
        }
    }

    useEffect(() => {
        getEmployees();
    }, [])

    if (isLoading) return <Preloader />
    return (
        <Grid padding={2} sx={{
            display: "flex",
            flexFlow: "wrap",
            gap: "20px"
        }}>
            {data.map((el: any, i: any) =>

                <Link key={`${el.EmployeeID}_${i}`} style={{ textDecoration: "none", color: "gray" }} to={`${el.EmployeeID}`}>
                    <EmployeeItem FirstName={el.FirstName} LastName={el.LastName} key={`${i}_${el.EmployeeID}`} />
                </Link>
            )}
            <Link style={{ textDecoration: "none", color: "gray" }} to={`/createEmployee`}>
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
                    textAlign: "center",
                    '&:hover': {
                        backgroundColor: 'gray',
                        textDecoration: 'none'
                        , color: "white"
                    },
                }}>

                    <h1 style={{ textDecoration: "none" }}>
                        Create Employee
                    </h1>
                </Grid>
            </Link>
        </Grid>
    )
}

export default Employees