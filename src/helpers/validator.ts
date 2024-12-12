import Validator from 'validatorjs'


const validator = async(body:object, rules:any, customMessages:any, callback:any)=>{
    const validation = new Validator(body, rules, customMessages)
    validation.passes(()=> callback(null, true))
    validation.fails(()=> callback(validation.errors, false))
}


export default validator