import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './YarnInventory.css';

function YarnInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const yarns = useSelector((store) => store.yarns.yarnInventory);
  console.log('checking yarns', yarns);

  useEffect(() => {
    dispatch({ type: 'FETCH_YARNS' });
  }, []);

  const viewDetails = (yarnId) => {
    history.push(`/yarn/${yarnId}`);
  };

  return (
    <>
      <h1>Yarn Inventory</h1>
      <section className='yarn-container'>
        {yarns.map((yarn) => {
          return (
            <Card
              className='yarn-card'
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'blanchedalmond' }}
              key={yarn.id}
              onClick={() => viewDetails(yarn.id)}
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
    </>
  );
}

export default YarnInventory;
