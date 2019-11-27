var lista = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.00"}
]

//Retorna o valor total dos valores dos elementos
function getTotal(list){
    var total = 0
    for(var key in list){
        total += list[key].value * list[key].amount
    }
    document.getElementById("totalValue").innerHTML = formatValue(total)
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>'
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td> <button class="btn btn-default" onclick="setUpdate('+key+')"> Edit </button> | <button class="btn btn-default" onclick="deleteData('+key+')">Delete</td></tr>'

    }
    table += '</tbody>'
    document.getElementById("listTable").innerHTML = table
    getTotal(list) 
}

//Deixa a primeira letra da descrição maiuscula
function formatDesc(desc){
    var str = desc.toLowerCase()
    str = str.charAt(0).toUpperCase() + str.slice(1)
    return str
}

//Deixa 
function formatAmount(amount){
    return parseInt(amount)
}

//Formata o campo value, com 2 casas decimais, separador com a virgula e concatena o cifrão
function formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""
    str = str.replace(".",",")
    str = "$ " + str
    return str
}
//Função para incluir novos registros
function addData(){
    if(!validation()){
        return
    }
    var desc = document.getElementById("desc").value
    var amount = document.getElementById("amount").value
    var value = document.getElementById("value").value
    lista.unshift({"desc":desc,"amount":amount,"value":value})
    setList(lista)
}

function setUpdate(id){
    var obj = lista[id]
    document.getElementById("desc").value = obj.desc
    document.getElementById("amount").value = obj.amount
    document.getElementById("value").value = obj.value
    document.getElementById("btnUpdate").style.display = "inline-block"
    document.getElementById("btnAdd").style.display = "none"

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">'
}
//Limpa Formulario
function resetForm(){ 
    document.getElementById("desc").value = ""
    document.getElementById("amount").value = "" 
    document.getElementById("value").value = ""
    document.getElementById("btnUpdate").style.display = "none"
    document.getElementById("btnAdd").style.display = "inline-block"
    document.getElementById("inputIDUpdate").innerHTML = ""
    document.getElementById("errors").style.display = "none"
}

function updateData(){
    if(!validation()){
        return
    }
    var id =     document.getElementById("idUpdate").value 
    var desc = document.getElementById("desc").value
    var amount = document.getElementById("amount").value 
    var value = document.getElementById("value").value
    
    lista[id] = {"desc": desc, "amount": amount, "value": value}
    resetForm() //
    setList(lista)
}

function deleteData(id){
    if(confirm("Delete this item ?")){
        if(id === lista.length -1){
            lista.pop()
        }else if(id === 0){
            lista.shift()
        }else{
            var arrrayIni = lista.slice(0,id)   //Fatia o array, até o registro antecessor ao ID.
            var arrayFin = lista.slice(id + 1)  //Fatia o array, desde o registo sucessor ao ID até o final.
            lista = arrrayIni.concat(arrayFin)  //Concatena as duas partes do array, sendo excluido com ID passado por parametro 
        }
        setList(lista)

    }

}

//validando as entradas de dados
function validation(){
    document.getElementById("errors").style.display = "none"
    var desc = document.getElementById("desc").value
    var amount = document.getElementById("amount").value
    var value = document.getElementById("value").value
    var erros = ""

    if(desc === ""){
        erros += '<p>Fill out description</p>'
    }
    if(amount == "" ){
        erros += '<p>Fill out a quantity</p>'
    }else if(amount != parseInt(amount)){
        erros += '<p>Fill out a valid amount</p>'
    }
    if(value === "" ){
        erros += '<p>Fill out a value</p>'
    }else if(value != parseFloat(value)){
        erros += '<p>Fill out a valid value</p>'
    }

    if(erros != ""){ //verifica se existem erros registrados
        document.getElementById("errors").style.display = "block" //exibe os erros armazenados
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)"
        document.getElementById("errors").style.color = "white"
        document.getElementById("errors").style.padding = "10px"
        document.getElementById("errors").style.margin = "10px"
        document.getElementById("errors").style.borderRadius = "13px"

        document.getElementById("errors").innerHTML = "<h3>Error</h3>"+ erros
        return 0
    }else{
        return 1
    }
}

function deleteList(){
    if(confirm("Delete this list?")){
        list = []
        setList(list)
    }
}

setList(lista)