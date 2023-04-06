console.log("=== CADASTRO PRODUTOS ===");

const cesta = [];

//const cadastro = document.querySelector(".btn-primary");
const formCadastro = document.querySelector("form");

//console.log(cadastro);

//cadastro.addEventListener("click",cadastrar);


function cadastrar(e) {
    const produto = document.querySelector("#produto");
    e.preventDefault();
    //console.log(produto.value);
    const quantidade = document.querySelector("#quantidade");
    //console.log(quantidade.value);
    const preco = document.querySelector("#preco");
    //console.log(preco.value);
    const produtoFinal = {
        produto: produto.value,
        quantidade: parseFloat(quantidade.value),
        preco: parseFloat(preco.value)
    }
    cesta.push(produtoFinal);
    console.table(cesta);

    const linha = cesta.map(function(produtoFinal){
        return`<tr>
                <td>${produtoFinal.produto}</td>
                <td>${produtoFinal.quantidade}</td>
                <td>${produtoFinal.preco}</td>
            </tr>`;
    }).join("");

    document.querySelector("table tbody").innerHTML = linha;
    

    
    produto.value = '';
    quantidade.value = '';
    preco.value = '';

    produto.focus();
}

formCadastro.addEventListener("submit", cadastrar);



