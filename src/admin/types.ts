import * as mongoDB from "mongodb"

export const collections:{users?: mongoDB.Collection}={}

export async function connectToDatabase() {
    const client:mongoDB.MongoClient=new mongoDB.MongoClient(
       "mongodb+srv://hemanth:Hemanth555@cluster0.ghfqur0.mongodb.net/"
   
    )

    await client.connect()

    const db:mongoDB.Db=client.db("user_db")
    
    const users:mongoDB.Collection=db.collection("user")

    collections.users=users
}

