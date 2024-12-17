const validation=(name,value)=>{
    let error="";
    const nameRe =/^[a-zA-Z]+\s[a-zA-Z]+$/
    const emailRe =/^[^\s@]+@[^\s^@]+\.[^\s@]+$/
    const phoneRe = /^\d{10}$/;
    const employeeIdRe = /^[a-zA-Z0-9]{1,10}$/;

    switch (name){
        case 'name':
            if(!value || !nameRe.test(value)){
                error=  "Name must include both first and last name.";
            }
            break;

        case 'email':
            if(!value || !emailRe.test(value)){
                error= "Invalid email format.";
            }
            break;
        
        case 'phoneNumber':
            if(!value || !phoneRe.test(value)){
                error= "Phone number must be a 10 digit number";
            }
            break;
        
        case 'employeeId':
            if(!value || !employeeIdRe.test(value)){
                error= "Employee ID must be alphanumeric and up to 10 characters.";
            }
            break;
        
        case "department":
            if (!value) {
                error = "Please select a department.";
            }
            break;

        case "dateOfJoining":
            if (!value || new Date(value)> new Date()) {
                error = "Date of joining cannot be a future date.";
            }
            break;
        
        case 'role':
            if(!value){
                error="Role is required";
            }
            break;
        
        default:
            break;
    }
    return error;
}

export default validation