import {useState, useEffect} from 'react'



export default function Search(props){
    
    const [cidade,setCidade] = useState("")



    function searchInput(e){
        e.preventDefault();
        //setCidade("")
        let currentValue = document.querySelector('[name=searchInput]').value
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=0df6ec1dc2cccf5e4d785aa7fc4597f8&units=metric&lang=pt_br`;


        fetch(url)
        .then(response=> response.json())
        .then(data=>{
            const {main, name, sys, weather} = data;
           if(sys != undefined){

            if(weather != undefined){
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                weather[0]["icon"]}.svg`;
                setCidade(`
                <div class="containerCidade">
                <p>Temperatura: ${main.temp}</p>
                <p>País: ${sys.country}</p>
                <p>Cidade: ${name}</p>
                <p>${weather[0]['description']}</p>
                <img src="${icon}" />
                </div>
                `);
            }

           }else{
                setCidade(`
                    <p class="cidade">Por favor digite uma cidade compatível</p>
                
                `)
           }
    
        })

    }
       
    
    return(

        <div className='searchWraper'>

        <div className="search">
            <h2>Buscar Cidade</h2>
            <form onSubmit={(e)=>searchInput(e)}>
            <input placeholder={props.placeholder}  type="text" name="searchInput" />
            <input type="submit" value="Pesquisar" />
            </form>
        </div>

        {
            (cidade != "")?

            <div dangerouslySetInnerHTML={{__html: cidade}}/>:

            <div style={{padding:'8px'}}>Pesquise por algo acima...</div>
        }

        </div>
    )
}