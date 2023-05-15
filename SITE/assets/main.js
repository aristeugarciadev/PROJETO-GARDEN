
//9588874fecfd08763eaf532d87ed13bf //CHAVE API WEATHER OPEN
//6d769902-c4c9-4383-b08b-5f523d4edf29 //CHAVE API INFO
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={9588874fecfd08763eaf532d87ed13bf}

const city = "são paulo";

//localização
const cidade = document.querySelector("#cidade")
cidade.innerHTML = `${city}`

const temperatura = document.querySelector("#temperatura span")
const descricao = document.querySelector("#descricao")
const umidade = document.querySelector("#umidade span")
const weathericon = document.querySelector("#weather-icon")
const wind = document.querySelector("#wind span")
const statuslamp = document.querySelector("#status span")
const sun = document.querySelector('#sunrise span')
const sunst = document.querySelector('#sunset span')
const templamp = document.querySelector('#tempolamp span')

//HORA E DATA ATUALIZADA

//image.setAttribute('id' , 'foto')
const agora = new Date();
const hora = agora.getHours();
const mim = agora.getMinutes();
const sec = agora.getSeconds();
const imagem = document.getElementById('imglamp')
const img = document.createElement('img')
const nomeMes = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")

const dia_compconsto = `${agora.getDate()} - ${nomeMes[agora.getMonth()]} - ${agora.getFullYear()}`
document.getElementById('txthora').innerHTML = `${hora}:${mim}:${sec}<br> `
document.getElementById('txtdia').innerHTML = `${dia_compconsto}`

//CONFIGURANDO API WEATHER
const getdataweather = async(city) => {    
const lang = 'pt_br'
const units = 'metric'
const apikey = "9588874fecfd08763eaf532d87ed13bf";
const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apikey}&lang=${lang}` 
const res = await fetch(apiurl)
const data = await res.json()
return (data)
}
//CHAMADA API WEATHER
const showData = async(city) => {
const data = await getdataweather(city);

temperatura.innerHTML = parseInt(data.main.temp);
descricao.innerHTML = data.weather[0].description;
weathericon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
umidade.innerHTML = `${data.main.humidity}%`;
wind.innerHTML = `${data.wind.speed} Km/h`;

//NASCER DO SOL (CLARO)
const sunrise = `${data.sys.sunrise}`;
const sr = new Date(sunrise * 1000);
const srh = sr.getHours();
const srm = sr.getMinutes();
sun.innerHTML = `${srh}:${srm}`;

//POR DO SOL (ESCURO)
const sunset = `${data.sys.sunset}`;
const ss = new Date(sunset * 1000);
const ssh = ss.getHours();
const ssm = ss.getMinutes();
sunst.innerHTML = `${ssh}:${ssm}`;

//calculo da diferença de hora
const flicar = 18;
const diferencahrs = flicar - (ssh - srh) ;
templamp.innerHTML = ` ${diferencahrs}`

const lampligada = ssh + diferencahrs

if (agora.getHours() >= ssh) {
    let cont = 1;
    while (cont <= lampligada) {
        console.log('aqui')
        img.setAttribute('class', 'redondo');
        img.setAttribute('src' , 'assets/img/acessa.jpg');
        statuslamp.innerHTML = "ON";
        cont++;
}

}else if(agora.getHours() >= srh){
    img.setAttribute('class', 'redondo')
    img.setAttribute('src' , 'assets/img/apagada.jpg')
    statuslamp.innerHTML = "OFF"
}
    imagem.appendChild(img)
}
    showData(city);