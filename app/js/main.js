 $(document).ready(function(){
 	$('.nav__links a').click(function(){
 		event.preventDefault();
 		var type = $(this).attr('data-type');

 		if(type === 'all') {
 			$('.item').show();
 		}else {
 			$('.item').hide();
 			$('.item[data-type="'+type+'"]').show();
 		}
 		$('.nav__links a').removeClass('active');
 		$(this).addClass('active');
	 });
	 $('[data-click="selectcity"]').click(function(){
		$('[data-modal="selectcity"]').show();
	 });
 });