"use client";
import {Product} from "@prisma/client";
import {ChevronLeftIcon, ScrollTextIcon} from "lucide-react";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";

interface ProductsHeaderProps {
    product: Pick<Product, 'name' | 'imageUrl'>;

}

const ProductHeader = ({product}: ProductsHeaderProps) => {
    const {slug} = useParams<{ slug: string }>();
    const router = useRouter();

    const handleOrdersClick = () => {
        router.push(`/${slug}/orders`)
    };
    const handleBackClick = () => {
        router.back();
    };

    return (
        <div>
            <div className={"relative w-full min-h-[300px]"}>
                <Button
                    variant={"secondary"}
                    size={"icon"}
                    className={"absolute top-4 left-4 z-50 rounded-full"}
                    onClick={handleBackClick}
                >
                    <ChevronLeftIcon/>
                </Button>

                <Image src={product.imageUrl} alt={product.name} layout={"fill"} className={"object-contain"}/>
                <Button variant={"secondary"} size={"icon"} className={"absolute top-4 right-4 z-50 rounded-full"}
                        onClick={handleOrdersClick}>
                    <ScrollTextIcon/>
                </Button>

            </div>
        </div>

    );
}

export default ProductHeader;
