import {notFound} from "next/navigation";

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
    const product = await db.product.findUnique({where: {id: productId}});

    if (!product) {
        return notFound();
    }
    return (
        <div>
            <ProductHeader product={product}/>
            <h1>Product page</h1>
            {slug}
            {productId}

        </div>
    );
}

export default ProductPage;
