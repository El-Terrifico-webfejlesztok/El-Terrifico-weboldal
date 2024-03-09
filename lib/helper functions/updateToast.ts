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

/*
    const toastId = toast.loading('message')
    updateToast(toastId, 'success', 'message')

 */