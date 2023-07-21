"use strict"

const assert = require('assert');
const { expect } = require('chai')
const request = require('supertest');
const { Asset, Category, Collection } = require('./model/asset')

describe('Check Asset API basic completeness', () => {    
    // before(async () => {
    //     await Asset.sync({ force: true });
    // });

    // after(async () => {
    //     await Asset.sync({ force: true });
    // });

    const url = process.env.APP_URL;
    const requestInstance = request(url);
    
    it('should add a new Asset', async () => {

        const assetPayload = {
            title: 'sampleAsset',
            type: 'document',
            categories: ['category_1','category_2']
        }
        
        const res = await requestInstance
            .post('/asset')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send(assetPayload);

        console.log('---------TEST RESULTS-----------')
        console.log(res.body)
        
        assert.equal(res.status, 201);
        assert.equal(res.body.type, assetPayload['type'])
    });
})

