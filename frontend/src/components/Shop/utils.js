
function cartItemArray() {
    let itemSlugs = [];
    for (let i of this.props.cartItems) {
        itemSlugs.push(i.item.slug);
    }
    return itemSlugs
}