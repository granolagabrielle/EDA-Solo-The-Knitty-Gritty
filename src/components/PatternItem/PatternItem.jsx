import { useDispatch } from 'react-redux';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Button from '@mui/joy/Button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useState } from 'react';
import Lightbox from '../AdobeLightbox/Lightbox';

function PatternItem({ pattern }) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);

  const deletePattern = (patternId) => {
    dispatch({ type: 'DELETE_PATTERN', payload: patternId });
    dispatch({ type: 'REMOVE_FAVORITE_PATTERN_INVENTORY', payload: patternId });
    dispatch({ type: 'FETCH_FAVORITE_PATTERNS' });
  };

  const toggleCard = (patternId) => {
    setToggle(!toggle);
  };

  const markFavorite = () => {
    if (pattern.isFavorite === false) {
      dispatch({ type: 'FAVORITE_PATTERN_INVENTORY', payload: pattern.id });
    } else if (pattern.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_PATTERN_INVENTORY', payload: pattern.id });
      dispatch({ type: 'FETCH_FAVORITE_PATTERNS' });
    }
    return pattern.isFavorite;
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
    return myMultipleImagesArray[0];
  };

  return (
    <>
      {toggle ? (
        <Box
          key={pattern.id}
          sx={{ minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}
        >
          <Card
            className='project-card'
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
              <Button
                sx={{ ml: 'auto' }}
                style={{ backgroundColor: 'darkslategray' }}
                onClick={() => toggleCard(pattern.id)}
              >
                Details
              </Button>
            </Box>
          </Card>
        </Box>
      ) : (
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
            <br></br>
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
                    Pattern type
                  </Link>
                </Typography>
                <Typography level='body-sm'>{pattern.type}</Typography>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Difficulty level
                  </Link>
                </Typography>
                <Typography level='body-sm'>{pattern.level}</Typography>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Recommended yarn weight
                  </Link>
                </Typography>
                <Typography level='body-sm'>{pattern.weight}</Typography>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Pattern notes
                  </Link>
                </Typography>
                <Typography level='body-sm'>{pattern.notes}</Typography>
              </div>
              <br></br>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Lightbox />
              <IconButton onClick={() => toggleCard(pattern.id)}>
                <ArrowBackRoundedIcon />
              </IconButton>
              <IconButton onClick={() => deletePattern(pattern.id)}>
                <DeleteForeverRoundedIcon />
              </IconButton>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}

export default PatternItem;
