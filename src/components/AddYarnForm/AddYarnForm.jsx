import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useScript } from '../../hooks/useScript';

function AddYarn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const fibers = useSelector((store) => store.fiber);
  const brands = useSelector((store) => store.brands);
  const weights = useSelector((store) => store.weights);

  useEffect(() => {
    dispatch({ type: 'FETCH_FIBERS' });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_WEIGHTS' });
  }, []);

  let [newYarn, setNewYarn] = useState({
    brand: '',
    yarn_title: '',
    skeins: '',
    fiber: '',
    weight: '',
    skein_grams: '',
    dye_lot: '',
    user_id: '',
    notes: '',
    image: '',
  });

  const handleNewYarn = (event) => {
    if (event.target.id === 'brand') {
      setNewYarn({ ...newYarn, brand: event.target.value });
    } else if (event.target.id === 'fiber') {
      setNewYarn({ ...newYarn, fiber: event.target.value });
    } else if (event.target.id === 'yarn_title') {
      setNewYarn({ ...newYarn, yarn_title: event.target.value });
    } else if (event.target.id === 'skeins') {
      setNewYarn({ ...newYarn, skeins: event.target.value });
    } else if (event.target.id === 'weight') {
      setNewYarn({ ...newYarn, weight: event.target.value });
    } else if (event.target.id === 'skein_grams') {
      setNewYarn({ ...newYarn, skein_grams: event.target.value });
    } else if (event.target.id === 'dye_lot') {
      setNewYarn({ ...newYarn, dye_lot: event.target.value });
    } else if (event.target.id === 'notes') {
      setNewYarn({ ...newYarn, notes: event.target.value });
    } else {
      setNewYarn({ ...newYarn, user_id: event.target.user.id });
    }
    return newYarn;
  };

  const addYarn = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_YARN', payload: newYarn });
    dispatch({ type: 'FETCH_YARNS' });
    history.push('/yarn');
  };

  const cancel = () => {
    history.push('/yarn');
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
              setNewYarn({
                ...newYarn,
                image: result.info.secure_url,
              });
            }
          }
        )
        .open();
  };

  return (
    <>
      <h1>Add Yarn</h1>
      <div className='yarn-form'>
        <form onSubmit={addYarn}>
          <select id='brand' value={newYarn.brand} onChange={handleNewYarn}>
            <option defaultValue>Select yarn brand</option>
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
          <input placeholder='Title' id='yarn_title' value={newYarn.yarn_title} onChange={handleNewYarn} />
          <select id='fiber' value={newYarn.fiber} onChange={handleNewYarn}>
            <option defaultValue>Select fiber content</option>
            {fibers.map((fiber) => {
              return (
                <option key={fiber.id} value={fiber.id}>
                  {fiber.fiber}
                </option>
              );
            })}
          </select>
          <select id='weight' value={newYarn.weight} onChange={handleNewYarn}>
            <option defaultValue>Select yarn weight</option>
            {weights.map((weight) => {
              return (
                <option key={weight.id} value={weight.id}>
                  {weight.weight}
                </option>
              );
            })}
          </select>
          <input placeholder='Dye lot' id='dye_lot' value={newYarn.dye_lot} onChange={handleNewYarn} />
          <input placeholder='Total skeins' id='skeins' value={newYarn.skeins} onChange={handleNewYarn} />
          <input placeholder='Grams in skein' id='skein_grams' value={newYarn.skein_grams} onChange={handleNewYarn} />
          <input placeholder='Yarn notes' id='notes' value={newYarn.notes} onChange={handleNewYarn} />
          <h2>Upload Image</h2>
          {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
          <button type='button' onClick={openWidget}>
            Pick File
          </button>
          <button type='submit'>Add Yarn</button>
          <button onClick={cancel}>Cancel</button>
        </form>
      </div>
    </>
  );
}

export default AddYarn;
