import { useState , useEffect} from "react";
import AuthContext from "./AuthContext";


const ContextProvider=(props)=>{
    const [cart,setCart]=useState([])
    const [availableStocks,setAvailableStocks]=useState([
        {MedicineName:'Dolo' , MedicinePrice: 20 , MedicineQuantity:100},
        {MedicineName:'Paracetamol' , MedicinePrice: 10 , MedicineQuantity:10}
    ])
    const [Quantity,setQuantity]=useState(0)

    const AvailableStockHandler =(Medicine) => {
        const isExistingStock = availableStocks.find(
          (obj) => obj.MedicineName === Medicine.MedicineName
        );
        
        if (isExistingStock) {
          setAvailableStocks((prev) =>
            prev.map((medicine) => {
              if (medicine.MedicineName === Medicine.MedicineName) {
                return {
                  ...medicine,
                  MedicineQuantity: parseInt(medicine.MedicineQuantity) + parseInt(Medicine.MedicineQuantity),
                  MedicinePrice : Medicine.MedicinePrice
                };
              }
              return medicine;
            })
          );
        } else {
          setAvailableStocks((prev) => [...prev, Medicine]);
        }
      };
      
 
    
      const cartItem = (Medicine) => {
        const isExistingCart = cart.find((obj) => obj.MedicineName === Medicine.MedicineName);
        
        if (isExistingCart) {
          setCart((prev) =>
            prev.map((medicine) => {
              if (medicine.MedicineName === Medicine.MedicineName) {
                return {
                  ...medicine,
                  MedicineQuantity: parseInt(medicine.MedicineQuantity) + parseInt(Medicine.MedicineQuantity),
                };
              }
              return medicine;
            })
          );
        } else {
          setCart((prev) => [...prev, Medicine]);
        }
        setAvailableStocks((prev) =>
            prev.map((medicine) => {
              if (medicine.MedicineName === Medicine.MedicineName) {
                return {
                  ...medicine,
                  MedicineQuantity: parseInt(medicine.MedicineQuantity) - parseInt(Medicine.MedicineQuantity),
                };
              }
              return medicine;
            })
          );
      };
      
    
    useEffect(()=>{
        let quantity=0
        cart.map((medicine)=>{
            quantity += medicine.MedicineQuantity
            return quantity
        })
        setQuantity(quantity)
    },[cart])

    const value={
        stock:availableStocks,
        onStock:AvailableStockHandler,
        cartItems:cart,
        onCart:cartItem,
        cartQuantity:Quantity
    }

    return(
       <AuthContext.Provider value={value}>
        {props.children}
       </AuthContext.Provider>
    )
}

export default ContextProvider