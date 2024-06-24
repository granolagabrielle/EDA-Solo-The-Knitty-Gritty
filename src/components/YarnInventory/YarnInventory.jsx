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

import './YarnInventory.css';
import YarnItem from '../YarnItem/YarnItem';

function YarnInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  console.log('check yarns', yarns);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
  }, []);

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
        {yarns.map((yarn) => (
          <YarnItem key={yarn.id} yarn={yarn} />
        ))}
      </section>
    </>
  );
}

export default YarnInventory;
