"use client"
import {zodResolver} from "@hookform/resolvers/zod";
import {ConsumptionMethod} from "@prisma/client";
import {Loader2Icon} from "lucide-react";
import Form from "next/form";
import {useParams, useSearchParams} from "next/navigation";
import {useContext, useTransition} from "react";
import {useForm} from "react-hook-form";
import {PatternFormat} from "react-number-format";
import {toast} from "sonner";
import {z} from "zod";

import {createOrder} from "@/app/[slug]/menu/actions/create-order";
import {CartContext} from "@/app/[slug]/menu/contexts/cart";
import {isValidCpf} from "@/app/[slug]/menu/helpers/cpf";
import {Button} from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";


const formSchema = z.object({
    name: z.string().trim().min(1, {message: "Nome é obrigatório"}),
    cpf: z.string().trim().min(1, {message: "CPF é obrigatório"}).refine(isValidCpf, {message: "CPF inválido"})
})

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({open, onOpenChange}: FinishOrderDialogProps) => {
    const {slug} = useParams<{ slug: string }>();
    const {products} = useContext(CartContext);
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
        shouldUnregister: true,
    });

    const onSubmit = async (data: FormSchema) => {
        try {
            const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;
            startTransition(async () => {
                await createOrder({
                    consumptionMethod,
                    customerName: data.name,
                    customerCpf: data.cpf,
                    products,
                    slug,
                });
                onOpenChange(false);
                toast.success("Pedido finalizado com sucesso!");
            });


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar pedido?</DrawerTitle>
                    <DrawerDescription>Insira suas informações abaixo para finalizar o pedido.</DrawerDescription>
                </DrawerHeader>

                <div className={"p-5"}>
                    <Form action={""} {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Seu nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Seu CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat format={"###.###.###-##"} placeholder="Digite seu CPF..."
                                                           customInput={Input} {...field} />

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button type={"submit"} variant={"destructive"}
                                        className={"rounded-full"} disabled={isPending}>
                                    {isPending && <Loader2Icon className={"animate-spin"}/>}
                                    Finalizar</Button>
                                <DrawerClose>
                                    <Button variant={"outline"} className={"w-full rounded-full"}>Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>

    );

}

export default FinishOrderDialog;
