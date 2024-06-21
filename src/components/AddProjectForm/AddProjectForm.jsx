import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useScript } from '../../hooks/useScript';

function AddProject() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  const patterns = useSelector((store) => store.patterns.patternInventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  let [newProject, setNewProject] = useState({
    pattern_id: '',
    date_started: '',
    notes: '',
    progress: '',
    yarn_id: '',
    user_id: '',
    image: '',
  });

  const handleNewProject = (event) => {
    if (event.target.id === 'pattern_id') {
      setNewProject({ ...newProject, pattern_id: event.target.value });
      console.log('check pattern selection', event.target.value);
    } else if (event.target.id === 'date_started') {
      setNewProject({ ...newProject, date_started: event.target.value });
    } else if (event.target.id === 'notes') {
      setNewProject({ ...newProject, notes: event.target.value });
    } else if (event.target.id === 'progress') {
      setNewProject({ ...newProject, progress: event.target.value });
    } else if (event.target.id === 'yarn_id') {
      setNewProject({ ...newProject, yarn_id: event.target.value });
    } else {
      setNewProject({ ...newProject, user_id: event.target.user.id });
    }
    return newProject;
  };

  const AddProject = (event) => {
    event.preventDefault();
    console.log('submit project was clicked');
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    dispatch({ type: 'FETCH_PROJECTS' });
    history.push('/projects');
    console.log('check newProject', newProject);
  };

  const cancel = () => {
    history.push('/projects');
  };

  const openWidget = () => {
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ['local', 'url', 'camera'],
            // cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            cloudName: 'dhh2vptsp',
            // uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
            uploadPreset: 'cvg0hnyy',
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              setNewProject({
                ...newProject,
                image: result.info.secure_url,
              });
            }
          }
        )
        .open();
  };

  return (
    <>
      <h1>Add Project</h1>
      <div className='project-form'>
        <form onSubmit={AddProject}>
          <select id='pattern_id' value={newProject.pattern_id} onChange={handleNewProject}>
            <option defaultValue>Select project pattern</option>
            {patterns.map((pattern) => {
              return (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.pattern_title}
                </option>
              );
            })}
          </select>
          <input type='date' id='date_started' value={newProject.date_started} onChange={handleNewProject} />
          <input placeholder='Project notes' id='notes' value={newProject.notes} onChange={handleNewProject} />
          <input placeholder='Progress' id='progress' value={newProject.progress} onChange={handleNewProject} />
          <select id='yarn_id' value={newProject.yarn_id} onChange={handleNewProject}>
            <option defaultValue>Select project yarn</option>
            {yarns.map((yarn) => {
              return (
                <option key={yarn.id} value={yarn.id}>
                  {yarn.name}
                  {yarn.yarn_title}
                </option>
              );
            })}
          </select>
          <h2>Upload Image</h2>
          {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
          <button type='button' onClick={openWidget}>
            Pick File
          </button>
          <button type='submit'>Add Project</button>
          <button onClick={cancel}>Cancel</button>
        </form>
      </div>
    </>
  );
}

export default AddProject;
