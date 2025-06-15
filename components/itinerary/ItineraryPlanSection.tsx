'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { itineraries } from '@/constants/itinerary';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function ItineraryPlanSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 font-montserrat">Itinerary Plan</h2>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="p-4 mb-4 border rounded-lg">
          <p className="font-lato">Destination: {itinerary.destination}</p>
          <p className="font-lato">Dates: {itinerary.dates.start} to {itinerary.dates.end}</p>
          <p className="font-lato">Accommodation: {itinerary.accommodation}</p>
          <p className="font-lato">Assistance: {itinerary.assistance.join(', ')}</p>
          <div className="mt-2">
            <h3 className="font-lato font-semibold">Activities:</h3>
            <ul className="list-disc pl-5">
              {itinerary.activities.map((activity) => (
                <li key={activity.day} className="font-lato">
                  Day {activity.day}: {activity.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-lato font-semibold">Destination Map:</h3>
            <MapContainer
              center={[itinerary.coordinates.lat, itinerary.coordinates.lng]}
              zoom={10}
              style={{ height: '300px', width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[itinerary.coordinates.lat, itinerary.coordinates.lng]} />
            </MapContainer>
          </div>
        </div>
      ))}
    </div>
  );
}