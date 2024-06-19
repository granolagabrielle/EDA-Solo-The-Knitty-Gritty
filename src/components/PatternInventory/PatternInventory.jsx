import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './PatternInventory.css';

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
