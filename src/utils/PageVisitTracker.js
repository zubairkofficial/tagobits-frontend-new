export const getBrowserName = (userAgent) => {
    if (userAgent.includes("Firefox")) return "Mozilla Firefox";
    if (userAgent.includes("SamsungBrowser")) return "Samsung Internet";
    if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
    if (userAgent.includes("Trident")) return "Internet Explorer";
    if (userAgent.includes("Edge")) return "Microsoft Edge";
    if (userAgent.includes("Chrome")) return "Google Chrome";
    if (userAgent.includes("Safari")) return "Safari";
    return "Unknown";
};

export const getCountryFromIP = async (ip) => {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return data.country_name || 'Unknown';
    } catch (error) {
        return 'Unknown';
    }
};
