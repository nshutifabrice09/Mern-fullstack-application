import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        
        const ProductWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                })
                return {
                    ...product._doc, //product information
                    stat,
                }
        })
        );
        
        res.status(200).json(ProductWithStats);  
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}