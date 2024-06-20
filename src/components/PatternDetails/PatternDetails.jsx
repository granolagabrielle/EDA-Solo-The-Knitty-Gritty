import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function PatternDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const patternDetails = useSelector((store) => store.patterns.patternDetails);

  console.log('checking patternDetails', patternDetails);

  useEffect(() => {
    console.log(`GET params.id ${params.id}`);
    dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: params.id });
  }, []);

  const deletePattern = () => {
    dispatch({ type: 'DELETE_PATTERN', payload: params.id });
    console.log('check deleted id', params.id);
    history.push('/patterns');
  };

  const returnToPatterns = () => {
    history.push('/patterns');
  };

  const editDetails = (patternId) => {
    history.push(`/edit-pattern/${patternId}`);
  };

  return (
    <>
      <h1>Pattern Details Page</h1>
      <p>{patternDetails.pattern_title}</p>
      <IconButton onClick={() => editDetails(patternDetails.id)}>
        <EditIcon />
      </IconButton>
      <button onClick={() => deletePattern(patternDetails.id)}>Delete Pattern</button>
      <button onClick={returnToPatterns}>Back to Inventory</button>
    </>
  );
}

export default PatternDetails;
