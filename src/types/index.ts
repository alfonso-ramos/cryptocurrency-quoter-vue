export type CoinInfo = {
    Name: string;
    FullName: string;
}

export type Cotizacion = {
    IMAGEURL: string;
    PRICE: number;
    HIGHDAY: number;
    LOWDAY: number;
    CHANGEPCT24HOUR: number;
    LASTUPDATE: string;
}

export type Criptomoneda = {
    CoinInfo: CoinInfo;
}