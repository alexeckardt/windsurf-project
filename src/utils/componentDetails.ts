
export type ComponentTypes = "Button" | "Card";

export type ComponentCategory = "Form" | "Layout";

export type ComponentDetailRecord = {
    name: string;
    description: string;
    category: ComponentCategory;
}

export const ComponentDetails: Record<ComponentTypes, ComponentDetailRecord> = {
    Button: {
        name: "Button",
        description: "Simple and easily customizeable Button components with multiple variants",
        category: "Form"
    },
    Card: {
        name: "Card",
        description: "Cards to display content",
        category: "Layout"
    }
}


export const ComponentCategories: Record<ComponentCategory, ComponentTypes[]> = {
    Form: Object.keys(ComponentDetails).filter(key => ComponentDetails[key as ComponentTypes].category === "Form") as ComponentTypes[],
    Layout: Object.keys(ComponentDetails).filter(key => ComponentDetails[key as ComponentTypes].category === "Layout") as ComponentTypes[]
}