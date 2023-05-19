async function atualizarDados() {
    const city = "são paulo";
  
    const cidade = document.querySelector("#cidade");
    cidade.innerHTML = `${city}`;
  
    const temperatura = document.querySelector("#temperatura span");
    const descricao = document.querySelector("#descricao");
    const umidade = document.querySelector("#umidade span");
    const weathericon = document.querySelector("#weather-icon");
    const wind = document.querySelector("#wind span");
    const statuslamp = document.querySelector("#status span");
    const sun = document.querySelector("#sunrise span");
    const sunst = document.querySelector("#sunset span");
    const templamp = document.querySelector("#tempolamp span");
  
    const agora = new Date();
    const hora = agora.getHours();
    const horaFormatada = hora.toString().padStart(2, "0");
    const mim = agora.getMinutes();
    const mimFormatada = mim.toString().padStart(2, "0");
    const sec = agora.getSeconds();
    const imagem = document.getElementById("imglamp");
    const img = document.createElement("img");
    
    const diaComposto = agora.toLocaleString("pt-BR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    
    document.getElementById("txthora").innerHTML = `${horaFormatada}:${mimFormatada}<br> `;
    document.getElementById("txtdia").innerHTML = `${diaComposto}`;
  
    const getdataweather = async (city) => {
      const lang = "pt_br";
      const units = "metric";
      const apikey = "9588874fecfd08763eaf532d87ed13bf";
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apikey}&lang=${lang}`;
      const res = await fetch(apiurl);
      const data = await res.json();
      return data;
    };
  
    const showData = async (city) => {
      const data = await getdataweather(city);
  
      temperatura.innerHTML = parseInt(data.main.temp);
      descricao.innerHTML = data.weather[0].description;
      weathericon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      umidade.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} Km/h`;
  
      const sunrise = `${data.sys.sunrise}`;
      const sunriseDate = new Date(sunrise * 1000);
      const sunriseFull = sunriseDate.getHours();
      const sunriseHour = sunriseFull.toString().padStart(2, "0");
      const sunriseMinute = sunriseDate.getMinutes();
      sun.innerHTML = `${sunriseHour}:${sunriseMinute}`;
  
      const sunset = `${data.sys.sunset}`;
      const sunsetDate = new Date(sunset * 1000);
      const sunsetFull = sunsetDate.getHours();
      const sunsetHour = sunsetFull.toString().padStart(2, "0");
      const sunsetMinute = sunsetDate.getMinutes();
      sunst.innerHTML = `${sunsetHour}:${sunsetMinute}`;
  
      const flicar = 18;
      const dife = flicar - (sunsetHour - sunriseHour);
      const diferencahrs = dife.toString().padStart(2, "0");
      const lampOn = sunsetHour + diferencahrs;
  
      if (agora.getHours() >= sunsetHour) {
        let cont = 1;
        //countdown(diferencahrs);
        while (cont <= lampOn) {
          img.setAttribute("class", "redondo");
          img.setAttribute("src", "img/acessa.jpg");
          statuslamp.innerHTML = "ON";
          imagem.appendChild(img);
          cont++;
        }
      } else {
        img.setAttribute("class", "redondo");
        img.setAttribute("src", "img/apagada.jpg");
        templamp.innerHTML = ` Lampada ficará acessa por ${diferencahrs} horas.`;
        statuslamp.innerHTML = "OFF";
        imagem.appendChild(img);
        setTimeout(function () {
          window.location.reload(1);
        }, 30000);
      }
    };
  
    showData(city);
  }
  
  function countdown(hours) {
    let milliseconds = hours * 60 * 60 * 1000;
    let endDate = new Date().getTime() + milliseconds;
  
    let countdownInterval = setInterval(function () {
      let now = new Date().getTime();
      let difference = endDate - now;
  
      let hoursRemaining = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000);
  
      let templamp = document.getElementById("tempolamp");
      templamp.innerHTML = hoursRemaining + "h " + minutesRemaining + "m " + secondsRemaining + "s";
  
      if (difference <= 0) {
        clearInterval(countdownInterval);
        templamp.innerHTML = "Contagem regressiva concluída!";
      }
    }, 1000);
  }
  
  atualizarDados();
  