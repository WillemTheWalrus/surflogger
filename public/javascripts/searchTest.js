$(document).ready(function() {
	var i;
	for( i = 0; i < data.groups.length; i++){
		$('#groupQuery').append('<p id="groupName' + i + '">' + data.groups[i] + '</p>').hide();
	}
});

$('#searchBar').keyup(function(){
	var textInput = this.value;
	var k;
	for( k = 0; k < data.groups.length; k++){
		if(data.groups[k].includes(textInput)){
			$('#groupName' + k.toString()). show();
		}
	}
});
