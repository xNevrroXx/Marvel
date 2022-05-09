export type typeCharacter = {
    name: string,
    id: number,
    description: string,
    thumbnail: {
        url: string,
        objectFit: "contain" | "cover"
    },
    homepage: string,
    wiki: string,
    comicsList: {url: string, name: string}[]
} 

export type typeComic = {
    title: string,
    id: number,
    url: string,
    thumbnail: string
    price: string,
    description: string,
    pageCount: number,
    language: string
}