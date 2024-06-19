import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './HomePage.css';

function HomePage() {
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  const patterns = useSelector((store) => store.patterns.patternInventory);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  const viewYarnDetails = (yarnId) => {
    history.push(`/yarn/${yarnId}`);
  };

  const viewPatternDetails = (patternId) => {
    history.push(`/pattern/${patternId}`);
  };

  return (
    <>
      <h1>Home</h1>
      <h2>Recent Yarns</h2>
      <section className='yarn-container'>
        {yarns.map((yarn) => {
          return (
            <Card
              className='yarn-card'
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'blanchedalmond' }}
              key={yarn.id}
              onClick={() => viewYarnDetails(yarn.id)}
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
      <h2>Recent Patterns</h2>
      <section className='pattern-container'>
        {patterns.map((pattern) => {
          return (
            <Card
              className='yarn-card'
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'blanchedalmond' }}
              key={pattern.id}
              onClick={() => viewPatternDetails(pattern.id)}
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

export default HomePage;
