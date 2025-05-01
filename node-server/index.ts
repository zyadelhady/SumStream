import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  // send a simple json response
  res.json({ message: "Hello World! ALaaaaasdasd" });
});


app.get("/alo", (req, res) => {
  // send a simple json response
  res.json({ message: " ALaaaaasdasd" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
