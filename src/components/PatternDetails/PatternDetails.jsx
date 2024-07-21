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
    dispatch({ type: 'CLEAR_PATTERN_DETAILS' });
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
    if (patternDetails.isFavorite === false) {
      dispatch({ type: 'FAVORITE_PATTERN', payload: { patternId } });
      dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: patternId });
    } else if (patternDetails.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_PATTERN', payload: { patternId } });
      dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: patternId });
    }
    return patternDetails.isFavorite;
  };

  const imageClean = (images) => {
    // console.log('Images', images.image);
    let myMultipleImagesArray = [];
    if (images?.image?.includes('[')) {
      // console.log('Yes, it does!!!!');
      let imageArray = images?.image?.substring(2, images?.image?.length - 2).split(',');
      // console.log('Image Array', imageArray);

      if (imageArray.length >= 2) {
        // console.log(' More than 2 images...');
        for (let i = 0; i < imageArray.length; i++) {
          let img = imageArray[i];
          if (i === 0) {
            // console.log('IMAGE 1', img);
            myMultipleImagesArray.push(img.substring(0, img.length - 1));
          } else if (i === imageArray.length - 1) {
            // console.log('IMAGE LAST...', img);
            myMultipleImagesArray.push(img.substring(1));
          } else {
            // console.log('IMAGE IN BETWEEN...', img);
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
        // console.log('handle one image new way', image1);
        myMultipleImagesArray.push(image1);
      } else {
        // console.log('Something else needs handling...');
      }
    } else {
      // console.log('No, just one image');
      myMultipleImagesArray.push(images?.image);
    }

    // console.log('My Multi Images', myMultipleImagesArray);
    return myMultipleImagesArray;
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
      <div>
        {imageClean(patternDetails)?.map((image, i) => (
          <img key={i} src={image} />
        ))}
      </div>
    </>
  );
}

export default PatternDetails;
