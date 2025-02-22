import {notFound} from "next/navigation";
import {db} from "@/lib/prisma";
import RestaurantHeader from "@/app/[slug]/menu/components/header";
import RestaurantCategories from "@/app/[slug]/menu/components/categories";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethod = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({params, searchParams}: RestaurantMenuPageProps) => {
    const {slug} = await params;

    const {consumptionMethod} = await searchParams;

    if (!isConsumptionMethod(consumptionMethod)) {
        {
            return notFound();
        }
    }

    const restaurant = await db.restaurant.findUnique({
        where: {slug},
        include: {
            menuCategories: {
                include: {
                    products: true,
                }
            }
        }
    });

    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
            <RestaurantHeader restaurant={restaurant}/>
            <RestaurantCategories restaurant={restaurant}/>
        </div>
    );
}

export default RestaurantMenuPage;
