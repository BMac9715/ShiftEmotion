export class History {
    "tipo_emocion": string
    "descripcion": string
    "nivel_confianza": number
    "nombre_cancion": string
    "artista": string
    "link": string
    "fecha_transaccion": Date

    getLink(){
        return this.link
    }
}
