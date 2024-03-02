import { Order_status } from "@prisma/client";

Order_status

// Itt kell megadni hogy mi minek felel meg
const getOrderStatusText = (status: Order_status): string => {
    switch (status) {
        case Order_status.created:
            return "Megrendelve";
        case Order_status.preparing:
            return "Elkészítés";
        case Order_status.shipping:
            return "Szállítás";
        case Order_status.completed:
            return "Kiszállítva";
        case Order_status.canceled:
            return "Lemondva";
        default:
            // Handle unexpected status
            return "Unknown";
    }
};

// Example usage:
const statusText = getOrderStatusText(Order_status.shipping);
console.log(statusText); // Output: "Shipping"

export default getOrderStatusText