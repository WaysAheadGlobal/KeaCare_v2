export const StringtoObject = (date: string, time: string) => {
    if (date && time) {
        const dates = date.split(";");
        const times = time.split(";");

        let datetime: { [key: string]: string[] } = {};

        for (let i = 0; i < dates.length; i++) {
            datetime = {
                ...datetime,
                [dates[i]]: times[i].split(",")
            }
        }

        return {
            ...datetime
        };
    } else {
        return {}
    }
}