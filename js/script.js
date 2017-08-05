function searchEngine(e) {
  // Function that handles the search for the query

  // Checking for ENTER key
  if (e.originalEvent.type === 'keydown' && (e.keyCode !== 13 || !$('#search-input').val()) ) {
    return;
  }

  // Checking for SEARCH button
  if (e.originalEvent.type === 'click' && !$('#search-input').val()) return;

  // Hidding it
  $('ul').addClass('hide').html("");

  // Get the val and make the request
  var query = $('#search-input').val();
  $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&prop=extracts&exintro=&origin=*&srsearch=' + encodeURI(query), function(json) {

      // Here are the results
      let results = json.query.search;

      // Creating the list
      for (var i = 0; i < results.length; i++) {
        let res = `
        <li class="collection-item">
          <h5>${results[i].title}</h5>
          <p>${results[i].snippet}</p>
          <a href="https://en.wikipedia.org/wiki/${encodeURI(results[i].title)}" target="_blank">See more</a>
        </li>`;
        $('ul').append(res);
      }

      // Showing it
      $('ul').removeClass('hide');
      $('ul').fadeIn('fast');
      $('#search-input').val("");
  });
}

$(document).ready( function () {
  // EZ random page
  $('#random').click( function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  // Initializes the search app
  $('#search').click(function() {
    $('#main').fadeOut('fast', function() {
      $(this).addClass('hide');
      $('#search-menu').removeClass('hide');
      $('#search-menu').fadeIn('fast', function() {
        $('#search-input').focus();
      });
    });
  });

  // Go back to the menu
  $('#back').click(function() {
    $('#search-menu').fadeOut('fast', function() {
      $(this).addClass('hide');
      $('#main').removeClass('hide');
      $('#main').fadeIn('fast', function() {
        $('#search-input').removeAttr('autofocus').val("");
        $('ul').html("");
        $('ul').addClass('hide');
        $('#search-input').focusout();
      });
    });
  })

  $('#search-input').on('keydown', searchEngine);
  $('#search-btn').click(searchEngine);
})