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
    yarn_id: '',
    user_id: '',
    image: [],
    est_grams_needed: '',
    needle_size: '',
  });

  const handleNewProject = (event) => {
    if (event.target.id === 'pattern_id') {
      setNewProject({ ...newProject, pattern_id: event.target.value });
      console.log('check pattern selection', event.target.value);
    } else if (event.target.id === 'date_started') {
      setNewProject({ ...newProject, date_started: event.target.value });
    } else if (event.target.id === 'yarn_id') {
      setNewProject({ ...newProject, yarn_id: event.target.value });
    } else if (event.target.id === 'est_grams_needed') {
      setNewProject({ ...newProject, est_grams_needed: event.target.value });
    } else if (event.target.id === 'needle_size') {
      setNewProject({ ...newProject, needle_size: event.target.value });
    } else {
      setNewProject({ ...newProject, user_id: event.target.user.id });
    }
    return newProject;
  };

  const AddProject = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    dispatch({ type: 'FETCH_PROJECTS' });
    history.push('/projects');
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
              // setNewProject({
              //   ...newProject,
              //   image: result.info.secure_url,
              // });
              console.log('check url', result.info.secure_url);
              let myProjectCopy = { ...newProject };
              myProjectCopy.image.push(result.info.secure_url);
              setNewProject(myProjectCopy);
            }
          }
        )
        .open();
  };

  return (
    <>
      <h1 className='header'>Add Project</h1>
      <div className='project-form'>
        <form onSubmit={AddProject}>
          <div className='container'>
            <div className='row'>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Select pattern</label>
                <select
                  className='form-select'
                  id='pattern_id'
                  value={newProject.pattern_id}
                  onChange={handleNewProject}
                >
                  {patterns.map((pattern) => {
                    return (
                      <option key={pattern.id} value={pattern.id}>
                        {pattern.pattern_title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Date started</label>
                <input
                  className='form-control'
                  type='date'
                  id='date_started'
                  value={newProject.date_started}
                  onChange={handleNewProject}
                />
              </div>
            </div>
            {/* <input placeholder='Project notes' id='notes' value={newProject.notes} onChange={handleNewProject} /> */}
            {/* <input placeholder='Progress' id='progress' value={newProject.progress} onChange={handleNewProject} /> */}
            <div className='row'>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Select project yarn</label>
                <select className='form-select' id='yarn_id' value={newProject.yarn_id} onChange={handleNewProject}>
                  <option defaultValue>Select project yarn</option>
                  {yarns.map((yarn) => {
                    return (
                      <option key={yarn.id} value={yarn.id}>
                        {yarn.name}:{yarn.yarn_title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3 col-lg-3'>
                <label for='input' className='form-label'>
                  Grams of yarn needed
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Grams of yarn needed'
                  id='est_grams_needed'
                  value={newProject.est_grams_needed}
                  onChange={handleNewProject}
                />
              </div>
              <div className='mb-3 col-lg-3'>
                <label for='input' className='form-label'>
                  Needle size
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Needle size'
                  id='needle_size'
                  value={newProject.needle_size}
                  onChange={handleNewProject}
                />
              </div>
            </div>
            <div className='row'>
              <div className='mb-3 col-lg-6'>
                <div className='col-auto'>
                  {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
                  <button onClick={openWidget} type='button' className='btn btn-secondary'>
                    Choose photo
                  </button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='mb-3 col-lg-6'>
                <button type='submit' className='btn btn-secondary' id='submit-btn'>
                  Add project
                </button>
                <button onClick={cancel} className='btn btn-secondary'>
                  Back to inventory
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProject;
