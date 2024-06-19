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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('check changes', yarnDetails);
    const modifiedYarnDetails = {
      //   name: yarnDetails.name,
      //   yarn_title: yarnDetails.yarn_title,
      //   skeins: yarnDetails.skeins,
      //   fiber: yarnDetails.fiber,
      //   weight: yarnDetails.weight,
      //   skein_grams: yarnDetails.skein_grams,
      //   dye_lot: yarnDetails.dye_lot,
      notes: yarnDetails.notes,
      //   image: yarnDetails.image,
    };
    dispatch({ type: 'EDIT_YARN', payload: { yarnId: yarnDetails.id, details: modifiedYarnDetails } });
    history.push('/yarn');
  };

  return (
    <div>
      <h1>Edit {yarnDetails?.yarn_title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          id='yarn-notes'
          placeholder='Yarn Notes'
          type='text'
          value={yarnDetails?.notes}
          onChange={(event) => dispatch({ type: 'EDIT_YARN_DETAILS', payload: { notes: event.target.value } })}
        />
        <button type='submit'>Submit Changes</button>
      </form>
    </div>
  );
}

export default EditYarn;
