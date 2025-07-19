
import connectDb from "./src/db/db.js";
import app from "./src/app.js";
import config from "./src/config/config.js";

connectDb();
const PORT = config.PORT || 3000;


app.get('/', (req, res)=>{
          res.send({
            activeStatus:true,
            error:false,
          })
})
app.listen(PORT, () => {
    console.log("Server is running on port 3000");

})

