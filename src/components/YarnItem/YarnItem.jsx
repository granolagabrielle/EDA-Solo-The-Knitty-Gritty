import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import * as React from 'react';
import { useState } from 'react';
// joy
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
import EditIcon from '@mui/icons-material/Edit';
import './YarnItem.css';

function YarnItem({ yarn, home }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);

  const deleteYarn = (yarnId) => {
    dispatch({ type: 'DELETE_YARN', payload: yarnId });
    dispatch({ type: 'REMOVE_FAVORITE_YARN_INVENTORY', payload: yarnId });
    dispatch({ type: 'FETCH_FAVORITE_YARNS' });
  };

  const editDetails = (yarnId) => {
    history.push(`/edit-yarn/${yarnId}`);
  };

  const toggleCard = (yarnId) => {
    setToggle(!toggle);
  };

  const markFavorite = () => {
    if (yarn.isFavorite === false) {
      dispatch({ type: 'FAVORITE_YARN_INVENTORY', payload: yarn.id });
      dispatch({ type: 'FETCH_YARNS' });
    } else if (yarn.isFavorite === true) {
      dispatch({ type: 'REMOVE_FAVORITE_YARN_INVENTORY', payload: yarn.id });
      dispatch({ type: 'FETCH_YARNS' });
    }
    return yarn.isFavorite;
  };

  const imageClean = (images) => {
    // console.log('Images', images.image);
    let myMultipleImagesArray = [];
    if (images?.image?.includes('[')) {
      let imageArray = images?.image?.substring(2, images?.image?.length - 2).split(',');
      // console.log('Image Array', imageArray);

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
        console.log('Something else needs handling...');
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
                <Typography level='body-sm'>{yarn.total_grams} grams in stash</Typography>
              </div>
              <Button
                sx={{ ml: 'auto' }}
                style={{ backgroundColor: 'darkslategray' }}
                onClick={() => toggleCard(yarn.id)}
              >
                Details
              </Button>
            </Box>
          </Card>
        </Box>
      ) : (
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
                <Typography level='body-sm'>{yarn.yarn_title}</Typography>
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
                    Yarn weight
                  </Link>
                </Typography>
                <Typography level='body-sm'>{yarn.weight}</Typography>

                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Grams in stash
                  </Link>
                </Typography>
                <Typography level='body-sm'>{yarn.total_grams} grams</Typography>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Fiber content
                  </Link>
                </Typography>
                <Typography level='body-sm'>{yarn.fiber}</Typography>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Dye lot
                  </Link>
                </Typography>
                <Typography level='body-sm'>{yarn.dye_lot}</Typography>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Yarn notes
                  </Link>
                </Typography>
                <Typography level='body-sm'>{yarn.notes}</Typography>
              </div>
            </Box>
            <br></br>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => toggleCard(yarn.id)}>
                <ArrowBackRoundedIcon />
              </IconButton>
              {!home && (
                <IconButton onClick={() => editDetails(yarn.id)}>
                  <EditIcon />
                </IconButton>
              )}
              {!home && (
                <IconButton onClick={() => deleteYarn(yarn.id)}>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}

export default YarnItem;
