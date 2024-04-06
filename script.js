//----------------------------------------------------------------------------------
var vending_units_fr;
var vending_units_ar;
var measuring_units_fr;
var measuring_units_ar;
var selectedRow;
var selectedProductID;
var products;
var frProducts;
var arProducts;

function getUnits(){
	//MEASURING UNITS FR
    var xhttp1 = new XMLHttpRequest();
    xhttp1.open("GET", "http://195.179.193.245:80/units_fr", true);
    //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        measuring_units_fr = JSON.parse(this.responseText).units;
    	renderMeasuringUnitsFR();
    }
    };
    xhttp1.send();
	
	//MEASURING UNITS AR
	var xhttp2 = new XMLHttpRequest();
    xhttp2.open("GET", "http://195.179.193.245:80/units_ar", true);
    //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        measuring_units_ar = JSON.parse(this.responseText).units;
    	renderMeasuringUnitsAR();
    }
    };
    xhttp2.send();

	//VENDING UNITS FR
	var xhttp3 = new XMLHttpRequest();
    xhttp3.open("GET", "http://195.179.193.245:80/vending_units_fr", true);
    //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        vending_units_fr = JSON.parse(this.responseText).units;
    	renderVendingUnitsFR();
    }
    };
    xhttp3.send();

	//VENDING UNITS AR
	var xhttp4 = new XMLHttpRequest();
    xhttp4.open("GET", "http://195.179.193.245:80/vending_units_ar", true);
    //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp4.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        vending_units_ar = JSON.parse(this.responseText).units;
    	renderVendingUnitsAR();
    }
    };
    xhttp4.send();

}

function renderVendingUnitsFR(){
 	vending_units_fr.map(function(element){
        var option = document.createElement("option");
        option.setAttribute("value",element);
        option.innerText = element;
        document.getElementById("input_vendingUnitFR").appendChild(option);
    })
}
	
function renderVendingUnitsAR(){
    vending_units_ar.map(function(element){
        var option = document.createElement("option");
        option.setAttribute("value",element);
        option.innerText = element;
        document.getElementById("input_vendingUnitAR").appendChild(option);
    })
}
function renderMeasuringUnitsFR(){
    measuring_units_fr.map(function(element){
        var option = document.createElement("option");
        option.setAttribute("value",element);
        option.innerText = element;
        document.getElementById("input_measuringUnitFR").appendChild(option);
    })
}
function renderMeasuringUnitsAR(){
	measuring_units_ar.map(function(element){
        var option = document.createElement("option");
        option.setAttribute("value",element);
        option.innerText = element;
        document.getElementById("input_measuringUnitAR").appendChild(option);
    })
}

function getUnitIndex(unit, unitArray){
	for (var i=0;i<unitArray.length;i++){
    	if (unit == unitArray[i]){
        	return i;
        }
    }
	return 0;
}	

getUnits();

//-----------------------------------------------------------------------------------


function getProducts(){
	$.ajax({
    	type: 'get',
    	url: 'http://195.179.193.245:80/products',
    	data: '',
    	success: function(data) {
        	products = data;
            frProducts = data.filter(product => product.language === 'fr');
            arProducts = data.filter(product => product.language === 'ar');
        	renderProducts();
    	}
	});


	/*
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://195.179.193.245:80/products", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	//xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.responseText);
        renderProducts();
    }
    };
    xhttp.send("language=fr");
    */
}


