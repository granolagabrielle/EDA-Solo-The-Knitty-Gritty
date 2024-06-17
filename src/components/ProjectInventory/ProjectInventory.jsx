import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';

function ProjectInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projects.projectInventory);
  console.log('checking projects', projects);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS' });
  }, []);

  return (
    <>
      <h1>Project Tracking</h1>
      <section>
        {projects.map((project) => {
          return (
            <div key={project.id}>
              <p>{project.title}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ProjectInventory;
