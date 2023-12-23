import Header from "./Components/Header/Header";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import ContextProvider from "./Components/Context/ContextProvider";
import CartForm from "./Components/Customer/CartForm";

const App =()=> {
  const [showCart,setShowCart]=useState(false)

  const showCartOnScreen=()=>{
    setShowCart(true)
  }

  const hideCartFromScreen=()=>{
    setShowCart(false)
  }

  return (
    <ContextProvider>
      <Header onShow={showCartOnScreen}/>
      {showCart && <Cart onClose={hideCartFromScreen}/>}
      <Dashboard/>
      <CartForm />
    </ContextProvider>
  );
}

export default App;
