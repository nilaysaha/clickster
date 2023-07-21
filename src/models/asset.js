"use strict";
const DB = require("../db");
const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const dbInstance = new DB();
const sequelize = dbInstance.sequelizeConnectionStringInstance(
  process.env.DB_CONNETION_STRING
);

/* In the metadata entry of Mint model
   {
   'dataUrl': '',
   'dataHash':''
   }

   should be defined. This is fixed data format that is required for getting NFT data.

   To be specific:
   dataUrl, dataHash refers to the asset.json in arweave.
*/


const Mint = sequelize.define(
  "Mint",
  {
      mintID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
      },
      DaoName: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
      },
      mintType: {
          type: DataTypes.ENUM,
          values:["asset", "role"],
          defaultValue: "asset"
      },
      txId: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
      },
      txIndex: {
          type: DataTypes.INTEGER,
          allowNull: true,
          unique: false
      },
      clientAddrBech32: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      clientStakeAddrBech32: {
          type: DataTypes.STRING,
          allowNull: false
      },
      assetID: {
          type: DataTypes.STRING,
          allowNull: true
      },
      metadata: {
          type: DataTypes.JSONB,
          allowNull: true,
          defaultValue: null
      },
      cstatus: {
          type: DataTypes.ENUM,
          values:["platformPaid", "clientPaid", "mintDelayQCreated", "mintQueueSuccess",
                  "mintQueueFailed", "mintConfirmed","refundDelayQCreated",
                  "refundQueued", "refundPaid"],
          defaultValue: "clientPaid"
      },
      networkID: {
          type: DataTypes.ENUM,
          values: ['mainnet','preview','preprod'],
          allowNull: false,
          defaultValue: "preview"
      },
      mintTx: {
          type: DataTypes.JSONB,
          allowNull: true,
          defaultValue:{}
      },
      AmountPaid:{
          type: DataTypes.FLOAT,
          allowNull: true
      },
      CurrencyUnit: {
          type: DataTypes.STRING,
          allowNull: true
      },
      QueueType: {
          type: DataTypes.ENUM,
          values: ['mint', 'refund', 'awaitingVerifData', 'none'],
          allowNull: true,
          defaultValue: "mint"
      },
      numTries:{
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      submitTxID:{
          type: DataTypes.STRING,
          allowNull: true
      },
      archived: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false          
      },
      ttl: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0
      },
      policyid: {
          type: DataTypes.STRING,
          allowNull: true
      }
  },
  {
    schema: "mints",
    timestamps: true,
    createdAt: "creationTime",
    updatedAt: "lastModified",
  }
);


const MintInfo = sequelize.define(
  "MintInfo",
  {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
      },      
      assetID: {
          type: DataTypes.STRING,
          allowNull: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'vasset'
      },
      image: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      dataUrl: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      dataHash: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      dataType:{
          type: DataTypes.ENUM,
          values:['aggregatedAssetInfo'],
          defaultValue: 'aggregatedAssetInfo'
      },
      archived:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
  },
  {
      schema: "mints",
      timestamps: true,
      createdAt: "creationTime",
      updatedAt: "lastModified",
  }        
);


const RoleInfo = sequelize.define(
    "RoleInfo",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        txId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        roleDocs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        subscriptionLevel: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        expiryDate: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        schema: "mints",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)


const MerkleInfo = sequelize.define(
    "merkleInfo",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        tokenType: {
            type: DataTypes.ENUM,
            values:['role', 'asset'],
            defaultValue: 'asset',
            unique: true
        },
        pids: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false
        },
        txids: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false
        }
    },
    {
        schema: "mints",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)

const KYCInfo = sequelize.define(
    "kycInfo",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        assetID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerWallets: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false
        },
        ownerKYCInfo: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false
        }
    },
    {
        schema: "mints",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)



module.exports = {
    Mint,
    MintInfo,
    RoleInfo,
    MerkleInfo,
    KYCInfo
};
