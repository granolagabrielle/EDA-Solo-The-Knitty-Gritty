import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/joy/IconButton';
import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import './YarnDetails.css';

function YarnDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const yarnDetails = useSelector((store) => store.yarns.yarnDetails);
  // console.log('check multiple pictures', yarnDetails?.image?.substring(2, yarnDetails?.image?.length - 2).split(','));

  useEffect(() => {
    dispatch({ type: 'FETCH_YARN_DETAILS', payload: params.id });
    dispatch({ type: 'CLEAR_YARN_DETAILS' });
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
    let myMultipleImagesArray = [];
    if (images?.image?.includes('[')) {
      let imageArray = images?.image?.substring(2, images?.image?.length - 2).split(',');

      if (imageArray.length >= 2) {
        for (let i = 0; i < imageArray.length; i++) {
          let img = imageArray[i];
          if (i === 0) {
            myMultipleImagesArray.push(img.substring(0, img.length - 1));
          } else if (i === imageArray.length - 1) {
            myMultipleImagesArray.push(img.substring(1));
          } else {
            myMultipleImagesArray.push(img.substring(1, img.length - 1));
          }
        }
      } else if (imageArray.length === 1) {
        let image1 = imageArray[0];
        myMultipleImagesArray.push(image1);
      } else {
      }
    } else {
      myMultipleImagesArray.push(images?.image);
    }

    console.log('My Multi Images', myMultipleImagesArray);
    return myMultipleImagesArray;
  };

  return (
    <>
      <Box sx={{ minHeight: 75, display: 'flex', justifyContent: 'left', alignItems: 'center', margin: 3 }}>
        <Button style={{ backgroundColor: 'darkslategray' }} onClick={returnToYarn}>
          Back to Inventory
        </Button>
      </Box>
      <Box
        key={yarnDetails.id}
        sx={{ minHeight: 100, display: 'flex', justifyContent: 'left', alignItems: 'center', margin: 3 }}
      >
        {yarnDetails.name} {yarnDetails.yarn_title}
        <Box>
          {yarnDetails.isFavorite ? (
            <IconButton
              aria-label='Add to favorites'
              size='sm'
              variant='soft'
              color='danger'
              sx={{ ml: 'auto' }}
              onClick={() => markFavorite(yarnDetails.id)}
            >
              <FavoriteBorder color='danger' />
            </IconButton>
          ) : (
            <IconButton
              size='sm'
              variant='soft'
              color='neutral'
              sx={{ ml: 'auto' }}
              onClick={() => markFavorite(yarnDetails.id)}
            >
              <FavoriteBorder color='danger' />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        className='yarn-container'
        sx={{ minHeight: 75, display: 'flex', justifyContent: 'left', alignItems: 'center', margin: 3 }}
      >
        <Card
          className='container-card'
          variant='outlined'
          sx={(theme) => ({
            width: 270,
            height: 410, // Set the fixed height here
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'transform 0.3s, border 0.3s',
            '&:hover': {
              borderColor: theme.vars.palette.primary.outlinedHoverBorder,
              transform: 'translateY(-2px)',
            },
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>some text</Typography>
              <Typography level='body-sm'>some text</Typography>
            </div>
          </Box>

          <AspectRatio
            ratio='3/4' // Set the aspect ratio for the phone photo size
            sx={{
              width: '100%',
              height: 'auto',
            }}
          >
            <img src={imageClean(yarnDetails)} loading='lazy' alt='' />
          </AspectRatio>
        </Card>

        <Card
          className='container-card'
          variant='outlined'
          sx={(theme) => ({
            width: 270,
            height: 410, // Set the fixed height here
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'transform 0.3s, border 0.3s',
            '&:hover': {
              borderColor: theme.vars.palette.primary.outlinedHoverBorder,
              transform: 'translateY(-2px)',
            },
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>Yarn details</Typography>
            </div>
            <IconButton
              size='sm'
              variant='soft'
              color={'neutral'}
              sx={{ ml: 'auto', zIndex: 2 }}
              onClick={() => editDetails(yarnDetails.id)}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>Grams in stash</Typography>
              <Typography level='body-sm'>{yarnDetails.skeins * yarnDetails.skein_grams}</Typography>
              <Typography level='title-lg'>Fiber content</Typography>
              <Typography level='body-sm'>{yarnDetails.fiber}</Typography>
              <Typography level='title-lg'>Yarn weight</Typography>
              <Typography level='body-sm'>{yarnDetails.weight}</Typography>
              <Typography level='title-lg'>Yarn notes</Typography>
              <Typography level='body-sm'>{yarnDetails.notes}</Typography>
            </div>
          </Box>
        </Card>
      </Box>
      <Box
        id='bottom-button-box'
        sx={{ minHeight: 75, display: 'flex', justifyContent: 'left', alignItems: 'center', margin: 3 }}
      >
        <Button style={{ backgroundColor: 'darkslategray' }} onClick={() => deleteYarn(yarnDetails.id)}>
          Delete Yarn
        </Button>
      </Box>
    </>
  );
}

export default YarnDetails;
