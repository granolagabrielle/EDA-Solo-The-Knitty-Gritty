import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

// joy
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

import './YarnInventory.css';

function YarnInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
  }, []);

  const viewDetails = (yarnId) => {
    history.push(`/yarn/${yarnId}`);
  };

  const addYarn = () => {
    history.push(`/addyarn`);
  };

  return (
    <>
      <h1>Yarn Inventory</h1>
      {yarns.length === 0 ? (
        <h4>
          Your yarn stash is empty. <strong onClick={addYarn}>Add yarn now?</strong>
        </h4>
      ) : (
        ''
      )}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={yarns}
          getOptionLabel={(option) => `${option.name}: ${option.yarn_title}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search yarn by brand or title'
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
          onChange={(event, value) => {
            if (value) {
              history.push(`/yarn/${value.id}`);
            }
          }}
        />
      </Stack>
      <section className='yarn-container'>
        {/* {yarns.map((yarn) => {
          return (
            <Card
              className='yarn-card'
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'blanchedalmond' }}
              key={yarn.id}
              onClick={() => viewDetails(yarn.id)}
            >
              <CardContent className='card-content'>
                <img style={{ width: '15rem', height: '20rem' }} src={yarn.image} alt={yarn.yarn_title} />
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                  {yarn.name}: {yarn.yarn_title}
                </Typography>
              </CardContent>
            </Card>
          );
        })} */}
        {yarns.map((yarn) => {
          return (
            <Box
              onClick={() => viewDetails(yarn.id)}
              key={yarn.id}
              sx={{ minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Card
                variant='outlined'
                sx={(theme) => ({
                  width: 300,
                  height: 500, // Set the fixed height here
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, border 0.3s',
                  '&:hover': {
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                    transform: 'translateY(-2px)',
                  },
                })}
              >
                <AspectRatio
                  ratio='3/4' // Set the aspect ratio for the phone photo size
                  sx={{
                    width: '100%',
                    height: 'auto',
                  }}
                >
                  <img src={yarn.image} loading='lazy' alt='' />
                </AspectRatio>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <Typography level='title-lg'>
                        <Link
                          href='#container-responsive'
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
                    <IconButton size='sm' variant='plain' color='neutral' sx={{ ml: 'auto' }}>
                      <FavoriteBorderRoundedIcon color='danger' />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                    <div>
                      <Typography level='body-xs'>Designed by</Typography>
                      <Typography level='body-sm'>Nature itself</Typography>
                    </div>
                  </Box>
                </Box>
              </Card>
            </Box>
          );
        })}
      </section>
    </>
  );
}

export default YarnInventory;
