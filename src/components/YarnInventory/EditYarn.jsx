import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function EditYarn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const yarnDetails = useSelector((store) => store.yarns.yarnDetails);
  console.log('checking yarn details', yarnDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARN_DETAILS', payload: params.id });
  }, []);

  const handleSubmit = (yarnId) => {
    console.log('check changes', yarnDetails);
    dispatch({ type: 'EDIT_YARN', payload: { yarnId: yarnDetails.id, details: yarnDetails } });
    history.push(`/yarn/${yarnId}`);
  };

  return (
    <div>
      <h1>Edit {yarnDetails?.yarn_title}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Total Skeins:
          <input
            id='skeins'
            value={yarnDetails?.skeins}
            onChange={(event) => dispatch({ type: 'EDIT_YARN_DETAILS', payload: { skeins: event.target.value } })}
          />
        </label>
        <label>
          Grams in Skein:
          <input
            id='skein_grams'
            value={yarnDetails?.skein_grams}
            onChange={(event) => dispatch({ type: 'EDIT_YARN_DETAILS', payload: { skein_grams: event.target.value } })}
          />
        </label>
        <label>
          Notes:
          <input
            id='yarn-notes'
            type='text'
            value={yarnDetails?.notes}
            onChange={(event) => dispatch({ type: 'EDIT_YARN_DETAILS', payload: { notes: event.target.value } })}
          />
        </label>
        <button type='submit' onClick={() => handleSubmit(yarnDetails.id)}>
          Submit Changes
        </button>
      </form>
    </div>
  );
}

export default EditYarn;
