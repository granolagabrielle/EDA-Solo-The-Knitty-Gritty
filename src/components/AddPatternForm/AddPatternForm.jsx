import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useScript } from '../../hooks/useScript';

function AddPattern() {
  const history = useHistory();
  const dispatch = useDispatch();
  const designers = useSelector((store) => store.designers);
  const types = useSelector((store) => store.patternTypes);
  const difficultys = useSelector((store) => store.difficultys);
  const weights = useSelector((store) => store.weights);

  useEffect(() => {
    dispatch({ type: 'FETCH_DESIGNERS' });
    dispatch({ type: 'FETCH_PATTERN_TYPES' });
    dispatch({ type: 'FETCH_DIFFICULTY_LEVELS' });
    dispatch({ type: 'FETCH_WEIGHTS' });
  }, []);

  let [newPattern, setNewPattern] = useState({
    pattern_title: '',
    designer_name: '',
    pattern_type: '',
    difficulty_level: '',
    yarn_weight: '',
    user_id: '',
    notes: '',
    image: [],
  });

  const handleNewPattern = (event) => {
    if (event.target.id === 'pattern_title') {
      setNewPattern({ ...newPattern, pattern_title: event.target.value });
    } else if (event.target.id === 'designer_name') {
      setNewPattern({ ...newPattern, designer_name: event.target.value });
    } else if (event.target.id === 'pattern_type') {
      setNewPattern({ ...newPattern, pattern_type: event.target.value });
    } else if (event.target.id === 'difficulty_level') {
      console.log('check diff level etv', event.target.value);
      setNewPattern({ ...newPattern, difficulty_level: event.target.value });
    } else if (event.target.id === 'yarn_weight') {
      setNewPattern({ ...newPattern, yarn_weight: event.target.value });
    } else if (event.target.id === 'notes') {
      setNewPattern({ ...newPattern, notes: event.target.value });
    } else {
      setNewPattern({ ...newPattern, user_id: event.target.user.id });
    }
    return newPattern;
  };

  const addPattern = (event) => {
    event.preventDefault();
    console.log('check newPattern', newPattern);
    dispatch({ type: 'ADD_PATTERN', payload: newPattern });
    dispatch({ type: 'FETCH_PATTERNS' });
    history.push('/patterns');
  };

  const cancel = () => {
    history.push('/patterns');
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
              console.log('check url', result.info.secure_url);
              // setNewPattern({
              //   ...newPattern,
              //   image: result.info.secure_url,
              // });
              let myPatterncopy = { ...newPattern };
              myPatterncopy.image.push(result.info.secure_url);
              setNewPattern(myPatterncopy);
            }
          }
        )
        .open();
  };

  return (
    <>
      <h1 className='header'>Add Pattern</h1>
      <div className='pattern-form'>
        <form onSubmit={addPattern}>
          <div className='container'>
            <div className='row'>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Pattern title</label>
                <input
                  className='form-control'
                  placeholder='Title'
                  id='pattern_title'
                  value={newPattern.pattern_title}
                  onChange={handleNewPattern}
                />
              </div>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Select pattern designer</label>
                <select
                  className='form-select'
                  id='designer_name'
                  value={newPattern.designer_name}
                  onChange={handleNewPattern}
                >
                  {designers.map((designer) => {
                    return (
                      <option key={designer.id} value={designer.id}>
                        {designer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Select pattern type</label>
                <select
                  className='form-select'
                  id='pattern_type'
                  value={newPattern.pattern_type}
                  onChange={handleNewPattern}
                >
                  {types.map((type) => {
                    return (
                      <option defaultValue='test' key={type.id} value={type.id}>
                        {type.type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3 col-lg-6'>
                <label className='form-label'>Select difficulty level</label>
                <select
                  className='form-select'
                  id='difficulty_level'
                  value={newPattern.difficulty_level}
                  onChange={handleNewPattern}
                >
                  {difficultys.map((difficulty) => {
                    return (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.level}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='mb-3 col-lg-4'>
                <label className='form-label'>Recommended yarn weight</label>
                <select
                  className='form-control'
                  id='yarn_weight'
                  value={newPattern.yarn_weight}
                  onChange={handleNewPattern}
                >
                  {weights.map((weight) => {
                    return (
                      <option key={weight.id} value={weight.id}>
                        {weight.weight}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3 col-lg-8'>
                <label className='form-label'>Pattern Notes</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Pattern notes'
                  id='notes'
                  value={newPattern.notes}
                  onChange={handleNewPattern}
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
                  Add pattern
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

export default AddPattern;
