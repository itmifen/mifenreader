import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "atitemview": {
        "borderBottomColor": "#cccccc",
        "borderBottomWidth": 0.8,
        "borderStyle": "solid",
        "paddingTop": 12,
        "paddingRight": 12,
        "paddingBottom": 12,
        "paddingLeft": 12,
        "flexDirection": "row",
        "flex": 1
    },
    "atitemtitle": {
        "color": "#212121",
        "fontSize": 15,
        "lineHeight": 20
    },
    "atitemdescview": {
        "height": 44,
        "paddingTop": 4,
        "overflow": "hidden"
    },
    "atitemdesctext": {
        "color": "#757575",
        "lineHeight": 20,
        "overflow": "hidden"
    },
    "atitemdate": {
        "paddingTop": 4,
        "alignItems": "flex-start"
    },
    "atitemdatetext": {
        "color": "#757575",
        "lineHeight": 20
    },
    "atitemleftview": {
        "flex": 1,
        "paddingRight": 8
    },
    "atitemrightview": {
        "width": 100,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "atitemimage": {
        "width": 100,
        "height": 80
    },
    "atitemtitleview": {
        "height": 40,
        "overflow": "hidden",
        
        
    }
});