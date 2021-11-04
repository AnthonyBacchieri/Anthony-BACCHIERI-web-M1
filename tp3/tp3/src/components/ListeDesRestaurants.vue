<template>
<div>
  <div div class="md-layout md-gutter">
      <div class="md-layout-item texte" id="formulaire">
  <form @submit.prevent="ajouterRestaurant($event)">
      <h1>Ajout d'un restaurant</h1>
        <label>
            Nom : </label><input name="nom" type="text" required v-model="nom">
        
        <label>
            Cuisine : </label> <input name="cuisine" type="text" required v-model="cuisine">
        
        <br>

        <md-button class="md-raised" type="submit">Ajouter</md-button>
    </form>
      </div>
  

      <div class="md-layout-item texte" id="infos">
    <h1> Informations </h1>
    <p>Nombre de restaurants total : {{nbRestaurantsTotal}}</p>
    <p>Nombre de pages total : {{nbpagestotal}}</p>
    <p>Restaurants par page: {{pagesize}}</p>
      </div>
    
    </div>

    
     <div id="gestionPages" class="md-layout-item md-layout md-gutter ">
         <label class="md-layout-item" id="slider_label">
            Restaurants par page : </label >
      <input class="md-layout-item slider" @change="getRestaurantsFromServer()"  type="range" min="5" max="1000" value="10" step="5" id="rangePages" v-model="pagesize">
        </div>

     <div class="md-layout md-gutter">
         <div class="md-layout md-gutter">
    <md-button class="md-raised md-layout-item" :disabled="page===0" @click="pagePrecedente()">Précédent</md-button> 
    <md-button class="md-raised  md-layout-item" :disabled="page===nbpagestotal" @click="pageSuivante()">Suivant</md-button> 
    </div>
    <p class="md-layout-item"> Page courante : {{page}}</p>
    

    <div class="reherche md-layout-item"  >
    <p>Chercher par nom : <input @input="chercherRestaurants()" type ="text" v-model="nomRestauRecherche"></p>
     </div>
     </div>
    
   <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card>
       
       <md-table-empty-state
        md-label="Aucun restaurant trouvé :("
        :md-description="`Aucun restaurant ne correspond à votre critère de recherche. Veuillez saisir une autre recherche`">
        
      </md-table-empty-state>

        
            <md-table-row   v-bind:style="{backgroundColor:getColor(index)}" slot="md-table-row" slot-scope=" { item , index}">
                <md-table-cell md-label="Nom" md-sort-by="name">{{item.name}}</md-table-cell>
                <md-table-cell md-label="Cuisine" md-sort-by="cuisine"> {{item.cuisine}}</md-table-cell>
                 <md-table-cell md-label="Ville" md-sort-by="borough"> {{item.borough}}</md-table-cell>
                <md-table-cell md-label="Détails" > <router-link :to="'/restaurant/'+item._id"> Détails</router-link></md-table-cell>
                <md-table-cell md-label="Supprimer"  >  <md-button class="md-raised"  @click="supprimerRestaurant(item)">Supprimer</md-button></md-table-cell>
            </md-table-row>
        
    </md-table>
  </div>
</template>

<script>
import _ from "lodash"
export default {
  name: 'ListeDesRestaurants',
    data: function() {
        return {
            restaurants: [],
            nom: '',
            cuisine: '',
            nbRestaurantsTotal:0,
            page:0,
            pagesize:10,
            nbpagestotal:0,
            nomRestauRecherche:""
        }},
        mounted() {
            //avant affichage de la page
            this.getRestaurantsFromServer();
        },
        methods: {
            pagePrecedente(){
                if(this.page === 0) return;
                this.page --;
                this.getRestaurantsFromServer();
            },

            pageSuivante(){
                if(this.dernierePage === 0) return;
                this.page ++;
                this.getRestaurantsFromServer();
            },
            getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?";
                url += "page="+ this.page;
                url += "&pagesize="+ this.pagesize;
                url += "&name=" + this.nomRestauRecherche;
                fetch(url)
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then( (res)=> {
                                // Maintenant res est un vrai objet JavaScript
                                this.restaurants = res.data;
                                this.nbRestaurantsTotal=res.count;
                                this.nbpagestotal=Math.round(this.nbRestaurantsTotal/this.pagesize);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            chercherRestaurants: 
                _.debounce( function(){
                    this.getRestaurantsFromServer();
                },300),

            supprimerRestaurant(r) {
                let url = "http://localhost:8080/api/restaurants/" + r._id;
                fetch(url, {
                    method: "DELETE"
                    
                })
                .then((responseJSON) => {
                    responseJSON.json()
                        .then(()=> {
                            console.log(responseJSON);
                            // Maintenant res est un vrai objet JavaScript
                            this.getRestaurantsFromServer();
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });
            },
            ajouterRestaurant(event) {
                
                let form=event.target
                let donneesFormulaire = new FormData(form)
                
                let url = "http://localhost:8080/api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                .then((responseJSON) => {
                    responseJSON.json().then((res)=> {
                            console.log(res);
                            this.msg=res.msg;
                            this.getRestaurantsFromServer();
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });
                this.name = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightGrey' : 'white';
            }
        }
    
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .texte {
        text-align: center;
        margin-bottom: 3%;
    }

    #gestionPages {
        text-align: center;
        margin-bottom: 3%;
    }

    
</style>
