import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import './PatternInventory.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/joy/Box';
import Autocomplete from '@mui/material/Autocomplete';
import PatternItem from '../PatternItem/PatternItem';

function PatternInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patterns = useSelector((store) => store.patterns.patternInventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  const addPattern = () => {
    history.push(`/addpattern`);
  };

  return (
    <>
      <Box className='header' height={50} display='flex' alignItems='center' gap={4} p={12}>
        <h1>Pattern Inventory</h1>
        {patterns.length === 0 ? (
          <h4>
            Your pattern library is empty. <strong onClick={addPattern}>Add a pattern now?</strong>
          </h4>
        ) : (
          ''
        )}
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            options={patterns}
            getOptionLabel={(option) => `${option.name}: ${option.pattern_title}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search pattern by designer or title'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
            onChange={(event, value) => {
              if (value) {
                history.push(`/pattern/${value.id}`);
              }
            }}
          />
        </Stack>
      </Box>
      <section className='pattern-container'>
        {patterns.map((pattern) => (
          <PatternItem key={pattern.id} pattern={pattern} />
        ))}
      </section>
    </>
  );
}

export default PatternInventory;
