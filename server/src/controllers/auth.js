const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, email, name, age, phone, course, semester, university from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  const { email, password, age, phone, name, course, semester, university } = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await db.query('insert into users(email,password,age,phone,name,course,semester,university) values ($1 , $2, $3, $4, $5, $6, $7, $8)', [
      email,
      hashedPassword,
      age,
      phone,
      name,
      course,
      semester,
      university
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.update = async (req, res) => {
  const { age, phone, name, course, semester, university } = req.body;
  const { user_id } = req.user;

  try {
    await db.query(
      'UPDATE users SET age = $1, phone = $2, name = $3, course = $4, semester = $5, university = $6 WHERE user_id = $7',
      [age, phone, name, course, semester, university, user_id]
    );

    return res.status(200).json({
      success: true,
      message: 'Update successful',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    // const userName = req.user.name;
    // const userEmail = req.user.email;
    // console.log(userName)
    // console.log(userEmail)
    return res.status(200).json({
      info: 'Teste de vídeos',
      name: req.user.name,
      age: req.user.age,
      phone: req.user.phone,
      course: req.user.course,
      semester: req.user.semester,
      university: req.user.university
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
