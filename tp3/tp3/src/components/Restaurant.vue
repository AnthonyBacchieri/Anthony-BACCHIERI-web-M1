<template>
  <div id="infos">
        <p class="md-headline">{{restaurant.name}}</p>
        
         <p> <span class="md-title">Cuisine : </span><span class="md-body-1">{{restaurant.cuisine}} </span></p>

        <p> <span class="md-title">Adresse : </span><span class="md-body-1"> {{restaurant.address.building}} {{restaurant.address.street}} ,{{restaurant.address.zipcode}} {{restaurant.borough}}  </span></p>
        
        <p> <span class="md-title">Note la plus récente : </span><span class="md-body-1">{{restaurant.grades[0].grade}} </span></p>
        
       <p> <span class="md-title"> Score moyen :</span><span class="md-body-1"> {{note}}</span></p>
       
      

       <h1>Localisation</h1>
       <Map v-bind:center="[restaurant.address.coord[1],restaurant.address.coord[0]]" v-bind:marker="[restaurant.address.coord[1],restaurant.address.coord[0]]"/>
  </div> 
</template>

<script>
import Map from './Map'
export default {
    
  name: 'Restaurant',
  components: {
    Map
  },
  props: {
     
    
  },
  computed : {
      id(){
      return this.$route.params.id
  }
  },
  data : function() {
      return {
          restaurant:null,
          note:null
      }
  },
  mounted() {
      console.log("avant affichage, go fetch");
      console.log("ID =" + this.id)
      let url="http://localhost:8080/api/restaurants/"+ this.id
      fetch(url)
      .then(response => {
          return response.json();
      }).then(data => {console.log (data.restaurant)
            this.restaurant = data.restaurant
            this.restaurant.grades.forEach(grade => {
                this.note+=grade.score;
                
            })
            this.note/=this.restaurant.grades.length;})
    
  },
  methods : {
      getRestaurantFromServer(){}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #infos {
     height : 40%
 }
</style>
