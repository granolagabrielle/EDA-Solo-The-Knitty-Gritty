import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';

function PatternInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patterns = useSelector((store) => store.patterns.patternInventory);
  console.log('checking patterns', patterns);

  useEffect(() => {
    dispatch({ type: 'FETCH_PATTERNS' });
  }, []);

  return (
    <>
      <h1>Pattern Inventory</h1>
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

export default PatternInventory;
