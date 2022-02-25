const nameToUrlPart = (name) => {
    return name.toLowerCase()
        .replace(/[#?&/=+.*'{}()%$§"!;,:´`]+/g, '')
        .replace(/ /g, '-')
        .replace(/ä/g, 'ae')
        .replace(/ü/g, 'ue')
        .replace(/ö/g, 'oe')
        .replace(/ß/g, 'ss');
}
export {nameToUrlPart};