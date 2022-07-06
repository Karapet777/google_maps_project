import React, {useEffect, useState} from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { defaultTheme } from "./Theme";
import { useSelector, useDispatch } from "react-redux";
import {getRestaurants, selectRestaurants} from "../../redux/restaurantsSlice";

const defaulteOptions = {
   styles: defaultTheme,
};

const Map = () => {
   const dispatch =useDispatch()
   const [activeMarker, setActiveMarker] = useState(null);
   const restaurants = useSelector(selectRestaurants)

   const handleActiveMarker = marker => {
      if (marker === activeMarker) {
         return;
      }
      setActiveMarker(marker);
   };

   const handleOnLoad = map => {
      const google = window.google;
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({lat: 40.1783449, lng: 44.5110099})
      map.fitBounds(bounds);
   };
   
   useEffect(() => {
      dispatch(getRestaurants())
   },[])

   return (
      <GoogleMap
         onLoad={handleOnLoad}
         onClick={() => setActiveMarker(null)}
         mapContainerStyle={{ width: "100vw", height: "100vh" }}
         options={defaulteOptions}
         zoom={10}
      >
         {restaurants.map(({ id, name, position, image }) => {
            return (
                <Marker
                    key={id}
                    position={position}
                    onMouseOver={() => handleActiveMarker(id)}
                >
                   {activeMarker === id ? (
                       <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                          <Link to={`${id}`}>
                             <div>
                                <img
                                    src={image}
                                    alt="restaurant img"
                                    style={{ width: "150px" }}
                                />
                             </div>
                             <div>{name}</div>
                          </Link>
                       </InfoWindow>
                   ) : null}
                </Marker>
            )
         })}
      </GoogleMap>
   );
};

export default Map;
