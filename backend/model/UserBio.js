const mongoose = require('mongoose');

const bioSchema = new mongoose.Schema({
    bioText:{type:String, default:null},
    liveIn:{type:String, default:null},
    relationship:{type:String, default:null},
    workplace:{type:String, default:null},
    education:{type:String, default:null},
    phone:{type:String, default:null},
    hometown:{type:String, default:null},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
},{timestamps: true})


const Bio = mongoose.model('Bio', bioSchema)
module.exports = Bio;