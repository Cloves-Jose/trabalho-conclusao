export interface Category {
    id: string;
    title: string;
    municipality_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}