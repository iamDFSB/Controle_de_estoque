import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api/getProjects.js';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getProjects();
            setProjects(response.projects || []);
        } catch (err) {
            setError('Failed to fetch projects');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create new project
    const addProject = async (projectData) => {
        try {
            setError(null);
            const response = await createProject(projectData);
            if (response.success !== false) {
                await fetchProjects(); // Refresh the list
                return response;
            }
            throw new Error(response.message || 'Failed to create project');
        } catch (err) {
            setError('Failed to create project');
            console.error('Error creating project:', err);
            throw err;
        }
    };

    // Update existing project
    const updateProjectData = async (projectId, projectData) => {
        try {
            setError(null);
            const response = await updateProject(projectId, projectData);
            if (response.success !== false) {
                await fetchProjects(); // Refresh the list
                return response;
            }
            throw new Error(response.message || 'Failed to update project');
        } catch (err) {
            setError('Failed to update project');
            console.error('Error updating project:', err);
            throw err;
        }
    };

    // Delete project
    const removeProject = async (projectId) => {
        try {
            setError(null);
            const response = await deleteProject(projectId);
            if (response.success !== false) {
                await fetchProjects(); // Refresh the list
                return response;
            }
            throw new Error(response.message || 'Failed to delete project');
        } catch (err) {
            setError('Failed to delete project');
            console.error('Error deleting project:', err);
            throw err;
        }
    };

    // Group projects by status for the kanban board
    const getProjectsByColumn = () => {
        const columns = {
            'col-proposta': [],      // Proposta Comercial
            'col-estoque': [],       // Estoque  
            'col-compras': [],       // Compras
            'col-faturamento': [],   // Faturamento
            'col-entrega': []        // Entrega
        };

        projects.forEach(project => {
            const status = project.status;
            switch (status) {
                case 'Proposta Comercial':
                    columns['col-proposta'].push(project);
                    break;
                case 'Estoque':
                    columns['col-estoque'].push(project);
                    break;
                case 'Compras':
                    columns['col-compras'].push(project);
                    break;
                case 'Faturamento':
                    columns['col-faturamento'].push(project);
                    break;
                case 'Entrega':
                    columns['col-entrega'].push(project);
                    break;
                default:
                    // Default to the first column if status doesn't match
                    columns['col-proposta'].push(project);
                    break;
            }
        });

        return columns;
    };

    // Initial fetch
    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        loading,
        error,
        fetchProjects,
        addProject,
        updateProjectData,
        removeProject,
        getProjectsByColumn
    };
};