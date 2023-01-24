import { backEndApi } from "../../api/backEndApi"

export const putProduct= async (product)=>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
    };
    try{

        const resp = await backEndApi.put(`/products/${product.id}`,product, config)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}