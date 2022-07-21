import Api from "../api/api"

export interface IBasicNameInfo {
    rank: number,
    nome: String,
    freq: number,
    percentual: number,
    ufMax: String,
    ufMaxProp: string,
    regiao: number,
    sexo: String,
    nomes: String
}

export function getNameInfo(name: String) : Promise<Array<IBasicNameInfo>> {
    return Api.getWithParams("v1/censos/nomes/basica", {nome: name});
}