import {notFound} from "next/navigation";

import ProductDetails from "@/app/[slug]/menu/[productId]/components/product-details";
import ProductHeader from "@/app/[slug]/menu/[productId]/components/product-header";
import {db} from "@/lib/prisma";

interface ProductPageProps {
    params: {
        slug: string;
        productId: string;
    }
}

const ProductPage = async ({params}: ProductPageProps) => {
    const {slug, productId} = await params;
    const product = await db.product.findUnique({
        where: {id: productId}, include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                    slug: true,
                }
            },
        }
    });

    if (!product) {
        return notFound();
    }
    if (product.restaurant.slug.toUpperCase() != slug.toUpperCase())
    {
        return notFound();
    }
    return (
        <div className={"flex h-full flex-col"}>
            <ProductHeader product={product}/>
            <ProductDetails product={product}/>

        </div>
    );
}

export default ProductPage;
