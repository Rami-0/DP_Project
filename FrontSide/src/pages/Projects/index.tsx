import React, { useEffect } from "react";
import { api } from './../../Api/Api';

const Projects = () => {


    const getProjects = async () => {
        try {
            const res = await api.get("/api/1/projects");

            console.log(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <section>
            hello wordl
        </section>
    )
}


export default Projects;