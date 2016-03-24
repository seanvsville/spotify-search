// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // form to search spotify API
  var $spotifySearch = $('#spotify-search');

  // input field for track (song)
  var $track = $('#track');

  // element to hold results from spotify API
  var $results = $('#results');

  // loading gif
  var $loading = $('#loading');

  // compile handlebars template
  var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);

  // submit form to search spotify API
  $spotifySearch.on('submit', function handleFormSubmit(event) {
    event.preventDefault();

    // empty previous results
    $results.empty();

    // save form data to variable
    var searchTrack = $track.val();

    // only search if the form had a keyword to search with!
    if (searchTrack !== ""){
      // show loading gif
      $loading.show();
      // spotify search URL
      var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

      // use AJAX to call spotify API
      $.ajax({
        url: searchUrl,
        method: 'GET',
        success: renderSpotifyData  // use this function as the callback
      });
    } else {
      alert("Please enter a keyword to search");
    }

    // reset the form
    $spotifySearch[0].reset();
    $track.focus();
  });


  function renderSpotifyData(data) {
    // track results are in an array called `items`
    // which is nested in the `tracks` object
    var trackResults = data.tracks.items;
    console.log(trackResults);

    // hide loading gif
    $loading.hide();

    // pass in data to render in the template
    var trackHtml = template({ tracks: trackResults });

    // append html to the view
    $results.append(trackHtml);
  }


});
