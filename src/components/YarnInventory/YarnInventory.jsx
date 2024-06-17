import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';

function YarnInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  console.log('checking yarns', yarns);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
  }, []);

  return (
    <>
      <h1>Yarn Inventory</h1>
      <section>
        {yarns.map((yarn) => {
          return (
            <div key={yarn.id}>
              <p>{yarn.name}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default YarnInventory;
