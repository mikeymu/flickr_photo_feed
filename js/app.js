$(document).ready(function() {


  var getPhotos = function (searchTerm) {
    // the AJAX part
      var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      var flickrOptions = {
        tags: searchTerm,
        format: "json"
      };
      function displayPhotos(data) {
        var photoHTML = '<ul>';
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
        photoHTML += '</ul>';
        $('#photos').html(photoHTML);
      }
      $.getJSON(flickerAPI, flickrOptions, displayPhotos);
      
  }
  
  
  
 $(document.body).on('click','button', function () {
    // highlight the button
    // not AJAX, just cool looking
    $("button").removeClass("selected");
    $(this).addClass("selected");

   var searchTerm = $(this).find('span').text();
   console.log(searchTerm);
   getPhotos(searchTerm);
   
  }); // end click
  
  
  $('form').submit( function (evt) {
  evt.preventDefault();
  var searchTerm = $('#search').val();
  $('#search').val('');
    console.log(searchTerm);
    
    $("button").removeClass("selected");
    $(".filter-select").append('<li><button class="selected"><span>' + searchTerm +'</span><a class="delete" href="#">Delete</a></button></li>');
    
    getPhotos(searchTerm);
  });
  
  $(document.body).on('click','.delete',function() {
  $(this).addClass("shouldDelete")
  $(".shouldDelete").parent().parent().remove()
    
  });
  

}); // end ready


