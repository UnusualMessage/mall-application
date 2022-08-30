const toRightForm = (count: number, textForms: string[]) => {
    const twoLast = Math.abs(count) % 100;
    const last = count % 10;

    if (twoLast > 10 && twoLast < 20) {
        return textForms[2];
    }
    if (last > 1 && last < 5) {
        return textForms[1];
    }
    if (last === 1) {
        return textForms[0];
    }
    return textForms[2];
};

export default toRightForm;
