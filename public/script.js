$(function(){

    //call getJSON when myform is submitted
    $('#addrecipe').submit(function() {

        console.log("submit form");
        var url = "recipes?" + "name=" + $("#rname").val() + "&cuisine=" + $("#rcuisine").val();
        // event.preventDefault();
        $.ajax({
            url: url,
            type: "PUT",
            data: {
                name: $("#rname").val(),
                cuisine: $("#rcuisine").val(),
                ingredients: $("#ingredientName").val()
            },
            success: function(data) {console.log("Success!");},
            error: function(err, data) { console.log("Error"); }
        });
        return false;   
    });

//purpose of submit button - what it should do upon click
	$("#eg1").submit(function() {
//reads in tag
        var search = $("#search").val();
        var ingred1 = $("#ingred1").val();
        var ingred2 = $("#ingred2").val();
        var ingred3 = $("#ingred3").val();
		if(search ==="" && ingred1 ==="" && ingred2 ==="" && ingred3 ==="")
        {
			return false;
		}
    //ajax request to 3rd party server - Yummly - puts in custom ingredients from user
     //    $.ajax({
	    //     type: "GET",
	    //     dataType: "jsonp",
	    //     cache: false,
	    //     url: "https://api.instagram.com/v1/tags/"+search+"/media/recent?client_id=17b605e326494ebf958596b21441d8df",
	    //     success: function(data) {
	    //         for (var i = 0; i < 40; i++) {
	    //             $("#pics").append("<a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "' class='insta'></img></a>");
	    //         }
	    //     }
	    // });

        var url = "http://api.yummly.com/v1/api/recipes?_app_id=768ca507&_app_key=1804ef80e21e0962f2918eb62c2a754a&q="+search+"&allowedIngredient[]="+ingred1+"&allowedIngredient[]="+ingred2+"&allowedIngredient[]=" + ingred3+"&requirePictures=true";
        $.ajax({                                                                            
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            success: function(data) { 
                for (var i = 0; i < data.matches.length; i++) {
                    console.log(data);
                    $("#pics").append("<center><img src='" + data.matches[i].smallImageUrls[0] + "'></img></center>");
                    // $("#pics").html(data);
                } 
            },
            error: function(data, data2) { console.log(data); }                                       
        });
        return false;

    });

});