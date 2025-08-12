import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/joy/Box';
import './YarnInventory.css';
import YarnItem from '../YarnItem/YarnItem';

function YarnInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
  }, []);

  const addYarn = () => {
    history.push(`/addyarn`);
  };

  return (
    <>
      <Box className='yarn-inv-header' height={50} display='flex' alignItems='center' gap={4} p={8}>
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
            // onChange={(event, value) => {
            //   if (value) {
            //     history.push(`/yarn/${value.id}`);
            //   }
            // }}
          />
        </Stack>
      </Box>
      <section className='yarn-container'>
        {yarns.map((yarn) => (
          <YarnItem key={yarn.id} yarn={yarn} home='' />
        ))}
      </section>
    </>
  );
}

export default YarnInventory;
