angular.module('cheapNerfToyGunPartsApp',[]);(function(){angular.module('cheapNerfToyGunPartsApp').filter('gunCategory',gunCategoryFunction);angular.module('cheapNerfToyGunPartsApp').controller('mainController',mainControllerFunction);function mainControllerFunction($scope,Guns,RandomOrderNumber){$scope.categories=categories;$scope.instock_categories=[];$scope.guns=!1;$scope.view_menu=!0;$scope.view_cart=!1;$scope._category;$scope.order=[];$scope.order_number="";$scope.sub_total=0;$scope.weight=0;if($scope.guns===!1){Guns.getGuns().then(setGuns)}
$scope.getCategoryItems=function(category){$scope._category=category;$scope.showHideMenu()};$scope.addToCart=function(gun){RandomOrderNumber.getRandomOrderNumber().then(setOrderNumber);addToCart(gun)};$scope.removeFromCart=function(id){removeFromCart(id)};$scope.getTotal=getTotal;$scope.orderSubmit=orderSubmit;function addToCart(id){$scope.view_cart=!0;var incart=checkCart(id);if(incart==!1){addGun(id)}else{addQty(id)}
updateCart();function checkCart(id){if($scope.order.length<1){return!1}else{for(var i=0;i<$scope.order.length;i++){if(id==$scope.order[i].id){return!0}}}
return!1}
function addGun(id){var gun_obj=returnGunObj(id);$scope.order.push(gun_obj);function returnGunObj(id){for(var i=0;i<$scope.guns.length;i++){if(id==$scope.guns[i].id){return $scope.guns[i]}}}}
function addQty(id){for(var i=0;i<$scope.order.length;i++){if(id==$scope.order[i].id){var item_index=i;$scope.order[i].order+=1}}
if($scope.order[item_index].order>$scope.order[item_index].stock){$scope.order[item_index].order=$scope.order[item_index].stock}}}
function removeFromCart(id){console.log("removeFromCart");var qty=checkQty(id);if(qty>0){minusQty(id)}else{removeGun(id)}
updateCart();function checkQty(id){for(var i=0;i<$scope.order.length;i++){if(id==$scope.order[i].id){return $scope.order[i].order}}}
function minusQty(id){for(var i=0;i<$scope.order.length;i++){if(id==$scope.order[i].id){$scope.order[i].order-=1;console.log(JSON.stringify($scope.order[i]))}}}
function removeGun(id){for(var i=0;i<$scope.order.length;i++){if(id==$scope.order[i].id){$scope.order.splice(i,1);break}}
if($scope.order.length<1){if(localStorage.getItem("myorder")!==null){localStorage.removeItem("myorder")}}}}
function updateCart(){clearShipAndTotal();setWeightAndSubTotal();updateLocalStorage();if($scope.order.length<1&&localStorage.getItem("myorder")!==null){$scope.order=JSON.parse(localStorage.getItem("myorder"))}
var cart=JSON.stringify($scope.order);function updateLocalStorage(){if($scope.order.length>0){if(localStorage.getItem("myorder")!==null){localStorage.removeItem("myorder")}
localStorage.setItem("myorder",cart)}}
function setWeightAndSubTotal(){var weight=0;var sub_total=0;angular.forEach($scope.order,function(value,key){weight=weight+(value.weight*value.order);sub_total=sub_total+(value.price*value.order)});$scope.weight=weight;$scope.sub_total=sub_total}}
function getTotal(){$("#first_name").val($("#first_name_input").val());$("#last_name").val($("#last_name_input").val());$("#address1").val($("#address1_input").val());$("#city").val($("#city_input").val());$("#state").val($("#state_input").val());$("#zip").val($("#zip_input").val());var cart=JSON.stringify($scope.order);$.ajax({type:'POST',cache:!1,data:{cart:cart,zip:$("#zip_input").val()},url:'process/process_cart.php',success:function(data,status,xml){displayTotal(data)}});function displayTotal(data){if(data.indexOf("|")===0){alert("Error Connecting to Shipping Service!\nMake sure you entered valid information.")}else{var ship_and_total=data.split("|");$("#shipping").val(ship_and_total[0]);$("#shipping_cost_span").html("Shipping: $"+ship_and_total[0]);$("#total_span").html("Total: $"+ship_and_total[1]);$("#order_submit").removeClass("hide")}}}
function clearShipAndTotal(){$("#shipping_cost_span").html("");$("#total_span").html("");$("#order_submit").addClass("hide")}
function orderSubmit(){var valid=!0;var required_array=[$("#first_name"),$("#last_name"),$("#address1"),$("#city"),$("#state"),$("#zip")];required_array.forEach(validateFields);if(valid===!1){alert("Please enter shipping information and click\nGet Total button")}else{document.getElementById('CustomToyGunsOrder').submit()}
function validateFields(item){if(item.val()===""){valid=!1}}}
function setGuns(response){$scope.guns=response.data;$scope._category=$scope.guns[0];returnOutOfStock()}
function setOrderNumber(response){$scope.order_number=response.data}
function returnOutOfStock(){for(var i=0;i<$scope.guns.length;i++){var current_category=$scope.guns[i].category;if($scope.instock_categories.indexOf(current_category)>=0){continue}
$scope.instock_categories.push(current_category)}}
$scope.showHideMenu=function(){$scope.view_menu=$scope.view_menu?!1:!0};$scope.toggleCartView=function(){$scope.view_cart=$scope.view_cart?!1:!0};$scope.menuButtonClass=function(category){if($scope.instock_categories.indexOf(category)<0){return "btn btn-default disabled"}
return "btn btn-default"}}
function gunCategoryFunction(){return function(array_of_guns,filter_query){if(!array_of_guns)
return array_of_guns;if(!filter_query)
return array_of_guns;var expected=(''+filter_query).toLowerCase();var result=[];angular.forEach(array_of_guns,function(value,key){var actual=(''+value.category).toLowerCase();if(actual===expected){result.push(array_of_guns[key])}});return result}}})()