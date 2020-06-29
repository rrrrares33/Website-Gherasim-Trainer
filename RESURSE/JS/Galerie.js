function principala(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/exercitii.json)
	ajaxRequest.open("GET", "/json/exercitii.json", true);
	//trimit catre server cererea
	ajaxRequest.send();
	function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");
			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de exercitii din obJson
			for(let i=0;i<obJson.exercitii.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
				textTemplate+=ejs.render("<div class='templ_exercitii' onclick='MyFunction()'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				</div>", 
				{exercitii: obJson.exercitii[i]});
			} 
			//adaug textul cu afisarea exercitii in container
			container.innerHTML=textTemplate;
	}
    
    document.getElementById("toate_exercitiile").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaExercitii(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        
        function afiseazaExercitii(obJson){
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                i++;
            } 
            container.innerHTML = textTemplate;
        }
    }
    
    document.getElementById("exercitii").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaExercitii(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        var aux = window.prompt("Introduceti grupa pentru care vreti sa vedeti exercitiile","");
        function afiseazaExercitii(obJson){
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                if (obJson.exercitii[i].Grupa_lucrată == aux) {
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                }
                i++;
            } 
            container.innerHTML = textTemplate;
        }
    }
    
    document.getElementById("exercitii_fara_echipament").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaFaraEchipament(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        
        function afiseazaFaraEchipament(obJson){
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                if (obJson.exercitii[i].Echipament_necesar == "NU") {
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                }
                i++;
            } 
            container.innerHTML = textTemplate;
        }
    }
    
    document.getElementById("adunare_dificultati").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaAdunare(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        
        function afiseazaAdunare(obJson){
            let i = 0;
            let sum = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                sum+= parseInt(obJson.exercitii[i].Dificultate);
                i++;
            } 
            //!!!!!!!!! SET-TIMEOUT AICI !!!!!!!!!!!!!!!!!!!!!!!!
            var aux = setTimeout(function(){alert(sum)},3000); 
            
            document.getElementById("result1").innerHTML = sum;
        }
        
    }
    
    document.getElementById("sortare_dificultate").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaSortareDificultate(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        
        function afiseazaSortareDificultate(obJson){
            for (let i = 0; i <obJson.exercitii.length-1;i++)
                for (let j = i+1; j<obJson.exercitii.length;j++)
                    {
                        if (parseInt(obJson.exercitii[i].Dificultate) > parseInt(obJson.exercitii[j].Dificultate))
                            {
                              [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                            }
                    }
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                i++;
            } 
            container.innerHTML = textTemplate;
        }
            
        
    }
    
    document.getElementById("sortare_grupe").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaSortareGrupe(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        
        function afiseazaSortareGrupe(obJson){
            for (let i = 0; i <obJson.exercitii.length-1;i++)
                for (let j = i+1; j<obJson.exercitii.length;j++)
                    {
                        if (obJson.exercitii[i].Grupa_lucrată > obJson.exercitii[j].Grupa_lucrată)
                            {
                              [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                            }
                        else if (obJson.exercitii[i].Grupa_lucrată == obJson.exercitii[j].Grupa_lucrată)
                            {
                                if (obJson.exercitii[i].Dificultate > obJson.exercitii[j].Dificultate)
                                    {
                                      [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                                    }
                                else if (obJson.exercitii[i].Dificultate = obJson.exercitii[j].Dificultate) 
                                    {
                                        if (obJson.exercitii[i].Tip > obJson.exercitii[j].Tip)
                                            [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                                    }
                            }
                    }
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                i++;
            } 
            container.innerHTML = textTemplate;
        }
            
        
    }
    
    document.getElementById("sortare_dificultate_complexa").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaDificultateComplexa(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        
        function afiseazaDificultateComplexa(obJson){
            for (let i = 0; i <obJson.exercitii.length-1;i++)
                for (let j = i+1; j<obJson.exercitii.length;j++)
                    {
                        if (obJson.exercitii[i].Dificultate > obJson.exercitii[j].Dificultate)
                            {
                              [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                            }
                        else if (obJson.exercitii[i].Dificultate == obJson.exercitii[j].Dificultate)
                            {
                                if (obJson.exercitii[i].Grupa_lucrată > obJson.exercitii[j].Grupa_lucrată)
                                    {
     [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
      [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume][obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
      [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
     [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
    [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
    [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                                    }
                                else if (obJson.exercitii[i].Grupa_lucrată = obJson.exercitii[j].Grupa_lucrată) 
                                    {
                                        if (obJson.exercitii[i].Id > obJson.exercitii[j].Id)
                                            [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                                    }
                            }
                    }
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                i++;
            } 
            container.innerHTML = textTemplate;
        }
            
        
    }
    
    document.getElementById("sortare_tip_complexa").onclick = function(obJson)
    {
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseazaTip(obJson);
			}
	    };
        ajaxRequest.open("GET", "/json/exercitii.json", true);
	    //trimit catre server cererea
	    ajaxRequest.send();
        let container=document.getElementById("afisTemplate");
        let textTemplate ="";
        container.innerHTML=textTemplate;
        
        function afiseazaTip(obJson){
            for (let i = 0; i <obJson.exercitii.length-1;i++)
                for (let j = i+1; j<obJson.exercitii.length;j++)
                    {
                        if (obJson.exercitii[i].Tip > obJson.exercitii[j].Tip)
                            {
                              [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                            }
                        else if (obJson.exercitii[i].Tip == obJson.exercitii[j].Tip)
                            {
                                if (obJson.exercitii[i].Dificultate > obJson.exercitii[j].Dificultate)
                                    {
     [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
      [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume][obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
      [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
     [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
    [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
    [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                                    }
                                else if (obJson.exercitii[i].Dificultate = obJson.exercitii[j].Dificultate) 
                                    {
                                        if (obJson.exercitii[i].Id > obJson.exercitii[j].Id)
                                            [obJson.exercitii[i].Id, obJson.exercitii[j].Id] =   [obJson.exercitii[j].Id, obJson.exercitii[i].Id];
                              [obJson.exercitii[i].Nume, obJson.exercitii[j].Nume] =  [obJson.exercitii[j].Nume, obJson.exercitii[i].Nume];
                              [obJson.exercitii[i].Dificultate, obJson.exercitii[j].Dificultate] =   [obJson.exercitii[j].Dificultate, obJson.exercitii[i].Dificultate];
                              [obJson.exercitii[i].Poza, obJson.exercitii[j].Poza] =   [obJson.exercitii[j].Poza, obJson.exercitii[i].Poza];
                              [obJson.exercitii[i].Grupa_lucrată, obJson.exercitii[j].Grupa_lucrată] =   [obJson.exercitii[j].Grupa_lucrată, obJson.exercitii[i].Grupa_lucrată];
                              [obJson.exercitii[i].Echipament_necesar, obJson.exercitii[j].Echipament_necesar] =   [obJson.exercitii[j].Echipament_necesar, obJson.exercitii[i].Echipament_necesar];
                              [obJson.exercitii[i].Tip, obJson.exercitii[j].Tip] = [obJson.exercitii[j].Tip, obJson.exercitii[i].Tip];
                                    }
                            }
                    }
            let i = 0;
            while(i<obJson.exercitii.length){
				//creez un template ejs (primul parametru al lui ejs.render)
				//practic obJson.exercitii[i] e redenumit ca "exercitii" in template 
                    textTemplate+=ejs.render("<div class='templ_exercitii'>\
				    <img src ='<%= exercitii.Poza %>'>\
                    <p>Id: <%= exercitii.Id %></p>\
				    <p>Nume: <%= exercitii.Nume %></p>\
				    <p>Dificultate: <%= exercitii.Dificultate %></p>\
                    <p>Grupa lucrata: <%= exercitii.Grupa_lucrată %> </p>\
                    <p>Echipament necesar: <%= exercitii.Echipament_necesar %> </p>\
                    <p>Tip: <%= exercitii.Tip %> </p>\
				    </div>", 
				    {exercitii: obJson.exercitii[i]});
                i++;
            } 
            container.innerHTML = textTemplate;
        }
            
        
    }
}


function randInt(a,b){
	return Math.trunc(a+(b-a)*Math.random());
}

function MyFunction()
{
    var colors = ["red", "green", "blue", "yellow"];
    document.getElementById('afisTemplate').style.color = "red";
    setInterval( function() {
        document.getElementById('afisTemplate').style.color = colors[randInt(0,4)];        
    }
    ,3000)
}



function domLoaded() {
    document.addEventListener("DOMContentLoaded", principala);
}

window.onload = domLoaded();