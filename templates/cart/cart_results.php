<tr class="cart_row">
	<td>
		<p>{name} ({id})<br>
			${price}<br>Qty: {order} 
			<input class="add_qty_btn" type="button" value="+" onclick="Cart.addToCart( '{id}' )">&nbsp;
			<input class="remove_qty_btn" type="button" value="-" onclick="Cart.removeFromCart( '{id}' )">
			<input type="hidden" name="item_name_{count}" value="{id} {name}">
			<input type="hidden" name="amount_{count}" value="{price}">
			<input type="hidden" name="quantity_{count}" value="{order}">
		</p>
	</td>
</tr>

