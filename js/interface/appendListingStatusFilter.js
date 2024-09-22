function appendListingStatusFilter() {

  data.listingStatus.forEach(function (s) {
    options.listingStatusFilter[s] = false;

    const $div = $('<div />').attr('class', 'form-check');
    const $input = $('<input />')
      .attr('class', 'form-check-input')
      .attr('type', 'checkbox')
      .attr('value', s);
    const $i = $('<i />')
      .attr('class', 'fa fa-map-marker fa-lg mr-1')
      .attr('style', 'color:' + colours[s]);
    const $label = $('<label />')
      .attr('class', 'form-check-label')
      .html(s + ' <span class="badge badge-primary">' + data.listingsByStatus[s].length + '</span>');

    $div.append($input);
    $div.append($i);
    $div.append($label);
    $('#filterCheckboxes').append($div);
  });

  $('.form-check-input').change(function (e) {
    options.listingStatusFilter[e.target.value] = !options.listingStatusFilter[e.target.value];
  });
}