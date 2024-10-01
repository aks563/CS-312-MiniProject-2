import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded( {extended: true} ));

app.get("/", async (req, res) => {
   try {
      var response = await axios.get("https://v2.jokeapi.dev/joke/Any");
      const joke = response.data;
      const name = req.body.name;

      res.render("index.ejs", { data: joke, error: null, name });
   } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
         data: null,
         error: error.message
      });
   }
});

app.post("/", async (req, res) => {
   const name = req.body.name; 
   const category = req.body.category;

   try {
       const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
       const result = response.data;

       res.render("index.ejs", { data: result, error: null, name });
   } catch (error) {
       console.error("Failed to make request:", error.message);

       res.render("index.ejs", { data: null, error: error.message, name });
   }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}.`)
});