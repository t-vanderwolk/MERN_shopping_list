const  mongoose  = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

//  hashed pw 
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})
// pw matches 
userSchema.methods.pwMatches = async function(eneteredPw) {
    return await bcrypt.compare(eneteredPw, this.password)
}


const User = mongoose.model("User", userSchema)

module.exports = User 