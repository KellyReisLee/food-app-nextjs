import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import { v4 as uuid } from 'uuid'
import fs from 'node:fs'


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

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const fileName = `${meal.slug}${uuid()}.${extension}`
  console.log(fileName);

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!')
    }
  })

  meal.image = `/images/${fileName}`

  db.prepare(`
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES(
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
  )
  
  `).run(meal)
}

//Delete item from database

export async function deleteMeal(id) {


  try {
    const deleteStatement = db.prepare('DELETE FROM melas WHERE id = ?')
    const result = deleteStatement.run(id)

    // Verificar se o elemento foi excluído com sucesso
    if (result.changes === 1) {
      console.log(`Elemento com ID ${id} excluído com sucesso.`);
    } else {
      console.log(`Não foi possível excluir o elemento com ID ${id}.`);
    }

  } catch (error) {
    console.error('Erro ao excluir elemento:', error);
  }
  db.close
}