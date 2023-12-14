export interface Astronauts {
    id: number,
    url: string,
    name: string,
    status: { id: string, name: string },
    type: { id: string, name: string },
    in_space: boolean,
    time_in_space: string,
    eva_time: string,
    nationality: string,
    profile_image: string | null,
    profile_image_thumbnail: string | null,
}