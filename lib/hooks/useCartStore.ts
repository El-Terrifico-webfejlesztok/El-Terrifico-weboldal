import { create } from "zustand";
import { PrismaClient, Product, CartItem as PrismaCartItem } from "@prisma/client";

const prisma = new PrismaClient();

export type CartItem = {
    product: Product;
    quantity: number;
};

type Cart = {
    items: CartItem[];
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
};

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
};

export const cartStore = create<Cart>(() => initialState);

export default function useCartService() {
    const { items, itemsPrice, shippingPrice, totalPrice } = cartStore();

    return {
        items,
        itemsPrice,
        shippingPrice,
        totalPrice,
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

            cartStore.setState({
                items: updatedCartItems,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });
        },
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