const baseUrl = 'https://servicodados.ibge.gov.br/api/'

const Api = {

    get: (endpoint : String) => fetch(`${baseUrl}${endpoint}`).then(res => res.json()),
    getWithParams: (endpoint : String, params: any) => fetch(`${baseUrl}${endpoint}?` + new URLSearchParams(params)).then(res => res.json()),
    post: (endpoint : String, data : Object) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(`${baseUrl}${endpoint}`, options).then(res => res.json())
    }

}

export default Api;