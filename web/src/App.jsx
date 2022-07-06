import { useLoadScript } from "@react-google-maps/api";
import AppRouter from "./routers/AppRouter";

const API_KEY = 'AIzaSyCqlacSEXjaZTv_H_CqResZs4p_5MKnqUA'

export default function App() {
   const { isLoaded } = useLoadScript({
      googleMapsApiKey: API_KEY,
   });

   return isLoaded ? <AppRouter /> : <p>Loading...</p>;
}
