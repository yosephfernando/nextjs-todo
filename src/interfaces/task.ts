export interface TaskData {
    title: string;
    description: string;
    status?: "TO_DO" | "IN_PROGRESS" | "DONE";
    username?: string;
    createdAt?: string;
    updatedAt?: string;
}