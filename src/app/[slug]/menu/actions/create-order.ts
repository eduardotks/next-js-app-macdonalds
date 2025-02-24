"use server";
import { ConsumptionMethod } from "@prisma/client";
import {redirect} from "next/navigation";

import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

interface CreateOrderInput {
    customerName: string;
    customerCpf: string;
    products: Array<{
        id: string;
        quantity: number;
    }>;
    consumptionMethod: ConsumptionMethod;
    slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where: { slug: input.slug },
    });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const productsWithPrices = await db.product.findMany({
        where: {
            id: { in: input.products.map((product) => product.id) },
        },
    });

    const productsWithPricesAndQuantities = input.products.map(product => {
        const foundProduct = productsWithPrices.find(p => p.id === product.id);
        if (!foundProduct) {
            throw new Error(`Product with ID ${product.id} not found`);
        }
        return {
            productId: product.id,
            quantity: product.quantity,
            price: foundProduct.price,
        };
    });

    return db.order.create({
        data: {
            status: "PENDING",
            customerName: input.customerName,
            customerCpf: removeCpfPunctuation(input.customerCpf),
            orderProducts: {
                createMany: {
                    data: productsWithPricesAndQuantities,
                },
            },
            total: productsWithPricesAndQuantities.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            ),
            consumptionMethod: input.consumptionMethod,
            restaurantId: restaurant.id,
        },
    });

    redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`);
};
