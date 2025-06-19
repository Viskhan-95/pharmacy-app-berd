import { supabase } from "./supabase";

export const placeOrdder = async ({
    userId,
    items,
    totalPrice,
    address,
}: {
    userId: string;
    items: any;
    totalPrice: number;
    address: string;
}) => {
    const { data, error } = await supabase.from('orders').insert([
        {
            user_id: userId,
            items,
            total_price: totalPrice,
            address,
        },
    ]);

    if(error) throw error;
    return data;
};