const nameToUrlPart = (name) => {
    return name.toLowerCase()
        .replace(/ /g, '-')
        .replace(/ü/g, 'ue')
        .replace(/ö/g, 'ae')
        .replace(/ö/g, 'ae')
        .replace(/[#.]/g, '_');
}
export {nameToUrlPart};