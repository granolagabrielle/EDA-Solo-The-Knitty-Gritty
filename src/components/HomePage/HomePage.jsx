import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import YarnItem from '../YarnItem/YarnItem';
import PatternItem from '../PatternItem/PatternItem';
import { IconButton } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import './HomePage.css';
import Box from '@mui/joy/Box';

function HomePage() {
  const yarns = useSelector((store) => store.yarns.yarnFavorites);
  const patterns = useSelector((store) => store.patterns.patternFavorites);
  const dispatch = useDispatch();

  const itemsPerPage = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentYarns = yarns.slice(currentIndex, currentIndex + itemsPerPage);

  const nextYarns = () => {
    console.log('next button');
    if (currentIndex + itemsPerPage >= yarns.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const nextPatterns = () => {
    console.log('next button');
    if (currentIndex + itemsPerPage >= patterns.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITE_YARNS' });
    dispatch({ type: 'FETCH_FAVORITE_PATTERNS' });
  }, []);

  return (
    <>
      <h2 className='header'>Favorite Yarns</h2>
      <section className='yarn-section'>
        <section className='yarn-container-home'>
          {currentYarns.map((yarn) => (
            <YarnItem key={yarn.id} yarn={yarn} />
          ))}
        </section>
        <div className='pagination-btns'>
          <IconButton onClick={nextYarns}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>
      </section>
      <section className='pattern-section'>
        <h2 className='header'>Favorite Patterns</h2>
        <section className='pattern-container-home'>
          {patterns.map((pattern) => (
            <PatternItem key={pattern.id} pattern={pattern} />
          ))}
        </section>
        <div className='pagination-btns'>
          <IconButton onClick={nextPatterns}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>
      </section>
    </>
  );
}

export default HomePage;
