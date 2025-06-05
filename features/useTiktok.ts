import { useQuery } from "@tanstack/react-query"

export const useTiktok = (url?: string) => {
    const query = useQuery({
        queryKey: ['tiktok', url],
        queryFn: () => {
            return fetch(`http://www.tiktok.com/oembed/?format=json&url=${url}`).then(res => res.json())
        },
        enabled: !!url
    })

    if (!url) {
        return null
    }

    return query.data
}
