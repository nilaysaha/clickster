"use strict"

require('dotenv').config();
const { Asset, Category, Collection } = require('./models/asset') 


const init_or_find_category = async (title, description) => {
    try {
        if ((title == null )  || (title == undefined)){
            throw new Error("Empty or undefined title param for creating category")
        }
        else{

            return  await Category.findOrCreate({
                where: { title: title },
                raw : true
            })
           
        }
    }
    catch(err)
    {
        console.error(err)
    }
    
}

const map_asset_to_category = async( assetID, categoryID){
    try{
        if ((assetID == null )  || (categoryID == null)){
            throw new Error("Empty or undefined assetid/categoryid param for creating category")
        }
        else{

            return  await Asset2Category.findOrCreate({
                where: { assetid: assetID, categoryid: categoryID },
                raw : true
            })
           
        }        
    }
    catch(err){
        console.error(err)
    }
    
}

const reconstruct_asset_information = async (assetID){
    try{
        //First fetch the asset info
        if (assetID == null   || assetID == undefined){
            throw new Error('empty or undefined assetID passed')
        }
        else
        {
            const categories = []
            
            const asset = Asset.findOne({
                where: { id: assetID },
                raw: true
            })

            if (asset != null){

                categories = Asset2Category.find({
                    where: { assetid : asset.id },
                    raw: true
                })
            }

            return {
                asset,
                categories
            }
        }
        
        //then fetch all the category info for the asset
                
    }
    catch(err){
        console.error(err)
    }
}





module.exports = {
    init_or_find_category,
    map_asset_to_category,
    reconstruct_asset_information
}
