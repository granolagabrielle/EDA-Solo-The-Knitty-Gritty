import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import './YarnInventory.css';

function YarnInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
  }, []);

  return (
    <>
      <h1>Yarn Inventory</h1>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={yarns}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search yarn by brand'
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
        {yarns.map((yarn) => {
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
        })}
      </section>
    </>
  );
}

export default YarnInventory;
