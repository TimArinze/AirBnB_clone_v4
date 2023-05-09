$('document').ready(function() {
  const checked = {};
  $('input[type="checkbox"]').change(function() {
      if (this.checked == true ) {
          checked[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
          delete checked[$(this).attr('data-id')];
      }
      $('.amenities h4').text(Object.values(checked).join(', '));
  });

  const apiStatus = $('div#api_status');
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }  });
  
  $("button").click(() => {
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({"amenities": Object.values(checked)}),
      success: (response) => {
        $("section.places").empty();
        response.map((res) => {
          const article = ["<article>", "<div class='title_box'>",
          `<h2>${res.name}</h2>`,,
          `<div class="price_by_night">${res.price_by_night}</div>`,,
          "</div>",
          "<div class='information'>",
          `<div class="max_guest">${res.max_guest} Guest(s)</div>`,,
          `<div class="number_rooms">${res.number_rooms} Bedroom(s)</div>`,,
          `<div class="number_bathrooms">${res.number_bathrooms} Bathroom(s)</div>`,,
          "</div>",
          "<div class='description'>",
          `${res.description}`,,
          "</div>",
          "</article>"];
          $("section.places").append(article.join(''));
        });
      },
      error: (error) => {
        console.log(error);
      }});
  })
  
});