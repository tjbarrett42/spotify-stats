const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const configRoutes = require("./routes")
const static = express.static(__dirname + '/public')
const path = require('path')
const connection=require("./config/mongoConnection");

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    helpers : {
        asJSON: (obj, spacing) => {
            if (typeof spacing == "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing))
            return new Handlebars.SafeString(JSON.stringify(obj))
        }
    }
})

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method
        delete req.body._method
    }
    next()
}

app.use(cors())
app.use(cookieParser())
app.use("/public", static)
app.use(bodyParser.urlencoded({extended: false}))
app.use(rewriteUnsupportedBrowserMethods)
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
    // ,
    // layoutsDir: path.join(__dirname, '..', 'views/layouts'),
    // partialsDir: path.join(__dirname, '..', 'views', 'partials')
}
));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(3000, () => {
    console.log("Spotify Stats Server is Running");
    console.log("look at http://localhost:3000");
});

