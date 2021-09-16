const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username){
          console.log("Im in the if statement")
        const existing = bcrypt.compareSync(password, users[i].passwordHash)
          if (existing) {
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            console.log(userToReturn)
            res.status(200).send(userToReturn)
            return
          }
        }

        // if (users[i].username === username && users[i].password === password) {
        //   res.status(200).send(users[i])
        // }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {

        const { password, username, email, firstName, lastName } = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)

        let newUserObj = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        console.log('Registering User')
        console.log(newUserObj)
        users.push(newUserObj)
        res.status(200).send(req.body)
        console.log(users)
    }
}