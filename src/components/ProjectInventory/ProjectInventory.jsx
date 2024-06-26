import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './ProjectInventory.css';
import Box from '@mui/joy/Box';
import ProjectItem from '../ProjectItem/ProjectItem';
import './ProjectInventory.css';

function ProjectInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projects.projectInventory);

  console.log('check projects', projects);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS' });
  }, []);

  const addProject = () => {
    history.push(`/addproject`);
  };

  return (
    <>
      <Box className='header' height={50} display='flex' alignItems='center' gap={4} p={12}>
        <h1>Project Tracking</h1>
        {projects.length === 0 ? (
          <h4>
            No projects yet. <strong onClick={addProject}>Add one now?</strong>
          </h4>
        ) : (
          ''
        )}
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            options={projects}
            getOptionLabel={(option) => `${option.project_title}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search projects by pattern'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
            onChange={(event, value) => {
              if (value) {
                history.push(`/projects/${value.id}`);
              }
            }}
          />
        </Stack>
      </Box>
      <section className='project-container'>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}

export default ProjectInventory;
