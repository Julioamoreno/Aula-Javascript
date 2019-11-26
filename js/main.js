var lista = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.00"}
]

function getTotal(list){
    var total = 0
    for(var key in list){
        total += list[key].value * list[key].amount
    }
    return total
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>'
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+list[key].amount+'</td><td>'+ formatValue(list[key].value) +'</td><td> <button class="btn btn-default" onclick="setUpdate('+key+')"> Edit </button> | Delete</td></tr>'

    }
    table += '</tbody>'
    document.getElementById("listTable").innerHTML = table
}

//Deixa a primeira letra da descrição maiuscula
function formatDesc(desc){
    var str = desc.toLowerCase()
    str = str.charAt(0).toUpperCase() + str.slice(1)
    return str
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

function resetForm(){
    document.getElementById("desc").value = ""
    document.getElementById("amount").value = "" 
    document.getElementById("value").value = ""
    document.getElementById("btnUpdate").style.display = "none"
    document.getElementById("btnAdd").style.display = "inline-block"
    document.getElementById("inputIDUpdate").innerHTML = ""
}

function updateData(){
    var id =     document.getElementById("idUpdate").value 
    var desc = document.getElementById("desc").value
    var amount = document.getElementById("amount").value 
    var value = document.getElementById("value").value
    
    lista[id] = {"desc": desc, "amount": amount, "value": value}
    resetForm()
    setList(lista)
}

setList(lista)
console.log(getTotal(lista))