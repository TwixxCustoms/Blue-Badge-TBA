let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '172.0.0.1' :
        APIURL = 'http://localhost:3005';
        break;

        default:
            APIURL = 'https://xh-poem-server.herokuapp.com';
            break;
}

export default APIURL;