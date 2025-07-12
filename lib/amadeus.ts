import Amadeus from 'amadeus';
import AMADEUS_CONFIG from '../constants/amadeus';

const amadeus = new Amadeus({
  clientId: AMADEUS_CONFIG.clientId ?? (() => { throw new Error('AMADEUS_CONFIG.clientId is required'); })(),
  clientSecret: AMADEUS_CONFIG.clientSecret ?? (() => { throw new Error('AMADEUS_CONFIG.clientSecret is required'); })(),
  hostname: AMADEUS_CONFIG.hostname,
});

export default amadeus;