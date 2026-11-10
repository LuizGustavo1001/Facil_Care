// P2P connection states
export type PeerStatus =
    | "idle"
    | "waiting"
    | "connecting"
    | "transferring"
    | "done"
    | "error"

// P2P error identifiers
export type PeerSyncError =
    | "HostConnectionFailed"
    | "HostNotFound"
    | "P2PExportFailed"
    | "P2PImportFailed"
    | "P2PReceiveFailed"
    | "P2PConnectionInterrupted"
    | null