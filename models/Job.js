const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({

    position: {
        type: String,   
    },
    company: {
        type: String,
       
        
    },
    
    location: {
        type: String,
       
        
    },
    status: {
        type: String,
       
    },
    type: {
        type: String,
       
    }
}, {
    timestamps: true
})  
    

const Job = mongoose.model("jobifyJob", jobSchema)
module.exports = Job