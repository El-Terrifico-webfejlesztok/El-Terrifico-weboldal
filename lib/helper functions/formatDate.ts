export default function formatDate(dateToFormat: Date): string {
    const currentDate = new Date();

    const acucc: string = dateToFormat.getFullYear() === currentDate.getFullYear()
        ? dateToFormat.toLocaleString('hu-HU', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        : dateToFormat.toLocaleString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

    return acucc
}