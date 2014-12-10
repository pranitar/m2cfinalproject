$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#f1').on('submit',function(event) {
        var displayText = "";
        event.preventDefault();
        $.ajax({
		url: "artist/"+ $("#firstname").val()+ "/"+ $("#lastname").val(),
		type: "POST",
		data: {
			firstname: $("#firstname").val(),
		    lastname: $("#lastname").val(),
		    band: $("#band").val(),
		    genre: $("#genre").val()
		},
		success: function(data) {
			$('#div1').html(data);
		}
	});
		return false;	
	});
}); // onReady

$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#f2').on('submit',function(event) {
    	event.preventDefault();
    	var aj = $.ajax({
		url: "artist/"+ $("#firstnameput").val()+ "/"+ $("#lastnameput").val()+ "/"+ $("#bandput").val()+ "/"+ $("#genreput").val(),
		type: "PUT",
		data: {
			firstname: $("#firstnameput").val(),
		    lastname: $("#lastnameput").val(),
		    band: $("#brandput").val(),
		    genre: $("#genreput").val()
		},success: function(data) {
			$('#div2').html(data);
		}
	});
		return false;	
	});
});

$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#f3').on('submit',function(event) {
    	event.preventDefault();
    	var aj = $.ajax({
		url: "artist/"+ $("#firstnamedelete").val()+ "/"+ $("#lastnamedelete").val(),
		type: "DELETE",
		data: {
			firstname: $("#firstnamedelete").val(),
		    lastname: $("#lastnamedelete").val(),
		},success: function(data) {
			$('#div3').html(data);
		}
	});
		return false;	
	});
});

$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#f4').on('submit',function(event) {
    	event.preventDefault();
    	var aj = $.ajax({
		url: "artist/"+ $("#firstnameget").val()+ "/"+ $("#lastnameget").val(),
		type: "GET",
		data: {
			firstname: $("#firstnameget").val(),
		    lastname: $("#lastnameget").val(),
		},success: function(data) {
			$('#div4').html(data);
		}
	});
		return false;	
	});
});



/* 
$(function() {
	$("#f1").on('submit', doPost(event));
	$("#f2").submit(doPut);
	} );

 * This is the basic form for an Ajax POST
 */

			