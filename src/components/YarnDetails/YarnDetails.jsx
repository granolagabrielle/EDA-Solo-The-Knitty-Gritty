import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function YarnDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  const yarnDetails = useSelector((store) => store.yarns.yarnDetails);

  console.log('checking yarns', yarns);

  useEffect(() => {
    console.log(`GET params.id ${params.id}`);
    dispatch({ type: 'FETCH_YARN_DETAILS', payload: params.id });
  }, []);

  const deleteYarn = () => {
    dispatch({ type: 'DELETE_YARN', payload: params.id });
    console.log('check deleted id', params.id);
    history.push('/yarn');
  };

  const returnToYarn = () => {
    history.push('/yarn');
  };

  return (
    <>
      <h1>Yarn Details Page</h1>
      <p>
        {yarnDetails.name}
        {yarnDetails.yarn_title}
      </p>
      <button onClick={() => deleteYarn(yarnDetails.id)}>Delete Yarn</button>
      <button onClick={returnToYarn}>Back to Inventory</button>
    </>
  );
}

export default YarnDetails;
