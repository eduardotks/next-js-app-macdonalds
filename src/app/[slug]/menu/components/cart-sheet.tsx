import {useContext, useState} from "react";

import CartProductItem from "@/app/[slug]/menu/components/cart-product-item";
import FinishOrderDialog from "@/app/[slug]/menu/components/finish-order-dialog";
import {CartContext} from "@/app/[slug]/menu/contexts/cart";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {formatCurrency} from "@/helpers/format-currency";


const CartSheet = () => {
    const {isOpen, toogleCart, products, total} = useContext(CartContext);
    const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
    return (
        <Sheet open={isOpen} onOpenChange={toogleCart}>
            <SheetContent className={"w-[85%]"}>
                <SheetHeader>
                    <SheetTitle className={"text-left"}>Sacola</SheetTitle>

                </SheetHeader>
                <div className={"flex flex-col h-full py-5"}>
                    <div className={"flex-auto"}>
                        {products.map(product => (
                            <CartProductItem key={product.id} product={product}/>
                        ))}
                    </div>
                    <Card className={"mb-6"}>
                        <CardContent className={"p-5"}>
                            <p className={"text-sm text-muted-foreground"}>Total</p>
                            <p className={"text-sm font-semibold"}>{formatCurrency(total)}</p>
                        </CardContent>
                    </Card>
                    <Button className={"w-full rounded-full"} onClick={()=> setFinishOrderDialogIsOpen(true)}>Finalizar pedido</Button>
                    <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen}/>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
