import { getProductsUrl } from "./urls"

export const getProductList = async (searchQuery)=>{
    try{
        let response = await fetch(`${getProductsUrl}/search?q=${searchQuery}&select=title,price,images`);
        response = await response.json();
        return response;
    }catch(e){
        console.error(e);
    }
}