import {useContext} from "react";

import {CartContext} from "@/app/[slug]/menu/contexts/cart";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";


const CartSheet = () => {
    const {isOpen, toogleCart, products} = useContext(CartContext);

    return (
        <Sheet open={isOpen} onOpenChange={toogleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                {products.map(product => (
                    <h1 key={product.id}>{product.name} - {product.quantity}</h1>
                ))}
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
