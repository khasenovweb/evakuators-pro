$(document).ready(function(){

	//$('input[name="summ"]')

	$('input[name="summ"]').on('input', function(){
		var val = $(this).val().replace(/\s+/g,'');
		$(this).val(val.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' '));
	});
	

	$('[data-result-trigger]').click(function(){

		//Ануитентный платеж
		var sum = Number( $('input[name="summ"]').val().replace(/\s+/g,'') );
		var mes = Number( $('input[name="srok"]').val() ) * 12 ;
		var percent = Number( $('input[name="percent"]').val() );



		var mes_percent = (percent / 12) / 100;
		var koef = (mes_percent * Math.pow(1 + mes_percent, mes)) / (Math.pow(1 + mes_percent, mes ) - 1);
		var platezh = sum * koef;

		console.log(mes_percent);

		var summa__dolga = platezh * mes;
		var pereplata = summa__dolga - sum;

		$('[data-result="platezh"]').text(String(Math.round(platezh)).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')+' руб.');
		$('[data-result="pereplata"]').text(String(Math.round(pereplata)).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')+' руб.');
		$('[data-result="dolg"]').text(String(Math.round(summa__dolga)).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')+' руб.');
		//END Ануитентный платеж


		// Появление графика
		$('.grafik').html('<canvas id="myChart" class="myChart"></canvas>');
		var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
		    // The type of chart we want to create
		    type: 'pie',

		    // The data for our dataset
		    data: {
		        labels: ['Сумма кредита', 'Сумма переплаты'],
		        datasets: [{
		            label: 'Результат расчетов',
		            backgroundColor: ['#0dd149','#00afff'],
		            borderColor: ['#fff','#fff'],
		            data: [sum, Math.round(pereplata)]
		        }]
		    },

		    // Configuration options go here
		    options: {}
		});
		//END Появление графика
	});
});