"use strict";
const { DB } = require("../db");
const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const dbInstance = new DB();
const sequelize = dbInstance.connect();

const Asset = sequelize.define(
  "Asset",
  {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
      },
      type: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "document"
      }
  },
    {
        schema: "cliplists",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)


const Category = sequelize.define(
  "Category",
  {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
      },
      title: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "sample description"
      }
  },
    {
        schema: "cliplists",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)


const Collection = sequelize.define(
  "Collection",
  {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false
      }
  },
    {
        schema: "cliplists",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)


const Asset2Category = sequelize.define(
    "Asset2Category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        assetid: {
            type: DataTypes.UUID,
            references: {
                model: 'Assets',
                key: 'id'
            }
        },
        categoryid: {
            type: DataTypes.UUID,
            references:{
                model: 'Categories',
                key: 'id'
            }
        }
    },
    {
        schema: "cliplists",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)


const Collection2Category = sequelize.define(
    "Collection2Category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        collectionId: {
            type: DataTypes.UUID,
            references: {
                model:'Collections',
                referencesKey: 'id'
            }
        },
        categoryid: {
            type: DataTypes.UUID,
            references: {
                model:'Categories',
                referencesKey: 'id'
            }            
        }
    },
    {
        schema: "cliplists",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)


const Collection2Asset = sequelize.define(
    "Collection2Asset",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        collectionId: {
              type: DataTypes.UUID,
            references: {
                model:'Collections',
                key: 'id'
            }
        },
        assetid: {
            type: DataTypes.UUID,
            references:{
                model:  'Assets',
                key: 'id'
            }        
        }
    },
    {
        schema: "assets",
        timestamps: true,
        createdAt: "creationTime",
        updatedAt: "lastModified",
    }
)



module.exports = {
    Collection,
    Category,
    Asset,
    Asset2Category
}


