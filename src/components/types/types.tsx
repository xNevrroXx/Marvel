export type Character = {
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