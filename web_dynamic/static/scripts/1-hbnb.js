$('document').ready(() => {
  const check = {};
  $('input[type="checkbox"]').change(() => {
    if (this.checked == true) {
      check[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete check[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(check).join(', '));
  });
});
