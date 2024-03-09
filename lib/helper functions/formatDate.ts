export default function formatDate(dateToFormat: Date, lenght?: 'short' | 'long'): string {
    try {
        dateToFormat = new Date(dateToFormat)
    }
    catch { }
    const currentDate = new Date();
    const acucc: string =

        dateToFormat.getFullYear() === currentDate.getFullYear() ?
            dateToFormat.toLocaleString('hu-HU',
                {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })
            :
            dateToFormat.toLocaleString('hu-HU',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                });

    return acucc
}