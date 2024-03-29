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
$.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
});