function renderProducts(){
    frProducts.map(function(element){
        if (element.treated == "False"){
        	var row = document.createElement("tr");

        	var id = document.createElement("td");
        	id.innerText = element.id;
        	row.appendChild(id);

            var barcode = document.createElement("td");
        	barcode.innerText = element.barcode;
        	row.appendChild(barcode);

            var creator = document.createElement("td");
        	creator.innerText = element.creator;
        	row.appendChild(creator);

            var date = document.createElement("td");
        	date.innerText = element.creation_date.substring(0, 10);
        	row.appendChild(date);

            var time = document.createElement("td");
        	time.innerText = element.creation_time;
        	row.appendChild(time);

            var edit = document.createElement("td");
            var editBtn = document.createElement("input");
        	editBtn.setAttribute("type","button");
            editBtn.setAttribute("value","edit");
            editBtn.setAttribute("onclick","loadProductToEdit(this)");
            editBtn.setAttribute("data-id",element.id);
            edit.appendChild(editBtn);
        	row.appendChild(edit);
            document.getElementById("UT_count").innerText = "("+frProducts.filter(product => product.treated === 'False').length+"/"+frProducts.length+")";

        	document.getElementById("untreatedProductsTable").appendChild(row);
        }else{
            var row = document.createElement("tr");

        	var id = document.createElement("td");
        	id.innerText = element.id;
        	row.appendChild(id);

            var barcode = document.createElement("td");
        	barcode.innerText = element.barcode;
        	row.appendChild(barcode);

            var creator = document.createElement("td");
        	creator.innerText = element.creator;
        	row.appendChild(creator);

            var date = document.createElement("td");
        	date.innerText = element.creation_date.substring(0, 10);
        	row.appendChild(date);

            var time = document.createElement("td");
        	time.innerText = element.creation_time;
        	row.appendChild(time);

            var edit = document.createElement("td");
            var editBtn = document.createElement("input");
        	editBtn.setAttribute("type","button");
            editBtn.setAttribute("value","edit");
            editBtn.setAttribute("onclick","loadProductToEdit(this)");
            editBtn.setAttribute("data-id",element.id);
            edit.appendChild(editBtn);
        	row.appendChild(edit);

            document.getElementById("T_count").innerText = "("+frProducts.filter(product => product.treated === 'True').length+"/"+frProducts.length+")";
            document.getElementById("treatedProductsTable").appendChild(row);
        }
    })
}

getProducts();
//-----------------------------------------------------------------------------------

function loadProductToEdit(prod){
    if (selectedRow != null){
        selectedRow.style.backgroundColor = "";
    }
	$('#naturesListFR').html("");
    $('#naturesListFR').css("visibility","hidden");
	$('#naturesListAR').html("");
    $('#naturesListAR').css("visibility","hidden");

    selectedRow = prod.parentNode.parentNode;
    selectedRow.style.backgroundColor = "rgba(72, 141, 168, 0.637)";
	var productID = prod.getAttribute("data-id");
    selectedProductID = productID;
	var product = products.filter(product => product.id == productID);//ARRAY OF 1 CASE IF IS FRENCH, 2 CASES IF IT'S FR/AR PRODUCT

    document.getElementById("creatorName").innerText = product[0].creator;
    document.getElementById("input_barcode").value = normaliseText(product[0].barcode);
    document.getElementById("input_quantity").value = product[0].quantity;
    document.getElementById("creation_date").innerText = product[0].creation_date.substring(0,10);
	document.getElementById("creation_time").innerText = product[0].creation_time;

    product.map(function(element){
        if (element.language == "fr"){
			document.getElementById("input_measuringUnitFR").selectedIndex = getUnitIndex(element.measuring_unit,measuring_units_fr);
        	document.getElementById("input_natureFR").value = normaliseText(element.nature);
        	document.getElementById("input_brandFR").value = normaliseText(element.brand);
        	document.getElementById("input_typeFR").value = normaliseText(element.type);
        	document.getElementById("input_vendingUnitFR").selectedIndex = getUnitIndex(element.vending_unit,vending_units_fr);
        	document.getElementById("input_tasteFR").value = normaliseText(element.taste);
            document.getElementById("input_titleFR").value = getFrTitle();
        }else{
            document.getElementById("input_measuringUnitAR").selectedIndex = getUnitIndex(element.measuring_unit,measuring_units_fr);
        	document.getElementById("input_natureAR").value = normaliseText(element.nature);
        	document.getElementById("input_brandAR").value = normaliseText(element.brand);
        	document.getElementById("input_typeAR").value = normaliseText(element.type);
        	document.getElementById("input_vendingUnitAR").selectedIndex = getUnitIndex(element.vending_unit,vending_units_ar);
        	document.getElementById("input_tasteAR").value = normaliseText(element.taste);
            document.getElementById("input_titleAR").value = getArTitle();
        }
        renderImages(product[0].images,product[0].id);
    });
}

