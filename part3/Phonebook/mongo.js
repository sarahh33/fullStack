const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }


  const password = process.argv[2]

const url =
`mongodb+srv://fullStack:${password}@cluster0.wxvsp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

const Phone = mongoose.model('Person', phoneSchema)

if (process.argv.length > 3) {
 const phone = new Phone({
  name: process.argv[3],
  date: new Date(),
  number: process.argv[4],
})

phone.save().then(result => {
  console.log(`added ${phone.name} ${phone.number} to the phonebook`)
  mongoose.connection.close()
})
}



if (process.argv.length == 3) {
  Phone.find({}).then(result => {
    result.forEach(phone => {
      console.log(phone)
    })
    mongoose.connection.close()
  })
  }
