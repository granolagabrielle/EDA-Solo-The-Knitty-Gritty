import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function ProjectDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const projects = useSelector((store) => store.projects.projectInventory);
  const projectDetails = useSelector((store) => store.projects.projectDetails);

  console.log('checking yarns', projects);

  useEffect(() => {
    console.log(`GET params.id ${params.id}`);
    dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: params.id });
  }, []);

  const deleteProject = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: params.id });
    console.log('check deleted id', params.id);
    history.push('/projects');
  };

  const returnToProjects = () => {
    history.push('/projects');
  };

  return (
    <>
      <h1>Project Details Page</h1>
      <p>{projectDetails.pattern_title}</p>
      <button onClick={() => deleteProject(projectDetails.id)}>Delete Project</button>
    </>
  );
}

export default ProjectDetails;
