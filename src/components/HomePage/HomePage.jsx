import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function HomePage() {
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  const patterns = useSelector((store) => store.patterns.patternInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <h2>Recent Yarns</h2>
      <section>
        {yarns.map((yarn) => {
          return (
            <div key={yarn.id}>
              <p>{yarn.yarn_title}</p>
            </div>
          );
        })}
      </section>
      <h2>Recent Patterns</h2>
      <section>
        {patterns.map((pattern) => {
          return (
            <div key={pattern.id}>
              <p>{pattern.pattern_title}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default HomePage;
