export type Character = {
    name: string,
    id: number,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
    comicsList: {url: string, name: string}[]
} 