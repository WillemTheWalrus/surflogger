function validateForm(){
	var pass = document.forms["createForm"]["password"].value;
	var repeatpass = document.forms["createForm"]["passwordretype"].value;

	if(pass != repeatpass){
		alert("the passwords do not match");
		return false}
}

