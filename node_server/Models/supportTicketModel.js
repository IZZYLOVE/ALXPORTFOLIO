const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')


const supportTicketSchema = new mongoose.Schema(
{

    "Topic": {type: String, required: [true, 'Please enter topic'], trim: true}, 

    
    // not required in the user inpute form
    "status": {type: String, default: 'closed', required: true, trim: true},
    "createdBy": {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Please complete the hidden field createdBy'],
        trim: true
    },
    "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
supportTicketSchema.post('save', async function(doc, next){
    const logFile = await AutoLogFile()
    const content = `A new support ticket document with code ${doc.Code} and topic ${doc.Topic} created by ${doc.createdBy} on ${doc.created}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
    })
    next()
})


supportTicketSchema.pre(/^find/, async function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now()
    next()
})


supportTicketSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.find({releaseDate: {$lte: Date.now()}})
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
    })
    next()
})


// AGGREGATION MIDDLEWARES
supportTicketSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('supportTicket', supportTicketSchema)