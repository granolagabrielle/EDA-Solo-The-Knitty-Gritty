import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useScript } from '../../hooks/useScript';
import './AddYarnForm.css';

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
      <form onSubmit={addYarn}>
        <div className='container'>
          <div className='mb-3 col-lg-6'>
            <h1>Add Yarn</h1>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-6'>
              <label for='select' className='form-label'>
                Select yarn brand
              </label>
              <select className='form-select' id='brand' value={newYarn.brand} onChange={handleNewYarn}>
                {brands.map((brand) => {
                  return (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='mb-3 col-lg-6'>
              <label for='input' className='form-label'>
                Yarn title
              </label>
              <input
                className='form-control'
                placeholder='Title'
                id='yarn_title'
                value={newYarn.yarn_title}
                onChange={handleNewYarn}
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-6'>
              <label for='select' className='form-label'>
                Select fiber content
              </label>
              <select className='form-select' id='fiber' value={newYarn.fiber} onChange={handleNewYarn}>
                {fibers.map((fiber) => {
                  return (
                    <option key={fiber.id} value={fiber.id}>
                      {fiber.fiber}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='mb-3 col-lg-6'>
              <label for='select' className='form-label'>
                Select yarn weight
              </label>
              <select className='form-select' id='weight' value={newYarn.weight} onChange={handleNewYarn}>
                {weights.map((weight) => {
                  return (
                    <option key={weight.id} value={weight.id}>
                      {weight.weight}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-4'>
              <label for='input' className='form-label'>
                Yarn Dye Lot
              </label>
              <input
                className='form-control'
                placeholder='Dye lot'
                id='dye_lot'
                value={newYarn.dye_lot}
                onChange={handleNewYarn}
              />
            </div>
            <div className='mb-3 col-lg-4'>
              <label for='input' className='form-label'>
                Total Skeins in Stash
              </label>
              <input
                className='form-control'
                placeholder='Total skeins'
                id='skeins'
                value={newYarn.skeins}
                onChange={handleNewYarn}
              />
            </div>
            <div className='mb-3 col-lg-4'>
              <label for='input' className='form-label'>
                Grams in Each Skein
              </label>
              <input
                className='form-control'
                placeholder='Grams in skein'
                id='skein_grams'
                value={newYarn.skein_grams}
                onChange={handleNewYarn}
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-6'>
              <label for='input' className='form-label'>
                Yarn Notes
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Yarn notes'
                id='notes'
                value={newYarn.notes}
                onChange={handleNewYarn}
              />
            </div>
            <div className='col-lg-6 mb-3'></div>
          </div>

          <div className='row'>
            <div className='mb-3 col-lg-6'>
              <div class='col-auto'>
                {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
                <button onClick={openWidget} type='button' class='btn btn-secondary'>
                  Choose photo
                </button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-6'>
              <button type='submit' class='btn btn-secondary' id='submit-btn'>
                Add Yarn
              </button>
              <button onClick={cancel} class='btn btn-secondary'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddYarn;
