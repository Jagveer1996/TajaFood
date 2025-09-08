import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const genToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    return token // ✅ This must be a string
  } catch (error) {
    console.error('gentoken_error:', error)
    return null
  }
}

export default genToken