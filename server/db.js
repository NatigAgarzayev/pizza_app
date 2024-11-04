import mysql from 'mysql2'
export const db = new mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "a3239015",
    database: "pizzas" 
})

