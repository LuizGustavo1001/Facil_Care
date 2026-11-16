// Defines the result returned by controller methods
export type ControllerResult<T> =
    {
        success: true
        code: string | null
        data: T | undefined | null
    }

    |

    {
        success: false
        code: string
        data: T | undefined | null
    }

export function fallbackReturn<T>(err: any, isArray: boolean = true, message: string = "DatabaseError"): ControllerResult<T> {
    console.error("DB error:", err)

    return {
        success: false,
        code: message,
        data: isArray
            ? [] as T
            : null
    }
}