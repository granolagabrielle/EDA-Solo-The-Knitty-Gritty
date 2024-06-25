import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

function YarnDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const yarnDetails = useSelector((store) => store.yarns.yarnDetails);
  console.log('check yarnDetails', yarnDetails);
  console.log('check favorite status', yarnDetails.isFavorite);
  // console.log('check multiple pictures', yarnDetails?.image?.substring(2, yarnDetails?.image?.length - 2).split(','));

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
    console.log('check yarnId', yarnId);
    if (yarnDetails.isFavorite === false) {
      dispatch({ type: 'FAVORITE_YARN', payload: { yarnId } });
      dispatch({ type: 'FETCH_YARN_DETAILS', payload: yarnId });
    } else if (yarnDetails.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_YARN', payload: { yarnId } });
      dispatch({ type: 'FETCH_YARN_DETAILS', payload: yarnId });
    }
    return yarnDetails.isFavorite;
  };

  const imageClean = (images) => {
    console.log('Images', images.image);
    let myMultipleImagesArray = [];
    if (images?.image?.includes('[')) {
      console.log('Yes, it does!!!!');
      let imageArray = images?.image?.substring(2, images?.image?.length - 2).split(',');
      console.log('Image Array', imageArray);

      if (imageArray.length >= 2) {
        console.log(' More than 2 images...');
       for (let i = 0; i < imageArray.length; i++) {
        let img = imageArray[i];
        if (i === 0) {
          console.log('IMAGE 1', img);
          myMultipleImagesArray.push(img.substring(0, img.length - 1));
        } else if (i === imageArray.length -1 ) {
          console.log('IMAGE LAST...', img);
          myMultipleImagesArray.push(img.substring(1));
        } else {
          console.log('IMAGE IN BETWEEN...', img);
          myMultipleImagesArray.push(img.substring(1, img.length - 1));
        }
       }
        // let image1 = imageArray[0];
        // console.log('IMAGE 1', image1);
        // let image2 = imageArray[1];
        // console.log('IMAGE 2', image2);

        // myMultipleImagesArray.push(image1.substring(0, image1.length - 1));
        // myMultipleImagesArray.push(image2.substring(1));
      } else if (imageArray.length === 1) {
        let image1 = imageArray[0];
        console.log('handle one image new way', image1);
        myMultipleImagesArray.push(image1);
      } else {
        console.log('Something else needs handling...');
      }
    } else {
      console.log('No, just one image');
      myMultipleImagesArray.push(images?.image);
    }

    console.log('My Multi Images', myMultipleImagesArray);
    return myMultipleImagesArray;
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
      {/* <IconButton onClick={() => markFavorite(yarnDetails.id)}>
        <FavoriteIcon />
      </IconButton> */}
      {yarnDetails.isFavorite ? (
        <IconButton
          size='sm'
          variant='soft'
          color='danger'
          sx={{ ml: 'auto' }}
          onClick={() => markFavorite(yarnDetails.id)}
        >
          <FavoriteBorderRoundedIcon color='danger' />
        </IconButton>
      ) : (
        <IconButton
          size='sm'
          variant='soft'
          color='neutral'
          sx={{ ml: 'auto' }}
          onClick={() => markFavorite(yarnDetails.id)}
        >
          <FavoriteBorderRoundedIcon color='danger' />
        </IconButton>
      )}
      <button onClick={() => deleteYarn(yarnDetails.id)}>Delete Yarn</button>
      <button onClick={returnToYarn}>Back to Inventory</button>
      <div>
        {imageClean(yarnDetails)?.map((image, i) => (
          <img key={i} src={image} />
        ))}
      </div>
    </>
  );
}

export default YarnDetails;
