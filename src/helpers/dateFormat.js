import moment from "moment"

const format = "DD/MM/YYYY"

export function changeDataTime(value) {
    return moment(value).format(format)
}