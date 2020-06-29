function imgFunction() 
{
    var btn = document.getElementById("asc");
    btn.onclick = function()
    {
        var img = document.getElementsByTagName("img");
        if (btn.innerHTML=="Ascundere imagini")
            {
                for (var i = 0; i < img.length; i++)
                    img[i].classList.add("ascunde");
                btn.innerHTML = "Afiseaza imagini";
            }
        else
            {
              for (i = 0; i < img.length; i++)
                    img[i].classList.remove("ascunde");
              btn.innerHTML = "Ascundere imagini";
            }
    }
}