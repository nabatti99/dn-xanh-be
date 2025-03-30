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

export const WasteClassificationMap = {
    "orange": "Trái Cam",
    "pumpkin": "Trái Bí Ngô",
    "metal": "Kim Loại",
    "plastic-bottle": "Chai Nhựa",
    "milk-carton": "Hộp Sữa",
    "nilon-bag": "Túi Nilon",
};

export const WasteClassification: Record<WasteType, string[]> = {
    [WasteType.RECYCLABLE]: ["metal", "plastic-bottle"],
    [WasteType.ORGANIC]: ["orange", "pumpkin"],
    [WasteType.NON_RECYCLABLE]: ["milk-carton"],
};
