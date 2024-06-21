import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './PatternInventory.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

function PatternInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patterns = useSelector((store) => store.patterns.patternInventory);
  console.log('checking patterns', patterns);

  useEffect(() => {
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  const viewDetails = (patternId) => {
    history.push(`/pattern/${patternId}`);
  };

  return (
    <>
      <h1>Pattern Inventory</h1>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={patterns}
          getOptionLabel={(option) => option.pattern_title}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search pattern by title'
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
      <section className='pattern-container'>
        {patterns.map((pattern) => {
          return (
            <Card
              className='pattern-card'
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'blanchedalmond' }}
              key={pattern.id}
              onClick={() => viewDetails(pattern.id)}
            >
              <CardContent className='card-content'>
                <img style={{ width: '15rem', height: '20rem' }} src={pattern.image} alt={pattern.pattern_title} />
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                  {pattern.name}: {pattern.pattern_title}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}

export default PatternInventory;
