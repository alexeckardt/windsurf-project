
export type ComponentTypes = "Button" | "Card";

export type ComponentDetailRecord = {
    name: string;
    description: string;
    category: string;
}

export const ComponentDetails: Record<ComponentTypes, ComponentDetailRecord> = {
    Button: {
        name: "Button",
        description: "A button component",
        category: "Form"
    },
    Card: {
        name: "Card",
        description: "A card component",
        category: "Layout"
    }
}