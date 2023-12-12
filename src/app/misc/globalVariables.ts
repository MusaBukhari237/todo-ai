import { Item } from "./globalInterfaces";

export const Priorities: any = {
    1: {
        title: "Low",
        style: "bg-primary text-base-100"
    },
    2: {
        title: "Medium",
        style: "bg-secondary text-base-100"
    },
    3: {
        title: "High",
        style: "bg-accent text-base-100"
    }
}


export const Statuses: any = {
    1: {
        title: "Pending",
        style: "border-error text-error"
    },
    2: {
        title: "Doing",
        style: "border-warning text-warning"
    },
    3: {
        title: "Done",
        style: "border-success text-success"
    }
}


export const itemTemplate: null | Item = {
    id: 0,
    title: '',
    description: ``,
    priority: 1,
    dateTime: new Date(),
    labels: [],
    status: 1
};
