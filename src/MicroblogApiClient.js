const BASE_API_URL =process.env.REACT_APP_BASE_API_URL;

export default class MicroblogApiClient{
    constructor(){
        this.base_url = BASE_API_URL + '/api';
    }

    async request(options){
        let query = new URLSearchParams(options.query || {}).toString();
        if (query!== ''){
            query ='?' + query;
        }

        let response;
        console.log();
        response = await fetch(this.base_url + options.url +query,{
            method: options.method,
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json',
                //'Authorization':'Bearer '+localStorage.getItem('accessToken'),
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body):null,
          });
        /*try{
          response = await fetch(this.base_url + options.url +query,{
            method: options.method,
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json',
                //'Authorization':'Bearer '+localStorage.getItem('accessToken'),
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body):null ,
          });
        }
        catch(error){
            response ={
                ok:false,
                statsus:500,
                json:async()=>{return{
                    code:500,
                    message:'The server is down'
                };}
            }
        }*/
        return{
            ok:response.ok,
            status:response.status,
            body:response.status !==204 ? await response.json() : null
        };
    }
    async get (url,query,options){
        return this.request({method:'GET',url,query,...options});
    }

    async login(username,password){
        const response = await this.post('/tokens',null,{
            headers:{
                Authorization: 'Basic ' + btoa(username + ":" + password)
            }
        });
        if (!response.ok){
            return response.status === 401 ? 'fail' : 'error';
        }
        localStorage.setItem('accessToken',response.body.access_token);
        return 'ok';
    }

    async logout(){
        await this.delete('/tokens');
        localStorage.removeItem('accessToken');
    }

    isAuthenticated(){
        return localStorage.getItem('accessToken') !== null;
    }

    async post(url,body,options){
        return this.request({methos:'POST',url,body,...options})
    }

    async put(url,body,options){
        return this.request({method:'PUT',url,body,...options})
    }

    async delete(url,options){
        return this.request({method:'DELETE',url,...options})
    }
};