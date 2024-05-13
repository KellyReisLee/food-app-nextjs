import sql from 'better-sqlite3'


// Stablish a database connection by executing SQL as a function, 
//and passing the name of the database as a parameter.
const db = sql('meals.db')


export async function getMeals() {
  // await new Promise((resolve) => setTimeout(() => {
  //   resolve
  // }, 2000))


  return db.prepare('SELECT * FROM meals').all()

}

export async function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}