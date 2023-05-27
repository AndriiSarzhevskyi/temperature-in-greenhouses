import random from 'random'

export function randommas(lnth, first_val) {
    const max = 40;
    const min = 16;
    let arr = [];
    let t = 0;
    if (first_val != null) {
        t = parseFloat(first_val);
    }
    let step = parseFloat(2);

    for (let i = 0; i < lnth; i++) {

        if (i == 0 && first_val == null) {
            t = random.float((min), (max));
        }
        if (i == 0 && first_val != null) {

            t = random.float((t - step), (t + step));
        }
        else {
            if (t + step >= max) {
                t = random.float((t - step), (max));
            }
            if (t - step <= min) {
                t = random.float((min), (t + step));
            }
            else if (t + step <= max && t - step >= min){
                t = random.float((t - step), (t + step));
            }
        }
        arr.push(t.toFixed(3));
    }
    return arr;
}