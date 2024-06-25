import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import YarnItem from '../YarnItem/YarnItem';
import PatternItem from '../PatternItem/PatternItem';
import './HomePage.css';

function HomePage() {
  const yarns = useSelector((store) => store.yarns.yarnFavorites);
  const patterns = useSelector((store) => store.patterns.patternInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITE_YARNS' });
    dispatch({ type: 'FETCH_FAVORITE_PATTERNS' });
  }, []);

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
        {patterns.map((pattern) => (
          <PatternItem key={pattern.id} pattern={pattern} />
        ))}
      </section>
    </>
  );
}

export default HomePage;
