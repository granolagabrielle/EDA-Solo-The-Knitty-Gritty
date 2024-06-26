import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function EditYarn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const yarnDetails = useSelector((store) => store.yarns.yarnDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARN_DETAILS', payload: params.id });
  }, []);

  const handleSubmit = (yarnId) => {
    dispatch({ type: 'EDIT_YARN', payload: { yarnId: yarnDetails.id, details: yarnDetails } });
    history.push(`/yarn`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='mb-3 col-lg-6'>
            <h1>Edit Yarn Details</h1>
            <h3>
              {yarnDetails?.name} {yarnDetails?.yarn_title}
            </h3>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-4'>
              <label for='input' className='form-label'>
                Total Grams:
              </label>
              <input
                className='form-control'
                placeholder='Total grams'
                id='skeins'
                value={yarnDetails?.total_grams}
                onChange={(event) =>
                  dispatch({ type: 'EDIT_YARN_DETAILS', payload: { total_grams: event.target.value } })
                }
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-4'>
              <label for='input' className='form-label'>
                Notes:
              </label>
              <input
                className='form-control'
                placeholder='Yarn notes'
                id='yarn-notes'
                value={yarnDetails?.notes}
                onChange={(event) => dispatch({ type: 'EDIT_YARN_DETAILS', payload: { notes: event.target.value } })}
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-lg-4'>
              <button
                type='submit'
                class='btn btn-secondary'
                id='submit-btn'
                onClick={() => handleSubmit(yarnDetails.id)}
              >
                Submit Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditYarn;
