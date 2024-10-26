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

export const WasteClassification: Record<WasteType, string[]> = {
    [WasteType.RECYCLABLE]: [
        "aerosol_cans",
        "aluminum_food_cans",
        "aluminum_soda_cans",
        "steel_food_cans",
        "cardboard_boxes",
        "cardboard_packaging",
        "magazines",
        "newspaper",
        "office_paper",
        "paper_cups",
        "glass_beverage_bottles",
        "glass_cosmetic_containers",
        "glass_food_jars",
        "plastic_detergent_bottles",
        "plastic_food_containers",
        "plastic_soda_bottles",
        "plastic_water_bottles",
    ],
    [WasteType.ORGANIC]: ["coffee_grounds", "eggshells", "food_waste", "tea_bags"],
    [WasteType.NON_RECYCLABLE]: [
        "clothing",
        "disposable_plastic_cutlery",
        "plastic_cup_lids",
        "plastic_shopping_bags",
        "plastic_straws",
        "plastic_trash_bags",
        "shoes",
        "styrofoam_cups",
        "styrofoam_food_containers",
    ],
};
