import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

interface Project {
  id: number;
  project_name: string;
  task_ids: number[]; // Ensure this matches the data structure
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: number) => {
    setActiveProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects
          .filter((project) => project.project_name) // Filter out projects where project_name is null
          .map((project) => (
            <li key={project.id}>
              <h3 onClick={() => handleProjectClick(project.id)} style={{ cursor: 'pointer' }}>
                {project.project_name}
              </h3>
              {activeProjectId === project.id && (
                <ul>
                  {(project.task_ids || []).length > 0 ? (
                    project.task_ids.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))
                  ) : (
                    <li>No tasks available</li>
                  )}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Projects;
