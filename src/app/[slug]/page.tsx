import Image from "next/image";
import {notFound} from "next/navigation";
import React from "react";

import ConsumptionMethodOption from "@/app/[slug]/components/consumption-method-option";
import getRestaurantBySlug from "@/data/get-restaurant-by-slug";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const {slug} = await params;
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
        return notFound();
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
            {/* LOGO E TITULO*/}
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={82} height={82}/>
                <h2 className="font-semibold">{restaurant?.name}</h2>
            </div>
            {/* BEM VINDO */}
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo!
                </h3>
                <p>
                    Escolha como prefere aproveitar sua refeição. Estamos oferecendo praticidade e sabor em cada
                    detalhe!
                </p>
            </div>
            {/* MENU */}
            <div className="grid grid-cols-2 gap-4 pt-14">
                <ConsumptionMethodOption
                    imageUrl={"/dine_in.png"}
                    imageAlt={"Comer aqui"}
                    slug={slug}
                    option={"DINE_IN"}
                    buttonText={"Para comer aqui"}
                />
                <ConsumptionMethodOption
                    imageUrl={"/take_away.png"}
                    imageAlt={"Para levar"}
                    slug={slug}
                    option={"TAKEAWAY"}
                    buttonText={"Para levar"}
                />
            </div>
        </div>);
};

export default RestaurantPage;
