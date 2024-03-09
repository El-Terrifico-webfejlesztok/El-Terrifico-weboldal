import { toast, Id, TypeOptions } from "react-toastify";


export default function updateToast(toastId: Id, type: TypeOptions, message?: string) {

    toast.update(toastId, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
    });

}
// Betöltős toast használata:
/*
    const toastId = toast.loading('message')
    updateToast(toastId, 'success', 'message')

 */

// Többi fajta toast:
/*    

    const notify = toast("Wow so easy!");
    const cucc = toast.warning("Na azé na!");
    const cutsc2 = toast.warning("Vége, elrontottad. Ebből nincs visszajövetel!");

*/

// dokumentáció:
// https://fkhadra.github.io/react-toastify/introduction/