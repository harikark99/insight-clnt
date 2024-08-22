import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4040/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{`Project ID: ${project.id}, Project Name: ${project.project_name}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
