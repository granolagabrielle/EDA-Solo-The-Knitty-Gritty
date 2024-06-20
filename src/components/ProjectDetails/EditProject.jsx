import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function EditProject() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const projectDetails = useSelector((store) => store.projects.projectDetails);
  console.log('checking yarn details', projectDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: params.id });
  }, []);

  const handleSubmit = (projectId) => {
    console.log('check changes', projectDetails);
    dispatch({ type: 'EDIT_PROJECT', payload: { projectId: projectDetails.id, details: projectDetails } });
    history.push(`/project/${projectId}`);
  };

  return (
    <div>
      <h1>Edit {projectDetails?.pattern_title}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Notes:
          <input
            id='project-notes'
            type='text'
            value={projectDetails?.notes}
            onChange={(event) => dispatch({ type: 'EDIT_PROJECT_DETAILS', payload: { notes: event.target.value } })}
          />
        </label>
        <label>
          Progress:
          <input
            id='project-progress'
            type='text'
            value={projectDetails?.progress}
            onChange={(event) => dispatch({ type: 'EDIT_PROJECT_DETAILS', payload: { progress: event.target.value } })}
          />
        </label>
        <button type='submit' onClick={() => handleSubmit(projectDetails.id)}>
          Submit Changes
        </button>
      </form>
    </div>
  );
}

export default EditProject;
