function getEandomUv() {
    return Math.round(Math.random() * 1000)
}

export const datas = [];

for (let i = 1; i <= 20; i++) {
    let newData = {
        name: `Day ${i}`,
        uv: getEandomUv()
    }

    datas.push(newData)
}

// TransAction Widgets 
export let transActionWidgets = [
    { id: 1, name: "Mahdi", profile: "widgets/mahdi.jpg", status: "Success", amount: 213, date: "October 18 , 2023 " },
    { id: 2, name: "Mahyar", profile: "widgets/mahyar.jpg", status: "Declined", amount: 321, date: "October 18 , 2023 " },
    { id: 3, name: "MMD", profile: "widgets/mmd.jpg", status: "Pending", amount: 464, date: "October 18 , 2023 " },
    { id: 4, name: "Anna", profile: "shutterstock_648907024.jpg", status: "Success", amount: 164, date: "October 18 , 2023 " }
]

// New Widgets 👨🏼‍🦯
export let newWidgets = [
    { id: 1, name: "Mahdi", position: "Front-End Developer", profile: "widgets/mahdi.jpg" },
    { id: 2, name: "Mahyar", position: "UI-UX Designer", profile: "widgets/mahyar.jpg" },
    { id: 3, name: "MMD", position: "Back-End Developer", profile: "widgets/mmd.jpg" },
]

export let products = [
    {
        id: 1, name: "Keboard", price: 200, picture: "/products/keyboard.jpg",
        sales: [
            { month: "Jan", sale: 200 },
            { month: "Feb", sale: 567 },
            { month: "April", sale: 125 },
            { month: "May", sale: 323 },
        ]
    },
    {
        id: 2, name: "Mouse", price: 50, picture: "/products/mouse.jpg",
        sales: [
            { month: "Jan", sale: 129 },
            { month: "Feb", sale: 452 },
            { month: "April", sale: 976 },
            { month: "May", sale: 347 },
        ]
    },
    {
        id: 3, name: "Monitor", price: 400, picture: "/products/monitor.jpg",
        sales: [
            { month: "Jan", sale: 447 },
            { month: "Feb", sale: 999 },
            { month: "April", sale: 687 },
            { month: "May", sale: 829 },
        ]
    },
]