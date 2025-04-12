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
    "banana": "Trái Chuối",
    "lemon": "Trái Chanh",
    "tomato": "Trái Cà Chua",
    "metal": "Kim Loại",
    "paperboard_packaging": "Thùng Giấy",
    "plastic_bag": "Túi Nhựa",
    "plastic_bottle": "Chai Nhựa",
    "toothpaste_tube": "Tuýp Kem Đánh Răng",
};

export const WasteClassification: Record<WasteType, string[]> = {
    [WasteType.RECYCLABLE]: ["metal", "paperboard_packaging", "plastic_bottle"],
    [WasteType.ORGANIC]: ["banana", "lemon", "tomato"],
    [WasteType.NON_RECYCLABLE]: ["toothpaste_tube"]
};
