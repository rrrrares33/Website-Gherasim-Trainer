
var express = require('express');
/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/

var formidable=require("formidable");
var session=require("express-session");
var crypto=require("crypto");
var fs=require("fs");

var path = require('path');
var app = express();

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "resurse")));

app.use(session({
	secret:"cheie_sesiune",
	resave: true,
	saveUninitialized:false,
}))

app.post("/LogIn", function(req,res)
{
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files)
    {

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json");
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "parola_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")
		var userNou={
                id:obUseri.lastId,
                username:fields.username,
                nume:fields.nume,
                inaltime:fields.inaltime,
                greutate:fields.greutate,
                data_nastere:fields.data_nastere,
                parola:parolaCriptata,
                dataLogIn:new Date(),
                rol:"user",
                sporturi:fields.sporturi
		    }
		obUseri.lastId++;
		obUseri.useri.push(userNou);
		var jsonNou=JSON.stringify(obUseri);
		fs.writeFileSync("useri.json", jsonNou);
		res.redirect("/");
	})
	
});

app.post("/login1", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
    console.log("DA");
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json");
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "parola_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")
	
		//find returneaza primul element pentru care functia data ca parametru returneaza true (e indeplinita conditia de cautare)
		//daca nu gaseste un element cu conditia ceruta returneaza null
        var utiliz = obUseri.useri.find(function(el){
			return el.username == fields.username && el.parola == parolaCriptata;
		});

		if(utiliz){
			
			//aici stim ca s-a logat
			console.log("exista utilizatorul!")
			req.session.utilizator=utiliz;
			//parametrul al doilea al lui render  contine date de transmis catre ejs
			res.render("html/index", {username: utiliz.username });
		}


	
	})	
});

app.get("/logout", function(req,res){
	req.session.destroy();
	res.redirect("/");
})

app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index');
});

app.get("/*",function(req, res){
	//err este null daca randarea s-a terminat cu succes, si contine eroarea in caz contrar (a survenit o eroare)
	//rezRandare - textul in urma randarii (compilarii din ejs in html)
  console.log(req.url);
  var un= req.session? (req.session.utilizator? req.session.utilizator.username: null)  :  null; 
  res.render("html"+req.url, {username: un}, function(err, rezRandare){
		if (err){
			if(err.message.includes("Failed to lookup view")){
				res.status(404).render("html/404");
			}
			else{
				throw err;
			}
		}
		else{
			res.send(rezRandare);
		}
	});
})

app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');