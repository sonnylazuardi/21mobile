import Ionicons from 'react-native-vector-icons/Ionicons';

const icons = {
    "md-videocam": [30, "#fff"],
    "md-heart": [30, "#fff"],
    "md-pin": [30, "#fff"],
    "md-more": [30, "#fff"],
    "md-search": [30, "#fff"],
    "md-calendar": [30, "#fff"],
}

var iconsMap = {};
var iconsLoaded = () => {
    return new Promise((resolve, reject) => {
        new Promise.all(
            Object.keys(icons).map(iconName =>
                Ionicons.getImageSource(
                    iconName,
                    icons[iconName][0],
                    icons[iconName][1]
                ))
        ).then(sources => {
            Object.keys(icons)
                .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

            // Call resolve (and we are done)
            resolve(true);
        })
    })
};

export {
    iconsMap,
    iconsLoaded
};