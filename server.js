require("dotenv").config()
let usersp = require('./models/user')
const express = require("express")
var bodyParser = require("body-parser");
bodyParser = bodyParser.urlencoded({ extended: true });
let mongoose = require("mongoose");
const app = express()

mongoose.connect("mongodb+srv://abidzied23:i7a2LBpHcDqVodDp@cluster0.dltp0tt.mongodb.net/cluster0")
    .then(() => console.log("db connected"))
    .catch(() => console.log("error"))

//create user when use the route create_user with form
app.get('/create_user', (req, res) => {
    res.send("<form action='/form' method='post'> <input type='text' name='username'/> <input type='text' name='age'/> <input type='password' name='password'> <button>send</button> </form>")

})
app.post('/form', bodyParser, (req, res) => {
    console.log(req.body)
    res.end()
    let user = new usersp({
        user_name: req.body.username,
        password: req.body.password,
        age: req.body.age

    })
    user.save().then(doc => {
        console.log(doc)
    })
        .catch(err => {
            console.error(err)
        })
})
//display all users
app.get('/all_users', (req, res) => {
    usersp.find().then(doc => {
        console.log(doc)
    })
        .catch(err => {
            console.error(err)
        })
})
//update document when go to the route change_user
app.put('/change_user', bodyParser, (req, res) => {
    res.send('update document')
    usersp.findOneAndUpdate(
        { user_name: 'ahmed10' },
        { user_name: 'ahmed22' },
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
    res.end()
})
//delete documentwhen use route delete_user
app.delete('/delete_user', (req, res) => {
    usersp.findByIdAndRemove(
        { _id: '64956485080bdc18dcc98d9b' }).then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })

})


app.listen(3000, () => console.log("connected"))



//i7a2LBpHcDqVodDp
//mongodb+srv://abidzied23:<password>@cluster0.dltp0tt.mongodb.net/