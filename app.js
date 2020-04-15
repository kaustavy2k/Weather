const api={
    key: "1001eabd698feaef942a11e708994099",
    url: "https://api.openweathermap.org/data/2.5/"
}
window.addEventListener("load",()=>{
    let time=new Date();
     let date=time.getDate()+'-'+time.getMonth()+'-'+time.getFullYear();
     document.querySelector(".date").textContent=date;
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            fetch(`${api.url}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
             .then(weather=>{
                return weather.json();
            }).then(display);
            //icon=weather.weather[0].description;
    //setIcons(icon,document.querySelector(".icon"));
        })
        
    }
    
})

let search=document.querySelector(".search");
//const searchBox= new google.maps.places.SearchBox(search);
//console.log(searchBox);
//searchBox.addListener("places_changed",()=>{
  //  const place=searchBox.getPlaces()[0].formatted_address.split(',')[0];
  //  console.log(place);
//})

search.addEventListener("keypress",(key)=>{
    if (key.keyCode==13){
        getinfo(search.value);
    }
})
function getinfo(location){
    fetch(`${api.url}weather?q=${location}&units=metric&appid=${api.key}`)
      .then(weather =>{
        return weather.json();
    }).then(data=>{
        display(data);
    })
      .catch(err=>{
        alert('Enter correct country or city name');
    });
      
    //icon=weather.weather[0].description;
    //setIcons(icon,document.querySelector(".icon"));
   
}

 function display(weather){
     //console.log(weather);
     temp=document.querySelector(".temp");     
     document.querySelector(".city").textContent=weather.name;
     document.querySelector(".country").textContent=weather.sys.country;
     temp.textContent=`${weather.main.temp} C`;
     let temperature="celcius";
     temp.style.cursor="pointer";
     temp.addEventListener("click",()=>{
         if(temperature=="celcius"){
              let cel=Math.round((9*(weather.main.temp)+160)/5.0);
         temp.textContent=`${cel} F`;
             temperature="farhen";
         }
         else{
             temp.textContent=`${weather.main.temp} C`;
             temperature="celcius";
         }
        
     })
     let icon;
      let time=new Date();
     let currtime=time.getHours();
     //console.log(weather.weather[0].main);
     if(weather.weather[0].main=="Clear"){
        if(currtime>=5 && currtime<=17){
         icon=`${weather.weather[0].main} day`;
        }
        else{
         icon=`${weather.weather[0].main} night`;
        }
    }
     else{
         icon=weather.weather[0].main;
     }
     //console.log(currtime,icon);
     setIcons(icon,document.querySelector(".icon"));
   function setIcons(icon,iconid){
     let skycons=new Skycons({color:"white"});
     let currenticon=icon.replace(/ /g,"_").toUpperCase();
    skycons.play();
      // console.log(currenticon);
     skycons.set(iconid,Skycons[currenticon]);
}
     document.querySelector(".weather").textContent=weather.weather[0].description.toUpperCase();
     
 }

