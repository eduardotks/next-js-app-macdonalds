import Image from "next/image";

import {CartProduct} from "@/app/[slug]/menu/contexts/cart";
import {formatCurrency} from "@/helpers/format-currency";
import {Button} from "@/components/ui/button";
import {ChevronLeftIcon, ChevronRightIcon, TrashIcon} from "lucide-react";


interface CartItemProps {
    product: CartProduct;
}

const CartProductItem = ({product}: CartItemProps) => {


    return (
        <div className={"flex item-center justify-between"}>

            <div className={"flex items-center justify-between"}>
                {/*ESQUERDA*/}
                <div className={"flex items-center gap-3"}>
                    <div className={"relative h-20 w-20 bg-gray-100 rounded-xl"}>
                        <Image src={product.imageUrl} alt={product.name} fill/>
                    </div>

                    <div className={"space-y-1"}>
                        <p className={"text-xs max-w-[90%] truncate text-ellipsis"}>{product.name}</p>
                        <p className={"text-sm font-semibold"}>{formatCurrency(product.price)}</p>

                        {/*QUANTIDADE*/}
                        <div className="flex item-center gap-1 text-center">
                            <Button className={"h-7 w-7 rounded-lg"} variant={"outline"}>
                                <ChevronLeftIcon size={"14"}/>
                            </Button>
                            <p className={"text-xs w-7"}>{product.quantity}</p>
                            <Button className={"h-7 w-7 rounded-lg"} variant={"destructive"}>
                                <ChevronRightIcon size={"14"}/>
                            </Button>
                        </div>
                    </div>
                </div>
                <Button className={"h-7 w-7 rounded-lg"} variant="outline">
                    <TrashIcon/>

                </Button>

            </div>
        </div>
    );
};

export default CartProductItem;
