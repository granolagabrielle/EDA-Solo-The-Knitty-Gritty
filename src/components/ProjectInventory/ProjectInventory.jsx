import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ProjectInventory.css';

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
      <section className='project-container'>
        {projects.map((project) => {
          return (
            <Card
              className='project-card'
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'blanchedalmond' }}
              key={project.id}
              onClick={() => viewDetails(project.id)}
            >
              <CardContent className='card-content'>
                <img style={{ width: '15rem', height: '20rem' }} src={project.image} alt={project.pattern_title} />
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                  {project.pattern_title}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}

export default ProjectInventory;
