import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function EditProject() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const projectDetails = useSelector((store) => store.projects.projectDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: params.id });
  }, []);

  const handleSubmit = (projectId) => {
    console.log('project details', projectDetails);
    dispatch({ type: 'EDIT_PROJECT', payload: { projectId: projectDetails.id, details: projectDetails } });
    history.push(`/projects/${projectId}`);
  };

  return (
    <div>
      <h1>Edit {projectDetails?.pattern_title}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Grams knit:
          <input
            id='grams_knit'
            type='text'
            value={projectDetails?.grams_knit}
            onChange={(event) =>
              dispatch({ type: 'EDIT_PROJECT_DETAILS', payload: { grams_knit: event.target.value } })
            }
          />
        </label>
        {/* <label>
          Total grams needed for project:
          <input
            id='grams_knit'
            type='text'
            value={projectDetails?.est_grams_needed}
            onChange={(event) =>
              dispatch({ type: 'EDIT_PROJECT_DETAILS', payload: { est_grams_needed: event.target.value } })
            }
          />
        </label> */}
        <button type='submit' onClick={() => handleSubmit(projectDetails.id)}>
          Submit Changes
        </button>
      </form>
    </div>
  );
}

export default EditProject;