function renderImages(images,productID){
    document.getElementById("imagesContainer").innerHTML = "";
   images.map(function(imageName){
        var div = document.createElement("div");
   		div.setAttribute("class","imageContainer");

        var img = document.createElement("img");
        img.setAttribute("src","http://195.179.193.245:80/products/"+productID+"/images/"+imageName);
        img.setAttribute("onclick","openImageInNewTab(this)");

        var btn = document.createElement("input");
        btn.setAttribute("type","button");
        btn.setAttribute("value","delete");
        btn.setAttribute("data-imageName",imageName);
        btn.setAttribute("data-productID",productID);
        btn.setAttribute("style","display: block;");

        div.appendChild(img);
        div.appendChild(btn);
        document.getElementById("imagesContainer").appendChild(div);
   })
		var btnADD = document.createElement("input");
        btnADD.setAttribute("type","button");
        btnADD.setAttribute("value","+");
		btnADD.setAttribute("id","button_addImage");
        btnADD.setAttribute("style","display: grid;justify-items: center;align-items: center;");
		document.getElementById("imagesContainer").appendChild(btnADD);

}

function openImageInNewTab(image){
    window.open(image.getAttribute("src"), "_blank");
}


function getFrTitle(){
    let nature = document.getElementById("input_natureFR").value;
    let brand = document.getElementById("input_brandFR").value;
	let type = document.getElementById("input_typeFR").value;
    let quantity = document.getElementById("input_quantity").value;
    let measuring_unit = document.getElementById("input_measuringUnitFR").options[document.getElementById("input_measuringUnitFR").selectedIndex].value;
    let taste = document.getElementById("input_tasteFR").value;
    return nature +" "+ brand +" "+ type +" "+ quantity + measuring_unit +" gout "+ taste;
}

function updateFrTitle(){
    document.getElementById("input_titleFR").value = getFrTitle();
}
$('#input_natureFR, #input_brandFR, #input_typeFR, #input_quantity, #input_measuringUnitFR, #input_tasteFR').on('input',function(e){
    updateFrTitle();
});

function getArTitle(){
    let nature = document.getElementById("input_natureAR").value;
    let brand = document.getElementById("input_brandAR").value;
	let type = document.getElementById("input_typeAR").value;
    let quantity = document.getElementById("input_quantity").value;
    let measuring_unit = document.getElementById("input_measuringUnitAR").options[document.getElementById("input_measuringUnitAR").selectedIndex].value;
    let taste = document.getElementById("input_tasteAR").value;
    return nature +" "+ brand +" "+ type +" "+ quantity + measuring_unit +" ذوق "+ taste;
}

function updateArTitle(){
    document.getElementById("input_titleAR").value = getArTitle();
}
$('#input_natureAR, #input_brandAR, #input_typeAR, #input_quantity, #input_measuringUnitAR, #input_tasteAR').on('input',function(e){
    updateArTitle();
});
//-----------------------------------------------------------------------------------

function deleteProduct(){
    if (selectedProductID != null){
        var xhttp1 = new XMLHttpRequest();
        xhttp1.open("DELETE", " http://195.179.193.245:80/products/"+selectedProductID, true);
        //xhttp1.open("DELETE", " http://195.179.193.245:80/products/123456789", true);
        //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (JSON.parse(this.responseText).success){
                alert("produit supprimé avec succé");
                location.reload();
            }
        }
        };
        xhttp1.send();
    }
}

//-----------------------------------------------------------------------------------
function removeExtraWhitSpaces(text){
    var newText = text.replace(/ +/g, ' '); //Replace all multiWhiteSpaces with single whiteSpace
    newText = newText.replace(/^ +/g, ''); //remove whiteSpace at the begining
    newText = newText.replace(/ +$/g,''); //remove whiteSpace at the ending
    return newText;
}
function capitalizeFirstLetter(text){
    if (text.length>0){

        return (text.charAt(0).toUpperCase()+text.slice(1));
    }
    return "";
}


function normaliseText(text){
    text = removeExtraWhitSpaces(text);
    text = capitalizeFirstLetter(text);
    return text;
}

function updateProduct(){
    console.log(removeExtraWhitSpaces("      sim     saber   dzazd      "));
}


//-----------------------------------------------------------------------------------

