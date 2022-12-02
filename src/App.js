import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import shoeData from "./assets/shoe-data.json";
import ShoeItem from "./components/ShoeItem.js"
import CheckBox from './components/Checkbox.js';


shoeData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [count, setCount] = useState(0);
  const[cart, addCart] = useState([])

  
  function removeItem(item, price){
    console.log("this is being called at the moment");
    let tempList = [...cart]
    let newList = cart.filter(currItem => {return (currItem != item)})
    addCart(newList);
    if (newList.length != tempList.length) setCount(count - price)

  }
  const addItem = (item,price) => {
    let flag = false
    for (let i = 0; i < cart.length; i++){
      if(cart[i]==item) flag = true
    }
    if (!flag){
    addCart([...cart," ",item,])
    setCount(count + price)}
  }


  const [nikeChecked, setChecked] = useState(false);
  const [adidasChecked, asetChecked] = useState(false);
  const [sketchersChecked, ssetChecked] = useState(false);
  const [underChecked, usetChecked] = useState(false);
  const [overChecked, osetChecked] = useState(false);
  const [sortedA, ascending] = useState(false)
  const [sortedD, descending] = useState(false)
  const [state, currentShoes] = useState({
    shoes: shoeData
  })

  const allChecked = [
    [nikeChecked,setChecked, "Nike"],
    [adidasChecked,asetChecked, "Adidas"],
    [sketchersChecked,ssetChecked, "Sketchers"]
  ]
  const allHandlers = [
    [nikeChecked, setChecked],
    [adidasChecked,asetChecked],
    [sketchersChecked,ssetChecked],
    [underChecked,usetChecked],
    [overChecked, osetChecked],
    [sortedA, ascending],
    [sortedD, descending],
    ]    
  

  const numAscending = [...state.shoes].sort((a, b) => a.price - b.price);
  const numDescending = [...state.shoes].sort((a, b) => b.price - a.price);

  function reset(){
    for (let i =0; i< allHandlers.length; i++){
      let current = allHandlers[i]
      current[1](false)
    }
    currentShoes({shoes:shoeData});
    setCount(0);
    addCart([]);
  }

  function keepSorted(newShoes){
    console.log("inside", newShoes, sortedA, sortedD)
    if (sortedA || sortedD){
      if (sortedA){return [...newShoes].sort((a, b) => a.price - b.price) }
      else{ return [...newShoes].sort((a, b) => b.price - a.price) }
    }else{return  newShoes}
  }

  function exclude(brand){
    for (let i =0; i< 3; i++){
      if (allChecked[i][0] && allChecked[i][0] != brand){
        allChecked[i][1](!allChecked[i][0])
      }
  }
  }

  function handleFilter(checked, brand, func){
    let newShoes = shoeData;
    if (!checked){
      if(underChecked || overChecked){
        if (underChecked){newShoes = shoeData.filter(shoe => {return (shoe.brand == brand && shoe.price <=100)})} 
        else{newShoes = shoeData.filter(shoe => {return (shoe.brand == brand && shoe.price >= 100)})}
      }
      else{
        newShoes = shoeData.filter(shoe => {return (shoe.brand == brand)})
      }
      exclude(brand)
      }
    console.log("outside", newShoes)

    newShoes = keepSorted(newShoes);
    currentShoes({shoes:newShoes})
    func(!checked)
  }



  const handleNikeChange = (event) => {
    if (!nikeChecked) handleFilter(nikeChecked, "Nike", setChecked)
  };

  const handleAdidasChange = (event) => {
    if (!adidasChecked) handleFilter(adidasChecked, "Adidas", asetChecked)
  }

  const handleSketchersChange = () => {
    if(!sketchersChecked) handleFilter(sketchersChecked,"Sketchers", ssetChecked)
  }


  function reverse(){
    let newShoes = shoeData
    for (let i =0; i <3; i ++){
      if(allChecked[i][0]){
        if (overChecked){
          newShoes = shoeData.filter(shoe => {return (shoe.brand == allChecked[i][2] && shoe.price <=100)})
        }else{
          newShoes = shoeData.filter(shoe => {return (shoe.brand == allChecked[i][2] && shoe.price >=100)})
        }
      }
    }
    newShoes = keepSorted(newShoes);
    currentShoes({shoes:newShoes})
  }

  const handleUnder100 = () => {
    if (!underChecked){
      let newShoes = state.shoes;
      if (!underChecked){
        if(overChecked){
          reverse()
          osetChecked(!overChecked);
        }
        else{
          newShoes = newShoes.filter(shoe => {return (shoe.price <= 100)});
          newShoes = keepSorted(newShoes);
          currentShoes({shoes:newShoes})
        }
        }
      usetChecked(!underChecked);

    }

  }

  const handleOver100 = () => {
    if (!overChecked){
    let newShoes = state.shoes;
    if (!overChecked){
      if(underChecked){
        reverse()
        usetChecked(!underChecked);
      }
      else{
        newShoes = newShoes.filter(shoe => {return (shoe.price >= 100)})
        newShoes = keepSorted(newShoes);
        currentShoes({shoes:newShoes})
      }
      }
    osetChecked(!overChecked);
    }
  }

  const ascendingShoes = () => {
    if (!sortedA){
      currentShoes({shoes: numAscending})
      if (sortedD){
        descending(!sortedD)
      }
      ascending(!sortedA)
    }
  }

  const descendingShoes = () => {
    if (!sortedD){
      currentShoes({shoes:numDescending});
      if (sortedA){
        ascending(!sortedA)
      } 
      descending(!sortedD)
    }
  }
  


  

  return (
    <div className="App">
      <div className ="upper">
        <h1>Sneaker Junkies</h1> 
      <div className='upperPortion'>
      <h3>
        Your Total Cost : {count}
      </h3>
      <h4 className='cart'>
        Cart Items: {cart} 
      </h4>

    <p>Select The Brand That You Want!!</p>
      <div className='brandCheckboxes'>
        <CheckBox 
          label="Nike"
          value={nikeChecked}
          onChange={handleNikeChange}
        />
        <CheckBox
          label="Adidas"
          value={adidasChecked}
          onChange={handleAdidasChange}
        />

        <CheckBox
          label="Sketchers"
          value={sketchersChecked}
          onChange={handleSketchersChange}
        /> 
    </div>
    
    <div className='priceCheckboxes'>
    <p>Select The Price Range That You Are Looking For!</p>
      <CheckBox
              label="Under $100 "
              value={underChecked}
              onChange={handleUnder100}
      />
          <CheckBox
              label=" Over $100 "
              value={overChecked}
              onChange={handleOver100}
      />
    </div>

    <div className='sortingCheckboxes'>
    <p>Select The Price Range That You Are Looking For!</p>
      <CheckBox
              label="Low to High"
              value={sortedA}
              onChange={ascendingShoes}/>
          <CheckBox
              label="High to Low"
              value={sortedD}
              onChange={descendingShoes}/>
      </div>
    <div>
    <button className='button-18' onClick={() => reset()}> RESET </button>
        </div>
      </div>       
    </div>



    <div className= "shoeItems">
    {state.shoes.map((item, index) => ( 
        <ShoeItem   name = {item.name} 
                    price = {item.price} 
                    brand = {item.brand}
                    image = {item.image}
                    addItem = {addItem}
                    removeItem = {removeItem}/>
      ))}
    </div>

    </div>
  );
}



export default App;
