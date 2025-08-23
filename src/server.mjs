import app from './app.mjs'
import db from './db.mjs'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  db.then(() => {
    console.log(`Server is running on port ${PORT}`)
  }).catch((error) => {
    console.error('Database connection error:', error)
  })
})