$('#button_update').on('click',function(e){
    let data = {
        "barcode":$("#input_barcode").val(),
        "quantity":$("#input_quantity").val(),
        "measuring_unit":document.getElementById("input_measuringUnitFR").selectedIndex,
        fr:{
            "vending_unit":$("#input_vendingUnitFR").val(),
            "nature":$("#input_natureFR").val(),
            "brand":$("#input_brandFR").val(),
            "type":$("#input_typeFR").val(),
            "taste":$("#input_tasteFR").val(),
            "title":normaliseText($("#input_titleFR").val()),
        },
        ar:{
            "vending_unit":$("#input_vendingUnitAR").val(),
            "nature":$("#input_natureAR").val(),
            "brand":$("#input_brandAR").val(),
            "type":$("#input_typeAR").val(),
            "taste":$("#input_tasteAR").val(),
            "title":$("#input_titleAR").val(),
        }
    }
    if (selectedProductID != null){
        $.ajax({
            url: "http://195.179.193.245:80/products/"+selectedProductID,
            type: 'PUT',
            data: data,
            success: function (result) {
                if (result.success){
                	alert("Produit mis à jours !!!");
                }else{
                	alert("Erreur !!!");
                }
            }
        });
    }
});

$('#button_approuve').on('click',function(e){
    let data = {
        "approuve":true
    };
    if (selectedProductID != null){
        $.ajax({
            url: "http://195.179.193.245:80/products/"+selectedProductID,
            type: 'PUT',
            data: data,
            success: function (result) {
                if (result.success){
                	alert("Approuvé !!!");
                	location.reload();
                }else{
                	alert("Erreur !!!");
                }
            }
        });
    }
});

$('#input_measuringUnitFR').on('change',function(e){
    document.getElementById("input_measuringUnitAR").selectedIndex = document.getElementById("input_measuringUnitFR").selectedIndex;
});
$('#input_measuringUnitAR').on('change',function(e){
    document.getElementById("input_measuringUnitFR").selectedIndex = document.getElementById("input_measuringUnitAR").selectedIndex;
});

//-----------------------------------------------------------------------------------
$('#input_natureFR').on('input',function(e){
    if (e.target.value.length >0){
        $.ajax({
            url: "http://195.179.193.245:80/products/natures/"+e.target.value,
            type: 'get',
        	data: {language:'fr'},
            success: function (result) {
                $('#naturesListFR').html("");
                if (result.length>0){
                    $('#naturesListFR').css("visibility","visible");
                    if (result[0].nature.toLowerCase() === $('#input_natureFR').val().toLowerCase()){
                        $('#naturesListFR').css("visibility","hidden");
                    }else{
                        result.map(element => {
                            let p = document.createElement("p");
                            p.setAttribute("class","natureItem");
                            p.onclick = function(e){
                                $('#input_natureFR').val(normaliseText(this.innerText));
                                $('#naturesListFR').css("visibility","hidden");
                                $('#input_natureFR').focus();
                            };
                            p.innerText = element.nature;
                            $('#naturesListFR').append(p);
                        })
                    }
                }else{
                    $('#naturesListFR').css("visibility","hidden");
                }
            }
        });
    }else{
        $('#naturesListFR').html("");
        $('#naturesListFR').css("visibility","hidden");
    }
});

$('#input_natureAR').on('input',function(e){
    if (e.target.value.length >0){
        $.ajax({
            url: "http://195.179.193.245:80/products/natures/"+e.target.value,
            type: 'get',
            data: {language:'ar'},
            success: function (result) {
                $('#naturesListAR').html("");
                if (result.length>0){
                    $('#naturesListAR').css("visibility","visible");
                    result.map(element => {
                        let p = document.createElement("p");
                        p.setAttribute("class","natureItem");
                        p.onclick = function(e){
                            $('#input_natureAR').val(this.innerText);
                            $('#naturesListAR').css("visibility","hidden");
                            $('#input_natureAR').focus();
                        };
                        p.innerText = element.nature;
                        $('#naturesListAR').append(p);
                    })
                }else{
                    $('#naturesListAR').css("visibility","hidden");
                }
            }
        });
    }else{
        $('#naturesListAR').html("");
        $('#naturesListAR').css("visibility","hidden");
    }
});