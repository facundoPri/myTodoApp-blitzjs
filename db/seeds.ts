import { SecurePassword } from "blitz"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  const password = "pepepipi123"
  const hashedPassword = await SecurePassword.hash(password.trim())
  await db.user.create({
    data: {
      name: "Facundo Prieto",
      username: "facupri",
      email: "facundo.prieto321@gmail.com",
      hashedPassword,
    },
  })
}

export default seed
