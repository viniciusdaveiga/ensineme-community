const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')

const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['token']
  return token
}

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        'SELECT user_id, email, name, age, phone, course, semester, university FROM users WHERE user_id = $1',
        [id]
      )

      if (!rows.length) {
        throw new Error('401 not authorized')
      }

      let user = { 
        id: rows[0].user_id, 
        email: rows[0].email, 
        name: rows[0].name,
        age: rows[0].age,
        phone: rows[0].phone,
        course: rows[0].course,
        semester: rows[0].semester,
        university: rows[0].university
      }

      return await done(null, user)
    } catch (error) {
      console.log(error.message)
      done(null, false)
    }
  })
)
