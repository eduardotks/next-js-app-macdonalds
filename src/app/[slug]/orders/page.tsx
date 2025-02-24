import {isValidCpf, removeCpfPunctuation} from "@/app/[slug]/menu/helpers/cpf";
import CpfForm from "@/app/[slug]/orders/components/cpf-form";
import OrderList from "@/app/[slug]/orders/components/order-list";
import {db} from "@/lib/prisma";


interface OrdersPageProps {
    searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({searchParams}: OrdersPageProps) => {
    const {cpf} = await searchParams;
    if (!cpf) {
        return <CpfForm/>
    }

    if (!isValidCpf(cpf)) {
        return <CpfForm/>
    }

    const orders = await db.order.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            customerCpf: removeCpfPunctuation(cpf),
        },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                },
            },
            orderProducts: {
                include: {
                    product: true,
                }
            }
        },
    });
    return <OrderList orders={orders}/>
}

export default OrdersPage;
