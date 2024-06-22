import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function ProjectDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const projectDetails = useSelector((store) => store.projects.projectDetails);
  const projectNotes = useSelector((store) => store.notes);

  console.log('check projectNotes', projectNotes);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: params.id });
    dispatch({ type: 'FETCH_NOTES', payload: params.id });
  }, []);

  const deleteProject = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: params.id });
    history.push('/projects');
  };

  const returnToProjects = () => {
    history.push('/projects');
  };

  const editDetails = (projectId) => {
    history.push(`/edit-project/${projectId}`);
  };

  return (
    <>
      <h1>Project Details Page</h1>
      <p>{projectDetails.pattern_title}</p>
      <IconButton onClick={() => editDetails(projectDetails.id)}>
        <EditIcon />
      </IconButton>
      <button onClick={() => deleteProject(projectDetails.id)}>Delete Project</button>
      <button onClick={returnToProjects}>Back to Inventory</button>
    </>
  );
}

export default ProjectDetails;
