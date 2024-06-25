import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import * as React from 'react';
// joy
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Button from '@mui/joy/Button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import './YarnItem.css';

function YarnItem({ yarn }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const viewDetails = (yarnId) => {
    history.push(`/yarn/${yarnId}`);
  };

  const markFavorite = () => {
    console.log('check yarnId', yarn.id);
    if (yarn.isFavorite === false) {
      dispatch({ type: 'FAVORITE_YARN_INVENTORY', payload: yarn.id });
    } else if (yarn.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_YARN_INVENTORY', payload: yarn.id });
      dispatch({ type: 'FETCH_FAVORITE_YARNS' });
    }
    return yarn.isFavorite;
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
    return myMultipleImagesArray[0];
  };

  return (
    <>
      <Box
        key={yarn.id}
        sx={{ minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}
      >
        <Card
          variant='outlined'
          sx={(theme) => ({
            width: 270,
            height: 465, // Set the fixed height here
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
              <Typography level='title-lg'>
                <Link
                  overlay
                  underline='none'
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  {yarn.name}
                </Link>
              </Typography>
              <Typography level='body-sm'>{yarn.location}</Typography>
            </div>
            <IconButton
              size='sm'
              variant='soft'
              color={yarn.isFavorite ? 'danger' : 'neutral'}
              sx={{ ml: 'auto', zIndex: 2 }}
              onClick={markFavorite}
            >
              <FavoriteBorderRoundedIcon color='danger' />
            </IconButton>
          </Box>
         
            <AspectRatio
            ratio='3/4' // Set the aspect ratio for the phone photo size
            sx={{
              width: '100%',
              height: 'auto',
            }}
          >
            <img src={imageClean(yarn)} loading='lazy' alt='' />
          </AspectRatio>
       
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>
                <Link
                  overlay
                  underline='none'
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  {yarn.weight} weight
                </Link>
              </Typography>
              <Typography level='body-sm'>{yarn.skein_grams * yarn.skeins} grams in stash</Typography>
            </div>
            <Button
              sx={{ ml: 'auto' }}
              style={{ backgroundColor: 'darkslategray' }}
              onClick={() => viewDetails(yarn.id)}
            >
              Details
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default YarnItem;
