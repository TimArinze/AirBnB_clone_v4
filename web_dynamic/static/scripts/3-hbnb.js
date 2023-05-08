$('document').ready(function() {
    let checked = {};
    $('input[type="checkbox"]').change(function() {
        if (this.checked == true ) {
            checked[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete checked[$(this).attr('data-id')];
        }
        $('.amenities h4').text(Object.values(checked).join(', '));
    });

const apiStatus = $('div#api_status');
$.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
});
$.ajax({
	type: "POST",
	url: "http://0.0.0.0:5001/api/v1/places_search",
	contentType: "application/json",
	data: JSON.stringify({})
	success: function(data) {
		var places = data.places;
		for (var i = 0; i < places.length; i++) {
			var place = places[i]
			var article = $("<article>");
			article.append("<h2>" + place.name + "</h2>")
			article.append("<div>" + place.discription + "</div>")
			$("#places").append(article);
		}
	}
});