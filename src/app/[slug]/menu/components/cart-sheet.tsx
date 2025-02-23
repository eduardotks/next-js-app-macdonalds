import {useContext} from "react";

import CartProductItem from "@/app/[slug]/menu/components/cart-product-item";
import {CartContext} from "@/app/[slug]/menu/contexts/cart";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";


const CartSheet = () => {
    const {isOpen, toogleCart, products} = useContext(CartContext);

    return (
        <Sheet open={isOpen} onOpenChange={toogleCart}>
            <SheetContent className={"w-[85%]"}>
                <SheetHeader>
                    <SheetTitle className={"text-left"}>Sacola</SheetTitle>

                </SheetHeader>
                <div className={"py-5"}>
                    {products.map(product => (
                        <CartProductItem key={product.id} product={product}/>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
