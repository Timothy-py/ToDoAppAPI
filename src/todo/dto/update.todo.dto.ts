import { Status } from "./enum.status"

export class UpdateTodoDto {
    readonly title?: string

    readonly description?: string

    readonly status?: Status

    readonly tags?: []
}