import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

function PatternDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const patternDetails = useSelector((store) => store.patterns.patternDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: params.id });
  }, []);

  const deletePattern = () => {
    dispatch({ type: 'DELETE_PATTERN', payload: params.id });
    history.push('/patterns');
  };

  const returnToPatterns = () => {
    history.push('/patterns');
  };

  const editDetails = (patternId) => {
    history.push(`/edit-pattern/${patternId}`);
  };

  const markFavorite = (patternId) => {
    console.log('check patternId', patternId);
    if (patternDetails.isFavorite === false) {
      dispatch({ type: 'FAVORITE_PATTERN', payload: { patternId } });
      dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: patternId });
    } else if (patternDetails.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_PATTERN', payload: { patternId } });
      dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: patternId });
    }
    return patternDetails.isFavorite;
  };

  return (
    <>
      <h1>Pattern Details Page</h1>
      <p>{patternDetails.pattern_title}</p>
      <IconButton onClick={() => editDetails(patternDetails.id)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => markFavorite(patternDetails.id)}>
        <FavoriteIcon />
      </IconButton>
      <button onClick={() => deletePattern(patternDetails.id)}>Delete Pattern</button>
      <button onClick={returnToPatterns}>Back to Inventory</button>
    </>
  );
}

export default PatternDetails;
