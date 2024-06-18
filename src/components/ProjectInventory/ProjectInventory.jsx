import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';

function ProjectInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projects.projectInventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS' });
  }, []);

  const viewDetails = (projectId) => {
    history.push(`/project/${projectId}`);
  };

  return (
    <>
      <h1>Project Tracking</h1>
      <section>
        {projects.map((project) => {
          return (
            <div key={project.id} onClick={() => viewDetails(project.id)}>
              <p>{project.pattern_title}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ProjectInventory;
