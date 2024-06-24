import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

function YarnDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const yarnDetails = useSelector((store) => store.yarns.yarnDetails);
  console.log('check yarnDetails', yarnDetails);
  console.log('check favorite status', yarnDetails.isFavorite);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARN_DETAILS', payload: params.id });
  }, []);

  const deleteYarn = () => {
    dispatch({ type: 'DELETE_YARN', payload: params.id });
    history.push('/yarn');
  };

  const returnToYarn = () => {
    history.push('/yarn');
  };

  const editDetails = (yarnId) => {
    history.push(`/edit-yarn/${yarnId}`);
  };

  const markFavorite = (yarnId) => {
    // console.log('check yarnId', yarnId);
    dispatch({ type: 'FAVORITE_YARN', payload: { yarnId } });
    dispatch({ type: 'FETCH_YARN_DETAILS', payload: yarnId });
  };

  return (
    <>
      <h1>Yarn Details Page</h1>
      <p>
        {yarnDetails.name}
        {yarnDetails.yarn_title}
      </p>
      <IconButton onClick={() => editDetails(yarnDetails.id)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => markFavorite(yarnDetails.id)}>
        <FavoriteIcon />
      </IconButton>
      <button onClick={() => deleteYarn(yarnDetails.id)}>Delete Yarn</button>
      <button onClick={returnToYarn}>Back to Inventory</button>
    </>
  );
}

export default YarnDetails;
