"use client";
import {Prisma} from "@prisma/client";
import {ChefHatIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import Image from "next/image";
import {useContext, useState} from "react";

import CartSheet from "@/app/[slug]/menu/components/cart-sheet";
import {CartContext} from "@/app/[slug]/menu/contexts/cart";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {formatCurrency} from "@/helpers/format-currency";


interface ProductDetailsProps {

    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                }
            }
        }
    }>;

}


const ProductDetails = ({product}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);


    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if (prev == 1) {
                return 1;
            }

            return prev - 1;
        });
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    const {toogleCart, addProduct} = useContext(CartContext);

    const handleAddToCart = () => {
        addProduct({
            ...product,
            quantity,
        });
        toogleCart();
    }

    return (
        <>
            <div>
                <div className="relative z-50 mt-[-1.5rem] rouded-t-3xl p-5 flex flex-col flex-auto overflow-hidden">

                    <div className="flex-auto overflow-hidden ">
                        {/* RESTAURANT */}
                        <div className="flex items-center gap-1.5">
                            <Image src={product.restaurant.avatarImageUrl}
                                   alt={product.restaurant.name}
                                   width={16}
                                   height={16}
                                   className={"rounded-full"}/>
                            <p className={"text-xs text-muted-foreground"}>
                                {product.restaurant.name}
                            </p>
                        </div>
                        <h2 className={"font-semibold text-xl mt-1"}>
                            {product.name}
                        </h2>

                        {/* PRICE */}
                        <div className={"flex items-center justify-between mt-3"}>

                            <h3 className="text-xl font-semibold">
                                {formatCurrency(product.price)}
                            </h3>

                            <div className="flex items-center gap-3 text-center">
                                <Button variant={"outline"} className={"h-8 w-8 rounded-xl"}
                                        onClick={handleDecreaseQuantity}>
                                    <ChevronLeftIcon/>
                                </Button>
                                <p className={"w-4"}>{quantity}</p>
                                <Button variant={"destructive"} className={"h-8 w-8 rounded-xl"}
                                        onClick={handleIncreaseQuantity}>
                                    <ChevronRightIcon/>
                                </Button>
                            </div>

                        </div>
                        <ScrollArea className={"h-full "}>
                            {/* DESCRIPTION */}
                            <div className={"mt-6 space-y-3"}>
                                <h4 className={"font-semibold"}>Sobre</h4>
                                <p className={"text-sm text-muted-foreground"}>
                                    {product.description}
                                </p>
                            </div>

                            {/* INGREDIENTS */}
                            <div className={"mt-6 space-y-3"}>
                                <div className={"flex items-center gap-1.5"}>
                                    <ChefHatIcon size={18}/>
                                    <h4 className={"font-semibold"}>Ingredientes</h4>
                                </div>

                                <ul className={"list-disc px-5 text-sm text-muted-foreground"}>
                                    {product.ingredients.map(ingredient => (
                                        <li key={ingredient} className={"text-sm text-muted-foreground"}>
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollArea>
                    </div>

                    {/* BUTTON */}
                    <Button className={"mt-6 w-full rounded-full"} onClick={handleAddToCart}>
                        Adicionar ao carrinho
                    </Button>
                </div>

                <CartSheet/>
            </div>
        </>
    );
}

export default ProductDetails;
