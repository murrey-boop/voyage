import Amadeus from 'amadeus';
import AMADEUS_CONFIG from '../constants/amadeus';

const amadeus = new Amadeus({
  clientId: AMADEUS_CONFIG.clientId,
  clientSecret: AMADEUS_CONFIG.clientSecret,
  hostname: AMADEUS_CONFIG.hostname,
});

export default amadeus;