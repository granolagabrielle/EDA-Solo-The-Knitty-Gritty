import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Button from '@mui/joy/Button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

function PatternItem({ pattern }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const viewDetails = (patternId) => {
    history.push(`/pattern/${patternId}`);
  };

  const markFavorite = () => {
    // console.log('markFavorite clicked');
    console.log('check patternId', pattern.id);
    if (pattern.isFavorite === false) {
      dispatch({ type: 'FAVORITE_PATTERN_INVENTORY', payload: pattern.id });
    } else if (pattern.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_PATTERN_INVENTORY', payload: pattern.id });
      dispatch({ type: 'FETCH_FAVORITE_PATTERNS' });
    }
    return pattern.isFavorite;
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
          } else if (i === imageArray.length - 1) {
            console.log('IMAGE LAST...', img);
            myMultipleImagesArray.push(img.substring(1));
          } else {
            console.log('IMAGE IN BETWEEN...', img);
            myMultipleImagesArray.push(img.substring(1, img.length - 1));
          }
        }
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
        key={pattern.id}
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
                  {pattern.pattern_title}
                </Link>
              </Typography>
              <Typography level='body-sm'>{pattern.name}</Typography>
            </div>
            <IconButton
              size='sm'
              variant='soft'
              color={pattern.isFavorite ? 'danger' : 'neutral'}
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
            <img src={imageClean(pattern)} loading='lazy' alt='' />
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
                  Some text
                </Link>
              </Typography>
              <Typography level='body-sm'>Some text</Typography>
            </div>
            <Button
              sx={{ ml: 'auto' }}
              style={{ backgroundColor: 'darkslategray' }}
              onClick={() => viewDetails(pattern.id)}
            >
              Details
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default PatternItem;