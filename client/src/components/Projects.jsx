import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/projects")
			.then(res => setProjects(res.data))
			.catch(error => console.log(error));
	}, []);

	return (
		<>
			{projects.map((project, index) => (
				<div key={index}>
					<p>{project.name}</p>
					<p>{project.description}</p>
				</div>
			))}
		</>
	);
};

export default Projects;
