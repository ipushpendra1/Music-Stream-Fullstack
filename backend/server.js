
import connectDb from "./src/db/db.js";
import app from "./src/app.js";

connectDb();

app.listen(3000, () => {
    console.log("Server is running on port 3000");

})

