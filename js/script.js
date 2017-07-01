// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&titles=Stack%20Overflow API for specific quote

let firstTime = true;

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
        $('#search-input').attr('autofocus', 'autofocus');
      });
    });
  });

  $('#back').click(function() {
    $('#search-menu').fadeOut('fast', function() {
      $(this).addClass('hide');
      $('#main').removeClass('hide');
      $('#main').fadeIn('fast', function() {
        $('#search-input').removeAttr('autofocus').val("");
        $('ul').html("");
        $('ul').addClass('hide');
      });
    });
  })

  $('#search-input').on('keydown', function(e) {
    if (e.keyCode !== 13 ) {
      return;
    }
    if (!$(this).val()) return;
    $('ul').addClass('hide').html("");
    var query = $(this).val();
    $.getJSON('https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&prop=extracts&exintro=&srsearch=' + encodeURI(query), function(json) {
        let results = json.query.search;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          let res = `
          <li class="collection-item">
            <h5>${results[i].title}</h5>
            <p>${results[i].snippet}</p>
            <a href="https://en.wikipedia.org/wiki/${encodeURI(results[i].title)}" target="_blank">See more</a>
          </li>`;
          $('ul').append(res);
        }
        $('ul').removeClass('hide');
        $('ul').fadeIn('fast');
    });
  })
})