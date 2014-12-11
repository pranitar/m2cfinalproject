$(function(){

    //call getJSON when myform is submitted
    $('#addrecipe').submit(function() {

        console.log("submit form");
        var url = "/recipes?" + "name=" + $("#rname").val() + "&cuisine=" + $("#rcuisine").val();
        $.ajax({
            url: url,
            type: "POST",
            data: {
                name: $("#rname").val(),
                cuisine: $("#rcuisine").val(),
                ingredients: $("#ingredientName").val()
            }
        }).done(function(data) {
            console.log("here");
            console.log(data);
        }).fail(function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        });
        return false;   
    });

    //purpose of submit button - what it should do upon click
	$("#eg1").submit(function() {
        var search = $("#search").val();
        var ingred1 = $("#ingred1").val();
        var ingred2 = $("#ingred2").val();
        var ingred3 = $("#ingred3").val();
		if(search ==="" && ingred1 ==="" && ingred2 ==="" && ingred3 ==="")
        {
			return false;
		}
    
    //ajax request to 3rd party server - Yummly - puts in custom ingredients from user
        var url = "http://api.yummly.com/v1/api/recipes?_app_id=768ca507&_app_key=1804ef80e21e0962f2918eb62c2a754a&q="+search+"&allowedIngredient[]="+ingred1+"&allowedIngredient[]="+ingred2+"&allowedIngredient[]=" + ingred3+"&requirePictures=true";
        $.ajax({                                                                            
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            success: function(data) { 
                for (var i = 0; i < data.matches.length; i++) {
                    console.log(data);
                    $("#pics").append("<center><a href='http://www.yummly.com/recipe/"+ data.matches[i].id +"'><img src='" + data.matches[i].smallImageUrls[0] + "' class='insta'></img></a></center>");
                } 
            },
            error: function(data, data2) { console.log(data); }                                       
        });
        return false;

    });

});