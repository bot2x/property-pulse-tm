import {
    Schema, model, models, Types
} from "mongoose";


const PropertySchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    location : {
        street : {
            type : String
        },
        city : {
            type : String
        },
        state : {
            type : String
        },
        zipcode : {
            type : String
        }
    },
    beds : {
        type : Number,
        required : true
    },
    baths : {
        type : Number,
        required : true
    },
    square_feet : {
        type : Number,
        required : true
    },
    amenities : [
        {
            type : String
        }
    ],
    rates : {
        nightly : {
            type : Number
        },
        weekly : {
            type : Number
        },
        monthly : {
            type : Number
        }
    },
    seller_info : {
        name : {
            type : String
        },
        email : {
            type : String
        },
        phone : {
            type : String
        }
    },
    images : [
        {
            type : String
        }
    ],
    is_features : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true
});


export interface IProperty {
    _id : string,//Schema.Types.ObjectId,
    owner : Schema.Types.ObjectId,
    name : string,
    type : string,
    description? : string,
    location? : {
        street? : string,
        city? : string,
        state? : string,
        zipcode? : string,
    },
    beds : number,
    baths : number,
    square_feet : number,
    amenities? : string[],
    rates? : {
        nightly? : number,
        weekly? : number,
        monthly? : number,
    },
    seller_info? : {
        name? : string,
        email? : string,
        phone? : string,
    },
    images : string[] | any[],
    is_features : boolean,
    createdAt : string,
    updatedAt : string,
}

const Property = models.Property || model("Property", PropertySchema);

export default Property;