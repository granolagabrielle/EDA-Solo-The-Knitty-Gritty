import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function EditPattern() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const patternDetails = useSelector((store) => store.patterns.patternDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: params.id });
  }, []);

  const handleSubmit = (patternId) => {
    dispatch({ type: 'EDIT_PATTERN', payload: { patternId: patternDetails.id, details: patternDetails } });
    history.push(`/patterns`);
  };

  return (
    <div>
      <h1 className='header'>Edit {patternDetails?.pattern_title}</h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='mb-3 col-lg-4'>
              <label for='input' className='form-label'>
                Total grams:
              </label>
              <input
                id='pattern-notes'
                type='text'
                value={patternDetails?.notes}
                onChange={(event) => dispatch({ type: 'EDIT_PATTERN_DETAILS', payload: { notes: event.target.value } })}
              />
            </div>
            <div className='mb-3 col-lg-4'>
              <button type='submit' onClick={() => handleSubmit(patternDetails.id)}>
                Submit Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPattern;
