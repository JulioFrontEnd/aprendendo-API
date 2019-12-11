
let Token = null;
if(localStorage.getItem('api_token')!==null){
    Token = localStorage.getItem('api_token');
}else{
    Token = 'Not Logged';
}

export default Token;