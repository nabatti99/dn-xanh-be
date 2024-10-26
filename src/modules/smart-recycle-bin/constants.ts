export enum SmartRecycleBinStatus {
    HEALTHY = "HEALTHY",
    IN_CONSTRUCTION = "IN_CONSTRUCTION",
    FIXING = "FIXING",
    LOST_CONNECTION = "LOST_CONNECTION",
    ERROR = "ERROR",
    NO_LONGER_NEEDED = "NO_LONGER_NEEDED",
}

export enum PhysicalRecycleBinStatus {
    NORMAL = "NORMAL",
    FULL = "FULL",
}

export enum WasteType {
    RECYCLABLE = "RECYCLABLE",
    ORGANIC = "ORGANIC",
    NON_RECYCLABLE = "NON_RECYCLABLE",
}
