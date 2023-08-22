export const ObjectToString = (appointment: { [key: string]: string[] }) => {
    let date = "", time = "";
    for (const key in appointment) {
        date += key + ";";
        time += appointment[key].length !== 0 ? appointment[key].toString() + ";" : appointment[key].toString();
    }
    return {
        date: date.substring(0, date.length - 1),
        time: time.substring(0, time.length - 1)
    }
} 