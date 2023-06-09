console.log("=== CEP ===");

let addresses = (localStorage.addresses) ? JSON.parse(localStorage.addresses): [];

function onlyNumbers(){
    this.value = this.value.replace(/\D+/g,"");
};

function validateEntry(){
    if(this.value.length === 8){
        this.classList.remove("error").disabled = false;
        getAddress(this.value);
    }else{
        this.classList.add("error").disabled = true;
        this.focus();
    }
};

function getAddress(postalCode){
    const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;

    const config = {
        method: "GET"
    };

    fetch(endpoint, config)
        .then(function(resp){
            return resp.json();})
        .then(getAddressSuccess)
        .catch(getAddressError);
};


function getAddressSuccess(address){
        const erro = address.erro;
        if (erro){
            alert("Endereço não encontrado!");    
        } else{
            saveAdress(address);
            updateCards();
        }          
}

function getAddressError(){
    alert("Serviço indiponível no momento. Tente novamente mais tarde!");
}

function updateCards(){
    
    const card = addresses.map(function(cardInfo){
       const {logradouro, cep, localidade, uf, bairro} = cardInfo;
       console.log(logradouro);
        return `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${logradouro}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                            ${bairro} - ${localidade} - ${uf}
                        </h6>
                        <p class="card-text">${cep}</p>
                    </div>
                </div>`
        }).join("");

    document.querySelector(".cards").innerHTML = card;  
}

function saveAdress(address){   
    addresses.push(address);
    localStorage.setItem("addresses", JSON.stringify(addresses));
}

// Mapping Events
document.querySelector("#cep").addEventListener("input", onlyNumbers);
document.querySelector("#cep").addEventListener("focusout", validateEntry);
document.addEventListener("DOMContentLoaded", updateCards);