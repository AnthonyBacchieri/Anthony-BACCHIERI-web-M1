<template>
 <l-map id="carte"
   :center="center"
   :zoom="zoom"
   class="map"
   ref="map"
   @update:zoom="zoomUpdated"
   @update:center="centerUpdated"
 >
   <l-tile-layer
     :url="url"
   >
   </l-tile-layer>
   <l-marker
    :key=1
    :lat-lng=marker
>
</l-marker>
   </l-map>
</template>

<script>
// importer leaflet + icones
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
 components: {
   LMap,
   LTileLayer,
   LMarker
 },
 props : {
  center : null,
  marker : null
 },
 data :function() {
   return {
     longitude:null,
     latitude:null,
     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     zoom: 17,
   }
 },
 methods: {
   zoomUpdated (zoom) {
    
     this.zoom = zoom;
     console.log(this.markers)
   },
   centerUpdated (center) {
     this.center = center;
   }
 }
}
</script>

<style>
 #carte {
   position: absolute;
   width: 100%;
   height: 50%;
   overflow :hidden
 }
</style>