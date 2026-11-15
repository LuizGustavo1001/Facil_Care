// Defines the result returned by controller methods
export type ControllerResult<T> =
    |
    {
        success: true
        code: string | null
        data: T | undefined | null
    }

    |

    {
        success: false
        code: string
        data: T | undefined
    }

    |

    {
        success: false
        code: string
        data: null
    }
