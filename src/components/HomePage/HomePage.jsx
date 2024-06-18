import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
      <section>
        {yarns.map((yarn) => {
          return (
            <div key={yarn.id} onClick={() => viewYarnDetails(yarn.id)}>
              <p>{yarn.yarn_title}</p>
            </div>
          );
        })}
      </section>
      <h2>Recent Patterns</h2>
      <section>
        {patterns.map((pattern) => {
          return (
            <div key={pattern.id} onClick={() => viewPatternDetails(pattern.id)}>
              <p>{pattern.pattern_title}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default HomePage;
