import { v4 as uuidv4 } from "uuid";

type Item = {
    readonly id:string,
    name:string,
    price:number,
    description:string
}

type User = {
    readonly id:string,
    name:string,
    age:number,
    cart:Item[]
}

function createUser({name, age}:{name:string, age:number}){

    let newUser:User={
        id:uuidv4(),
        name,
        age,
        cart:[]
    }

    return newUser
}

function createItem({name,price,description}:{name:string, price:number, description:string}){
    let newItem:Item = {
        id:uuidv4(),
        name,
        price,
        description
    }

    return newItem
}

function addToCart(item:Item,user:User){
    user.cart.push(item)
}

function removeFromCart(item:Item,user:User){
    user.cart = user.cart.filter((i)=>item.id !== i.id)
}

function removeQuantityFromCart(item:Item,quantity:number,user:User){
    let count = user.cart.filter((i)=>item.id == i.id).length
    removeFromCart(item,user)
    for (let i = count-quantity; i > 0; i -- ){
        addToCart(item,user)
    }
}

function cartTotal(user:User){
    return user.cart.map((x)=>(x.price)).reduce((x,y)=>(x+y))
}

function printCart(user:User){
    for(let item of user.cart){
        console.log(item.name)
    }
}

const user = createUser({name:'Billy-Bob',age:55})

const itemA = createItem({name:'baseball bat',price:15,description:'solid pine'})
const itemB = createItem({name:'santa hat',price:5,description:'ho ho ho'})
const itemC = createItem({name:'tattooing kit',price:200,description:'do it yourself'})

addToCart(itemA,user)
printCart(user)
console.log(cartTotal(user))

addToCart(itemB,user)
addToCart(itemB,user)
addToCart(itemB,user)
printCart(user)
console.log(cartTotal(user))

addToCart(itemC,user)
addToCart(itemC,user)
addToCart(itemC,user)
printCart(user)
console.log(cartTotal(user))

removeFromCart(itemB,user)
printCart(user)
console.log(cartTotal(user))

removeQuantityFromCart(itemC,2,user)
printCart(user)
console.log(cartTotal(user))
