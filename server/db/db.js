import mongoose from "mongoose";

export const ConnectDB = () => mongoose.connect(Bun.env.mongoURI, { dbName: 'libmgmnt' }).then(() => {
    console.log('Db On')
}).catch((e) => {
    console.log(e)
})