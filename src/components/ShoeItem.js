export default function ShoeItem({name,price, brand, image, addItem, removeItem}){
    //see here how you are able to pass in a paramter and you do not have to tell it what the paramter is
   
    return (
        <div className = "surrounding">
            <h2> {name} </h2>
            <img src= {image}/>
            <h3> Cost: ${price}</h3>
            <h4>BRAND: {brand} </h4>
            <button className = "shoeButton" onClick={() => addItem(name,price)} > ADD TO CART</button>
            <button className = "shoeButton" onClick={() => removeItem(name,price)} > REMOVE FROM CART</button>
        </div>
    )
    
}