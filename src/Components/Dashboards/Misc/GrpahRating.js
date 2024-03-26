export function calculateAverageRatingsMonthly(data) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Group ratings by monthly periods
    const groupedData = data.reduce((acc, curr) => {
        const date = new Date(curr.publishTime);
        const monthYear = months[date.getMonth()] + ' ' + date.getFullYear();
        const existingEntry = acc.find(entry => entry.publishTime === monthYear);

        if (existingEntry) {
            existingEntry.ratings.push(curr.rating);
        } else {
            acc.push({ publishTime: monthYear, ratings: [curr.rating], date: date });
        }

        return acc;
    }, []);

    // Sort the grouped data chronologically by the date
    groupedData.sort((a, b) => a.date - b.date);

    // Calculate average rating for each period
    const averageRatings = groupedData.map(entry => {
        const sum = entry.ratings.reduce((total, rating) => total + rating, 0);
        const average = sum / entry.ratings.length;
        return { publishTime: entry.publishTime, averageRating: average.toFixed(2) };
    });

    return averageRatings;
}


export function calculateAverageRatingsWeekly(data) {
    const weeksInMonth = (year, month) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const diff = Math.ceil((lastDay.getDate() - firstDay.getDate() + 1 + firstDay.getDay()) / 7);
        return diff;
    };

    // Group ratings by weekly periods
    const groupedData = data.reduce((acc, curr) => {
        const date = new Date(curr.publishTime);
        const year = date.getFullYear();
        const month = date.getMonth();
        const week = Math.ceil(date.getDate() / 7);
        const totalWeeks = weeksInMonth(year, month);
        const publishTime = `Week ${week} of ${year}-${('0' + (month + 1)).slice(-2)}`;

        const existingEntry = acc.find(entry => entry.publishTime === publishTime);

        if (existingEntry) {
            existingEntry.ratings.push(curr.rating);
        } else {
            acc.push({ publishTime: publishTime, ratings: [curr.rating], date: date, totalWeeks });
        }

        return acc;
    }, []);

    // Sort the grouped data chronologically by the date
    groupedData.sort((a, b) => a.date - b.date);

    // Calculate average rating for each period
    const averageRatings = groupedData.map(entry => {
        const sum = entry.ratings.reduce((total, rating) => total + rating, 0);
        const average = sum / entry.ratings.length;
        const formattedDate = new Date(entry.date.getFullYear(), entry.date.getMonth(), 1);
        return { publishTime: formattedDate.toISOString().split('T')[0], averageRating: average.toFixed(2), totalWeeks: entry.totalWeeks };
    });

    return averageRatings;
}

export function sortByPublishTime(data) {
    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.publishTime);
        const dateB = new Date(b.publishTime);
        return dateA - dateB;
    });
    return sortedData;
}
