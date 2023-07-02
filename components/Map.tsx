import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as ReactDOMServer from "react-dom/server";
import { GiFossil } from "react-icons/gi";
import { gql, useQuery } from "@apollo/client";
import Error from "./Error";
import Loading from "./Loading";
import FossilsDetails from "./FosiilsDetails";
const getFossils = gql`
  query {
    fossils {
      id
      dinosaurId
      location
      date
      paleontologists
      latitude
      longitude
    }
    dinosaurs {
      id
      name
      height
      weight
      mesozoicEra
      facts
    }
  }
`;
const Map = () => {
  const { data, error, loading } = useQuery(getFossils);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  console.log(data);
  data.fossils.forEach(function (value: any) {
    console.log(value);
  });
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "600px" }}
    >
      <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
        maxZoom={5}
        minZoom={3}
      />
      {data.fossils.map((fossil: any) => (
        <Marker
          key={fossil.Id}
          position={[fossil.latitude, fossil.longitude]}
          icon={L.divIcon({
            iconSize: [128, 128],
            iconAnchor: [10, 10],
            className: "mymarker",
            html: ReactDOMServer.renderToString(<GiFossil />),
          })}
        >
          <Popup>
            <FossilsDetails
              fossils={data.fossils}
              dinosaurs={data.dinosaurs}
              continent={fossil.location}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
