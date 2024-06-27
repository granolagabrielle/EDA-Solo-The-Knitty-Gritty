import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import YarnItem from '../YarnItem/YarnItem';
import PatternItem from '../PatternItem/PatternItem';
import { IconButton } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './HomePage.css';
import Box from '@mui/joy/Box';

function HomePage() {
  const yarns = useSelector((store) => store.yarns.yarnFavorites);
  const patterns = useSelector((store) => store.patterns.patternFavorites);
  const dispatch = useDispatch();

  const yarnPerPage = 4;
  const [currentYarnIndex, setCurrentYarnIndex] = useState(0);
  const currentYarns = yarns.slice(currentYarnIndex, currentYarnIndex + yarnPerPage);

  const nextYarns = () => {
    console.log('next button');
    if (currentYarnIndex + yarnPerPage >= yarns.length) {
      setCurrentYarnIndex(0);
    } else {
      setCurrentYarnIndex(currentYarnIndex + yarnPerPage);
    }
  };

  const patternsPerPage = 4;
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const currentPatterns = patterns.slice(currentPatternIndex, currentPatternIndex + patternsPerPage);

  const nextPatterns = () => {
    console.log('next button');
    if (currentPatternIndex + patternsPerPage >= patterns.length) {
      setCurrentPatternIndex(0);
    } else {
      setCurrentPatternIndex(currentPatternIndex + patternsPerPage);
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
          {currentPatterns.map((pattern) => (
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
