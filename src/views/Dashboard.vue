<template>
  <div class="dashboard">
     
       <H1>Asteroid - Neo Stats</H1>
	   <div class="container">
			<div class="row text-center">
				<Datepicker
					range
					v-model="selectedDate"
					@change="loadmap"
					lang="en"
					
				/>
			</div>
			<div class="row">
				<div id="chart">
					<div v-if="loader" class="loader">Please wait Loading Data...<br /><img src="img/loader.gif" style="height:30px; width:30px; margin: 0 auto;" /></div>
				</div>
				
			</div>
	   </div>
  </div>
</template>

<script>
/*eslint-disable */

 // loading Requred libs
 import axios from "axios";
 import ApexCharts from 'apexcharts'
 import 'vue-datepicker-ui/lib/vuedatepickerui.css';
 import VueDatepickerUi from 'vue-datepicker-ui';

export default {
  data: () => {
    return {       
	   start_date: "",
       end_date: "",
	   loader:0,
	   selectedDate: [
        new Date(),
        new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)]
              
    };
  },
   components: { 
	Datepicker: VueDatepickerUi
 },
 
  name: "HomeView",
   
  methods:{
   loadmap : function(){
	
	// main vue object (this) lose their main properties so we storing it on variable 
	var inst = this;
	inst.loader = 1;

	// making request dates
	var dates = this.selectedDate
    var start_date =  dates[0].getFullYear()+"-"+ ("0" + (dates[0].getMonth()+1)).slice(-2) +"-"+("0" + dates[0].getDate()).slice(-2)
    var end_date =  dates[1].getFullYear()+"-"+ ("0" + (dates[1].getMonth()+1)).slice(-2) +"-"+("0" + dates[1].getDate()).slice(-2)
	

    axios.get("http://localhost:8000/api/neodata/"+start_date+"/"+end_date).then(function (response) {  
		
         var data = response.data.data;
         var Asteroid = [];
		 var dates = []
		 data.forEach(function callback(value, index) {
						console.log(value);
						dates.push(value.date)
						Asteroid.push(value.count)
						});

	
	 
		var options = {
				chart: {
					type: 'line',
					events: {
						beforeMount: function(chartContext, config) {
						    inst.loader = 0
						}
						}
				},
				series: [{
					name: 'Asteroid Count',
					data: Asteroid,
					
				}],
				yaxis: {
					title: {
						text: "Asteroid Count",
						style: {
						color: "#FF1654"
						}
					}
				},
				xaxis: {
					name: 'Date On',
					categories: dates,
					title: {
						text: "Dates On",
						style: {
						color: "#FF1654"
						}
					}
				},
				dataLabels: {
					enabled: false
				},
			}

			var chart = new ApexCharts(document.querySelector("#chart"), options);

			chart.render();
			 

	})
   }
  },
   beforeMount(){ 
	this.loadmap()
 },
};
/*eslint-disable */
</script>
