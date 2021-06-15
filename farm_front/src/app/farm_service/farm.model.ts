export interface Farm {
    id?: number
    name: string
    geometry: string
    area: number
    centroid: number
    municipality: string
    state: string
    is_active: boolean
    owner: number
}