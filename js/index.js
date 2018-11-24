// Create Click event to pass data to wikipedia API?
// Return results in cards below with link to wikipedia page.
// use $.each() function for printing out results below the search.  
// Use this format to search for results.  https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=Albert%20Einstein&utf8=
// Parse through results and parse pageid https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=18742711&inprop=url
var results;
$(document).ready(function() {
  
    $('#searchButton').click(function() {        
        results = $('#searchInput').val();
        //$('#searchResults').html(results + ' success!');      
        
        $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=' +                 $('#searchInput').val() + '&origin=*', function(data){ 
        var output = "<ul class='list-group'>";                  
        $.each(data.query.search, function(i, item) {
            var pageURL; //To be defined below
            var pageTitle = data.query.search[i].title;
            var pageID = data.query.search[i].pageid;
            var pageDescription = data.query.search[i].snippet;
              
            $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info&pageids=" + data.query.search[i].pageid + "&inprop=url" + '&origin=*', function(wiki){
              
            pageURL = wiki.query.pages[pageID].fullurl; 
            output += "<a href='" + pageURL + "' target=_blank>" + "<li class='list-group-item'>" + pageTitle + "</a> - " + pageDescription + "</li>";
            //output += "</ul>";
            $("#searchResults").empty();
            $('#searchResults').append(output); 
                });
            output += "</ul>";
            });
        });        
    });
});