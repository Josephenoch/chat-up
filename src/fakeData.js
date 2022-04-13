import { faker } from '@faker-js/faker';

const contact = (mainUser=false, contacts) => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    var messages = []
    if(!mainUser){
        for (let i = 0; i<15; i++){
            messages.push({
                content:faker.lorem.words(30),
                id:faker.datatype.uuid(),
                date:String(faker.date.recent()),
                sentBy:Math.floor(Math.random()*2)
            })
        }
        messages = messages.sort((a,b)=>b.date-a.date)
    }
    return{
        id:faker.datatype.uuid(),
        displayName:`${firstName} ${LastName}`,
        email:faker.internet.email(firstName,lastName, "gmail.com"),
        contacts: mainUser? contacts:null,
        messages:messages
    }
}



const otherUsers = () => {
    const users = []
    for(let i=0; i<15; i++){
        users.push(contact())
    }
    return users.sort((a,b)=>b.messages[0].date - a.messages[0].date)
}
const contacts = otherUsers()
export const mainUser = contact(true,contacts)



