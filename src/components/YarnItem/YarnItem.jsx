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
            <img src={yarn.image} loading='lazy' alt='' />
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
