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

  console.log('check designers', designers);
  console.log('check types', types);
  console.log('check difficultys', difficultys);
  console.log('check weights store', weights);

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
    image: '',
  });

  const handleNewPattern = (event) => {
    if (event.target.id === 'pattern_title') {
      setNewPattern({ ...newPattern, pattern_title: event.target.value });
    } else if (event.target.id === 'designer_name') {
      setNewPattern({ ...newPattern, designer_name: event.target.value });
    } else if (event.target.id === 'pattern_type') {
      setNewPattern({ ...newPattern, pattern_type: event.target.value });
    } else if (event.target.id === 'difficulty_level') {
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

  const addPattern = () => {
    console.log('submit pattern was clicked');
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
              setNewPattern({
                ...newPattern,
                image: result.info.secure_url,
              });
            }
          }
        )
        .open();
  };

  return (
    <>
      <h1>Add Pattern</h1>
      <div className='pattern-form'>
        <form onSubmit={addPattern}>
          <input
            placeholder='Pattern title'
            id='pattern_title'
            value={newPattern.pattern_title}
            onChange={handleNewPattern}
          />
          <select id='designer_name' value={newPattern.designer_name} onChange={handleNewPattern}>
            <option defaultValue>Select designer</option>
            {designers.map((designer) => {
              return (
                <option key={designer.id} value={designer.id}>
                  {designer.name}
                </option>
              );
            })}
          </select>
          <select id='pattern_type' value={newPattern.pattern_type} onChange={handleNewPattern}>
            <option defaultValue>Select pattern type</option>
            {types.map((type) => {
              return (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              );
            })}
          </select>
          <select id='difficulty_level' value={newPattern.difficulty_level} onChange={handleNewPattern}>
            <option defaultValue>Select difficulty level</option>
            {difficultys.map((difficulty) => {
              return (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.level}
                </option>
              );
            })}
          </select>
          <select id='yarn_weight' value={newPattern.yarn_weight} onChange={handleNewPattern}>
            <option defaultValue>Recommended yarn weight</option>
            {weights.map((weight) => {
              return (
                <option key={weight.id} value={weight.id}>
                  {weight.weight}
                </option>
              );
            })}
          </select>
          <input placeholder='Pattern notes' id='notes' value={newPattern.notes} onChange={handleNewPattern} />
          <h2>Upload Image</h2>
          {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
          <button type='button' onClick={openWidget}>
            Pick File
          </button>
          <button type='submit'>Add Pattern</button>
          <button onClick={cancel}>Cancel</button>
        </form>
      </div>
    </>
  );
}

export default AddPattern;
