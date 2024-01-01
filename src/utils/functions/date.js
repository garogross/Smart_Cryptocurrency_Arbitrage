export function formatDate(dateStr) {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
}

export const toDateValue = date => date ? new Date(date).toISOString().split('T')[0] : ""

export const getCreatedAt = (secs) => {
    return new Date(secs * 1000)
}