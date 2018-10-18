$(document).ready(function(){
	$("#searchBar").on('keyup', function() {
		var textInput = $(this).val();
		//$("#test").text(textInput);
		$.post('http://surfreportbuddy.com/groups/groupQuery',
			{
				groupName: textInput 
			},
		
			function(data, status) {
				//remove previous results
				$(".searchResult").remove();
					
				//build the html for each search result
				var i;
				for(i = 0; i < data.groups.length; i++){
					
					$('<div class="searchResult"></div>').attr({
						id: 'group'+i
					}).text(data.groups[i]).appendTo('#groupQuery');
					
					//$("#groupQuery").append('<p class="data">' + data.groups[i] + '</p>');	
					//$("#groupQuery").append('<p>test text</p>');

				}
			});

	});
});


