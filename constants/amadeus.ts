const AMADEUS_CONFIG = {
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  hostname: process.env.AMADEUS_ENV === 'production' ? 'production' : 'test',
};

if (!AMADEUS_CONFIG.clientId || !AMADEUS_CONFIG.clientSecret) {
  console.error(
    'Amadeus configuration failed: Missing AMADEUS_CLIENT_ID or AMADEUS_CLIENT_SECRET in environment variables'
  );
  throw new Error('Amadeus credentials are required');
}

export default AMADEUS_CONFIG;