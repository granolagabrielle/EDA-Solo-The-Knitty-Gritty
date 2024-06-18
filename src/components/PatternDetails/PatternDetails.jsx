import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';

function PatternDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const patterns = useSelector((store) => store.patterns.patternInventory);
  const patternDetails = useSelector((store) => store.patterns.patternDetails);

  console.log('checking patterns', patterns);

  useEffect(() => {
    console.log(`GET params.id ${params.id}`);
    dispatch({ type: 'FETCH_PATTERN_DETAILS', payload: params.id });
  }, []);

  return (
    <>
      <h1>Pattern Details Page</h1>
      <p>{patternDetails.pattern_title}</p>
    </>
  );
}

export default PatternDetails;
