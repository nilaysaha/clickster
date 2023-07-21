"use strict";

require('dotenv').config();
const { Asset, Category, Collection, Asset2Category } = require('./model/asset')
const {
    init_or_find_category,
    map_asset_to_category,
    reconstruct_asset_information
} = require('./assetlib')

const proutes  = async (fastify) => {

    if (process.env.DEBUG == 'true') {
	await Asset.sync({ force: true });
	await Category.sync({ force: true });
	await Collection.sync({ force: true });
        await Asset2Category.sync({force: true});
    }

    /*
      Sample asset payload:
      {
        "type": "document",
        "categories": ["c1", "c2"]
      }
    */
    fastify.post('/asset', async (request, reply) => {
        try
        {
            const { body } = request
            
            //validate input
            if (body.hasOwnProperty('type')  && body.hasOwnProperty('categories')){

                //First create an asset entry
                const payload = {
                    type: body.type
                }
                
                let newAsset = await Asset.create(payload);
                newAsset = newAsset.toJSON()

                console.log(body.categories)
                
                //Now create categories if they do not exist
                const categories  =  Promise.all(body.categories.map(async(c) => {
                    console.log(`dealing with category:${c}`)
                    const c1 = await init_or_find_category(c, "sample category")
                    console.log(c1)
                    return c1
                }))

                console.log('--------------MAPPING ASSET TO CATEGORY-----------------')
                
                //Now map asset to categories
                const cmapping = Promise.all(body.categories.map( async(c) => {
                    await map_asset_to_category( newAsset.id, c.id )
                }))                

                return reply.status(201).send(newAsset);
            }
            else
            {
                throw new Error("Could not find input parameters")
            }                           
        }
        catch(err){
            console.error(err)
        }
    })
    
    fastify.get('/asset/:assetID', async (request, reply) => {
        try{
            const { assetID } = request.params
            
            //First fetch the asset info
            if (assetID == null   || assetID == undefined){
                throw new Error('empty or undefined assetID passed')
            }
            else{
                const payload = reconstruct_asset_information(assetID)
                return reply.status(201).send(payload);
            }
            
        }
        catch(err){
            console.error(err)
        }
    
    })

}


module.exports = {
    proutes
}
