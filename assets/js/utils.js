export async function delay(time) {
    return new Promise((resolve) => {
        const timeId = setTimeout(() => {
            // console.log(`延迟${time}s`)
            clearTimeout(timeId)
            resolve(true)
        }, time)
    })
}