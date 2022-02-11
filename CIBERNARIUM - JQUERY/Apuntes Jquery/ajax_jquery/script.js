$(function() {
	dame_chile();
	$(boton).click(function (e) {
		dame_chile();
	});

	function dame_chile(){
		$.getJSON('http://api.icndb.com/jokes/random', function(data){			
			$("#chiste").html(data.value.joke);
		});
	}
});

