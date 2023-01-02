
$(document).ready(function () {

  var channelName = ['GoogleDevelopers','IndiaTv', 'NationalGeographic' ];
  var key = 'AIzaSyCTjcXLtl-wNU-UCzvyoMVbWIg2_NVvcKc';
  $.each(channelName, function(i,value) {
    $.get("https://www.googleapis.com/youtube/v3/channels", {
      part: 'contentDetails',
      forUsername: value,
      key: key},
      function(data){
        $.each(data.items, function(i, item){
        pid = item.contentDetails.relatedPlaylists.uploads;
          getVids(pid);
        })
      }
    );

  });
  
  function getVids(pid){
    $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
      part: 'snippet',
      key: key,
      maxResults: 10,
      playlistId: pid,},
      function(data){
        var id = data.items[0].snippet.resourceId.videoId;
      $.each(data.items, function(i, item){
        var thumb = item.snippet.thumbnails.medium.url;
          var title = item.snippet.title;
          var desc = item.snippet.description.substring(0, 70);
          var vid= item.snippet.resourceId.videoId;
          mainVid(id);

          $('.list-media').append(`
          <div class="media mb-2" data-key="${vid}">
            <img class="mr-3" src="${thumb}" alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0">${title}</h5>
              <p>${desc}</p>
            </div>
          </div>
          `);

            // CLICK EVENT
          $('.list-media').on('click', '.media', function () {
            var id = $(this).attr('data-key');
            mainVid(id);
          });
      });
      
    });
  }


  function mainVid(id) {
    $('.single-video').html(`
    <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
}



});


