import { create } from "zustand";
import { PrismaClient, Product } from "@prisma/client";
import { persist } from "zustand/middleware";

// Jövőben lesz használva a kocsi szinkronizálására az adatbázissal ()
const prisma = new PrismaClient();

// Kocsi item definiálása
export type CartItem = {
    product: Product;
    quantity: number;
};

// Kocsi definiálása
type Cart = {
    items: CartItem[];
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
};

// Ez majd lehet változni fog
const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
};

// export const cartStore = create<Cart>(() => initialState);

// Jelenleg sütiként van eltárolva
export const cartStore = create<Cart>()(
    persist(() => initialState, {
        name: 'cartStore'
    })
)

// Hook létrehozása, ennek az adatait és a funkcióit lehet majd felhasználni akárhol a weboldalon
export default function useCartService() {
    const { items, itemsPrice, shippingPrice, totalPrice } = cartStore();

    return {
        items,
        itemsPrice,
        shippingPrice,
        totalPrice,

        // Termék hozzáadása a kosárhoz
        increase: (item: CartItem) => {
            const exist = items.find((x) => x.product.id === item.product.id);
            const updatedCartItems = exist
                ? items.map((x) =>
                    x.product.id === item.product.id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : x
                )
                : [...items, { ...item, quantity: 1 }];

            const { itemsPrice, shippingPrice, totalPrice } = calcPrice(updatedCartItems);
            // Adatok beállítása
            cartStore.setState({
                items: updatedCartItems,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });
        },
        
        // Termék kivétele a kosárból
        decrease: (item: CartItem) => {
            const exist = items.find((x) => x.product.id === item.product.id
            )
            if (!exist) return

            const updatedCartItems = exist.quantity === 1
                ?
                items.filter((x: CartItem) => x.product.id !== item.product.id)
                :
                items.map((x) =>
                    item.product.id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : x
                )
            const { itemsPrice, shippingPrice, totalPrice } = calcPrice(updatedCartItems);
            
            cartStore.setState({
                items: updatedCartItems,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });
        }
    };
}

const calcPrice = (items: CartItem[]) => {
    let itemsPrice = 0;

    // Calculate the total price for each item
    for (const item of items) {
        itemsPrice += item.product.price * item.quantity;
    }

    // Calculate shippingPrice and totalPrice if needed
    const shippingPrice = itemsPrice > 4000 ? 0 : 2000;
    const totalPrice = itemsPrice + shippingPrice;

    return { itemsPrice, shippingPrice, totalPrice };
};