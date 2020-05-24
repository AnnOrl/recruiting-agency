const declOfNum = (titles) => (number) => {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
        ];
}

export const daysDecl = declOfNum(['день', 'дня', 'дней']);
export const hoursDecl = declOfNum(['час', 'часа', 'часов']);
export const minDecl = declOfNum(['минута', 'минуты', 'минут']);
export const secDecl = declOfNum(['секунда', 'секунды', 'секунд']);
