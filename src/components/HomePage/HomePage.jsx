import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import YarnItem from '../YarnItem/YarnItem';
import './HomePage.css';

function HomePage() {
  const yarns = useSelector((store) => store.yarns.yarnFavorites);
  const patterns = useSelector((store) => store.patterns.patternInventory);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITE_YARNS' });
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  const viewPatternDetails = (patternId) => {
    history.push(`/pattern/${patternId}`);
  };

  return (
    <>
      <h2>Favorite Yarns</h2>
      <section className='yarn-container'>
        {yarns.map((yarn) => (
          <YarnItem key={yarn.id} yarn={yarn} />
        ))}
      </section>
      <h2>Favorite Patterns</h2>
      <section className='pattern-container'>
        {/* {patterns.map((pattern) => {
          return (
            <Card
              className='pattern-card'
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
        })} */}
      </section>
    </>
  );
}

export default HomePage;
